package net.swordie.ms.handlers;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.User;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.ApiResponse;
import net.swordie.ms.constants.DevAccounts;
import net.swordie.ms.enums.AccountCreateResult;
import net.swordie.ms.enums.ApiTokenResultType;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.Util;
import org.mindrot.jbcrypt.BCrypt;

import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.constants.JobConstants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ApiRequestHandler {

    public static final int RND_BITS = 11;
    private static final int USER_BITS = 19;
    private static final int PREFIX_BITS = 1;

    private static final int RND_MASK  = (1 << RND_BITS) - 1;
    public static final int USER_MASK = (1 << USER_BITS) - 1;

    private static final int PREFIX_SHIFT = USER_BITS + RND_BITS;
    private static final int USER_SHIFT   = RND_BITS;
    private static final int PREFIX_VALUE = 1; // luôn 1 để token lớn

    public static void handleTokenX64Request(Client c, InPacket inPacket) {
        String name = inPacket.decodeString();
        String password = inPacket.decodeString();
        boolean wrongWZFiles = false;
        if (c.getLastAPIAttempt() + 1000 < System.currentTimeMillis() || ServerConfig.DEBUG_MODE) {
            c.setLastAPIAttempt(System.currentTimeMillis());
        } else {
            c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.TooManyRequest, 0));
            return;
        }
        User user = User.getUserFromSQLForAPI(name);
        boolean success = false;
        if (user == null) {
            if (ServerConfig.AUTO_REGISTER && name != null && !name.trim().isEmpty() && password != null && !password.trim().isEmpty()) {
                String cleanName = name.trim();
                user = new User(cleanName, password);
                user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt(ServerConstants.BCRYPT_ITERATIONS)));
                user.setEmail(cleanName + "@maplestory.local");
                user.setPic(BCrypt.hashpw("111111", BCrypt.gensalt(ServerConstants.BCRYPT_ITERATIONS)));
                user.setAccountType(net.swordie.ms.enums.AccountType.Player);
                user.insertUserToSQL();
                System.out.printf("[AutoRegister] New user auto-registered: %s (ID: %d)%n", cleanName, user.getId());
                success = true;
            } else {
                c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.InvalidUserPassCombination, 0));
                return;
            }
        } else {
            String dbPassword = user.getPassword();
            boolean hashed = Util.isStringBCrypt(dbPassword);
            if (hashed) {
                try {
                    success = BCrypt.checkpw(password, dbPassword);
                } catch (IllegalArgumentException e) { // if password hashing went wrong
                    System.out.printf("bcrypt check in login has failed! dbPassword: %s; stack trace: %s%n", dbPassword, e.getStackTrace().toString());
                    success = false;
                }
            } else {
                success = password.equals(dbPassword);
            }
        }
        if (success) {
            if (wrongWZFiles) {
                c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.WrongWZFiles, 0));
            } else if (user.getBanExpireDate() != null && !user.getBanExpireDate().isExpired()) {
                c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.Banned, 0));
            } else if (Server.get().getUserById(user.getId()) != null) {
                c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.AlreadyLogin, 0));
            } else {
                // Generate token
                final int token = getTokenPacked(user.getId());
                Server.get().addAuthToken(token, user.getId());
                c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.Success, token));
                DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] đăng nhập thành công tài khoản %s và có token: %d.", c.getIP(), name, token));
            }
        } else {
            c.write(ApiResponse.tokenRequestResult(ApiTokenResultType.InvalidUserPassCombination, 0));
        }
    }

    private static int getTokenPacked(int userId) {
        if ((userId & ~USER_MASK) != 0) {
            throw new IllegalArgumentException("userId too large for packed token");
        }
        for (int i = 0; i < 64; i++) {
            int rnd = ThreadLocalRandom.current().nextInt(1 << RND_BITS);
            int token = (PREFIX_VALUE << PREFIX_SHIFT) | (userId << USER_SHIFT) | rnd; // luôn dương
            if (!Server.get().isTokenExist(token)) return token;
        }
        // fallback
        return ThreadLocalRandom.current().nextInt(1_000_000_000, Integer.MAX_VALUE);
    }

    public static void handleCreateAccountRequest(Client c, InPacket inPacket) {
        String name = inPacket.decodeString();
        String pwd = inPacket.decodeString();
        String email = inPacket.decodeString();
        if (c.getLastAPIAttempt() + 1000 < System.currentTimeMillis() || ServerConfig.DEBUG_MODE) {
            c.setLastAPIAttempt(System.currentTimeMillis());
        } else {
            c.write(ApiResponse.createAccountResult(AccountCreateResult.Unknown));
            return;
        }
        AccountCreateResult acr = AccountCreateResult.Success;
        if (name == null || name.trim().length() < 3 || pwd == null || pwd.trim().isEmpty()) {
            acr = AccountCreateResult.Unknown;
        }
        User user = User.getUserFromSQLForAPI(name);
        if (user != null) {
            acr = AccountCreateResult.NameInUse;
        }
        if (DevAccounts.isForbiddenID(name)) {
            acr = AccountCreateResult.Unknown;
        }
        if (acr == AccountCreateResult.Success) {
            user = new User(name, pwd);
            boolean hashed = Util.isStringBCrypt(pwd);
            if (!hashed) {
                user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(ServerConstants.BCRYPT_ITERATIONS)));
            }
            user.setPic(BCrypt.hashpw("111111", BCrypt.gensalt(ServerConstants.BCRYPT_ITERATIONS)));
            user.setEmail(email);
            user.insertUserToSQL();
            DataPrinter.send(DataPrinter.REGISTER, String.format("[IP: %s] đăng ký thành công tài khoản %s, Email %s.", c.getIP(), name, email));
        }
        c.write(ApiResponse.createAccountResult(acr));
    }

    public static class CharSummaryData {
        public String name;
        public int level;
        public int job;
        public String jobName;
        public int field;

        public CharSummaryData(String name, int level, int job, String jobName, int field) {
            this.name = name;
            this.level = level;
            this.job = job;
            this.jobName = jobName;
            this.field = field;
        }
    }

    public static void handleAccountDataX64Request(Client c, InPacket inPacket) {
        int token = inPacket.decodeInt();
        int userId = Server.get().getUserIdFromAuthToken(token);
        if (userId <= 0) {
            userId = LoginHandler.verifyTokenAndUserId(token);
        }
        if (userId <= 0) {
            c.write(ApiResponse.accountDataResult((byte) 1, 0, 0, 0, null));
            return;
        }

        User user = User.getUserFromSQLByID(userId);
        if (user == null) {
            c.write(ApiResponse.accountDataResult((byte) 1, 0, 0, 0, null));
            return;
        }

        int nx = user.getNxPrepaid();
        int dp = user.getDonationPoints();
        int vp = user.getVotePoints();

        List<CharSummaryData> characters = new ArrayList<>();
        String query = "SELECT cs.name, cs.level, cs.job, COALESCE(c.fieldid, cs.posMap, 0) AS curfield " +
                "FROM characters c " +
                "JOIN accounts a ON c.accid = a.id " +
                "JOIN avatardata ad ON c.avatardata = ad.id " +
                "JOIN characterstats cs ON ad.characterstat = cs.id " +
                "WHERE a.userid = ? " +
                "ORDER BY cs.level DESC " +
                "LIMIT 3";
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    String charName = rs.getString("name");
                    int level = rs.getInt("level");
                    int job = rs.getInt("job");
                    int field = rs.getInt("curfield");
                    String jobName = JobConstants.getCleanJobName((short) job);
                    if (jobName == null || jobName.trim().isEmpty()) {
                        jobName = JobConstants.getJobNameById((short) job);
                    }
                    if (jobName == null || jobName.trim().isEmpty()) {
                        jobName = "Beginner";
                    }
                    characters.add(new CharSummaryData(charName, level, job, jobName, field));
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }

        c.write(ApiResponse.accountDataResult((byte) 0, nx, dp, vp, characters));
    }
}
