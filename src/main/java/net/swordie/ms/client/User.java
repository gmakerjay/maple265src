package net.swordie.ms.client;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.enums.AccountType;
import net.swordie.ms.enums.PicStatus;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Util;

import java.sql.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class User {
    private int id;
    private String name;
    private String password;
    private String email;
    private String pic;
    private byte clientState;
    private AccountType accountType;
    private int votePoints;
    private int donationPoints;
    private int age;
    private int vipGrade;
    private int vipPoints;
    private FileTime freeVipPointDate;
    private FileTime vipExpiredDate;
    private int nBlockReason;
    private byte gender;
    private byte msg2;
    private byte purchaseExp;
    private byte pBlockReason;
    private byte gradeCode;
    private long chatUnblockDate;
    private boolean hasCensoredNxLoginID;
    private String censoredNxLoginID;
    private int characterSlots;
    private FileTime creationDate;
    private int maplePoints;
    private int nxPrepaid;
    private Set<Account> accounts;
    private byte[] machineID;
    private FileTime banExpireDate = FileTime.MIN_TIME();
    private String banReason;
    private Char currentChr;
    private Account currentAcc;
    private Client client;
    private int lastCharID;

    public static User getUserFromSQLForAPI(String username) {
        User user = null;
        String query = "SELECT id, name, password, email, banExpireDate FROM users WHERE name = ?";
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    user = new User();
                    user.setId(rs.getInt("id"));
                    user.setName(rs.getString("name"));
                    user.setPassword(rs.getString("password"));
                    user.setEmail(rs.getString("email"));
                    FileTime banExpireDate = null;
                    if (rs.getTimestamp("banExpireDate") != null) {
                        banExpireDate = FileTime.fromLong(rs.getDate("banExpireDate").getTime());
                    }
                    user.setBanExpireDate(banExpireDate);
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
        return user;
    }

    public static User getUserFromSQLByName(String username) {
        User user = null;
        String query = "SELECT * FROM users WHERE name = ?";
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    user = new User();
                    user.setId(rs.getInt("id"));
                    user.setName(rs.getString("name"));
                    user.setPassword(rs.getString("password"));
                    user.setPic(rs.getString("pic"));
                    user.setEmail(rs.getString("email"));
                    user.setAge(rs.getInt("age"));
                    user.setAccountType(AccountType.getByVal(rs.getInt("accounttype")));
                    user.setVotePoints(rs.getInt("votepoints"));
                    user.setDonationPoints(rs.getInt("donationpoints"));
                    user.setMaplePoints(rs.getInt("maplePoints"));
                    user.setNxPrepaid(rs.getInt("nxPrepaid"));
                    user.setClientState(rs.getByte("clientstate"));
                    user.setVipGrade(rs.getInt("vipgrade"));
                    user.setVipPoints(rs.getInt("vippoints"));
                    user.setFreeVipPointDate(DatabaseManager.getFileTimeFromString(rs.getString("freevippointdate")));
                    user.setVipExpiredDate(DatabaseManager.getFileTimeFromString(rs.getString("vipexpireddate")));
                    user.setnBlockReason(rs.getInt("nblockreason"));
                    user.setGender(rs.getByte("gender"));
                    user.setMsg2(rs.getByte("msg2"));
                    user.setPurchaseExp(rs.getByte("purchaseexp"));
                    user.setpBlockReason(rs.getByte("pblockreason"));
                    FileTime banExpireDate = null;
                    if (rs.getDate("banExpireDate") != null) {
                        banExpireDate = FileTime.fromLong(rs.getDate("banExpireDate").getTime());
                    }
                    user.setBanExpireDate(banExpireDate);
                    user.setBanReason(rs.getString("banReason"));
                    //user.setOffenseManager(rs.getInt("offensemanager"));
                    user.setChatUnblockDate(rs.getLong("chatunblockdate"));
                    user.setHasCensoredNxLoginID(rs.getByte("hascensorednxloginid") != 0);
                    user.setGradeCode(rs.getByte("gradecode"));
                    user.setCensoredNxLoginID(rs.getString("censorednxloginid"));
                    user.setCharacterSlots(rs.getInt("characterslots"));
                    FileTime creationDate = DatabaseManager.getFileTimeFromString(rs.getString("creationdate"));
                    user.setCreationDate(creationDate);
                    user.setLastCharID(rs.getInt("lastcharid"));
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
        return user;
    }

    public static User getUserFromSQLByID(int userID) {
        User user = null;
        String query = "SELECT * FROM users WHERE id = ?";
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, userID);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    user = new User();
                    user.setId(rs.getInt("id"));
                    user.setName(rs.getString("name"));
                    user.setPassword(rs.getString("password"));
                    user.setPic(rs.getString("pic"));
                    user.setEmail(rs.getString("email"));
                    user.setAge(rs.getInt("age"));
                    user.setAccountType(AccountType.getByVal(rs.getInt("accounttype")));
                    user.setVotePoints(rs.getInt("votepoints"));
                    user.setDonationPoints(rs.getInt("donationpoints"));
                    user.setMaplePoints(rs.getInt("maplePoints"));
                    user.setNxPrepaid(rs.getInt("nxPrepaid"));
                    user.setClientState(rs.getByte("clientstate"));
                    user.setVipGrade(rs.getInt("vipgrade"));
                    user.setVipPoints(rs.getInt("vippoints"));
                    user.setFreeVipPointDate(DatabaseManager.getFileTimeFromString(rs.getString("freevippointdate")));
                    user.setVipExpiredDate(DatabaseManager.getFileTimeFromString(rs.getString("vipexpireddate")));
                    user.setnBlockReason(rs.getInt("nblockreason"));
                    user.setGender(rs.getByte("gender"));
                    user.setMsg2(rs.getByte("msg2"));
                    user.setPurchaseExp(rs.getByte("purchaseexp"));
                    user.setpBlockReason(rs.getByte("pblockreason"));
                    FileTime banExpireDate = null;
                    if (rs.getDate("banExpireDate") != null) {
                        banExpireDate = FileTime.fromLong(rs.getDate("banExpireDate").getTime());
                    }
                    user.setBanExpireDate(banExpireDate);
                    user.setBanReason(rs.getString("banReason"));
                    //user.setOffenseManager(rs.getInt("offensemanager"));
                    user.setChatUnblockDate(rs.getLong("chatunblockdate"));
                    user.setHasCensoredNxLoginID(rs.getByte("hascensorednxloginid") != 0);
                    user.setGradeCode(rs.getByte("gradecode"));
                    user.setCensoredNxLoginID(rs.getString("censorednxloginid"));
                    user.setCharacterSlots(rs.getInt("characterslots"));
                    FileTime creationDate = DatabaseManager.getFileTimeFromString(rs.getString("creationdate"));
                    user.setCreationDate(creationDate);
                    String machineIdStr = rs.getString("machineid");
                    byte[] machineId = (machineIdStr != null) ? Util.getByteArrayByString(machineIdStr) : new byte[0];
                    user.setMachineID(machineId);
                    user.setLastCharID(rs.getInt("lastcharid"));
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
        return user;
    }

    public void loadAccountsData() {
        //Loaded Mapping: Account
        Set<Account> accounts = new HashSet<>();
        Account accountMap = Account.getAccountFromSQLByUserID(this.getId());
        if (accountMap != null) {
            accounts.add(accountMap);
        }
        this.setAccounts(accounts);
    }

    public void insertUserToSQL() {
        String query = "INSERT INTO `users` (" +
                "`name`, `password`, `pic`, `email`, `age`, `accounttype`, `votepoints`, `donationpoints`, " +
                "`maplePoints`, `nxPrepaid`, `clientstate`, `vipgrade`, `vippoints`, " +
                "`freevippointdate`, `vipexpireddate`, `nblockreason`, `machineid`, `banExpireDate`, " +
                "`banReason`, `gender`, `msg2`, `purchaseexp`, `pblockreason`, " +
                "`chatunblockdate`, `hascensorednxloginid`, `gradecode`, `censorednxloginid`, " +
                "`characterslots`, `lastcharid`, `creationdate` " +
                ") VALUES (" +
                "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            int i = 1;
            ps.setString(i++, getName());
            ps.setString(i++, getPassword());
            ps.setString(i++, getPic());
            ps.setString(i++, getEmail());
            ps.setInt(i++, getAge());
            ps.setInt(i++, getAccountType().getVal());
            ps.setInt(i++, getVotePoints());
            ps.setInt(i++, getDonationPoints());
            ps.setInt(i++, getMaplePoints());
            ps.setInt(i++, getNxPrepaid());
            ps.setInt(i++, getClientState());
            ps.setInt(i++, getVipGrade());
            ps.setInt(i++, getVipPoints());
            ps.setTimestamp(i++, getFreeVipPointDate() != null ? new java.sql.Timestamp(getFreeVipPointDate().toMillis()) : null);
            ps.setTimestamp(i++, getVipExpiredDate() != null ? new java.sql.Timestamp(getVipExpiredDate().toMillis()) : null);
            ps.setInt(i++, getnBlockReason());
            ps.setString(i++, Util.readableByteArray(getMachineID() != null ? getMachineID() : new byte[]{}));
            ps.setTimestamp(i++, getBanExpireDate() != null ? new java.sql.Timestamp(getBanExpireDate().toMillis()) : null);
            ps.setString(i++, getBanReason());
            ps.setInt(i++, getGender());
            ps.setInt(i++, getMsg2());
            ps.setInt(i++, getPurchaseExp());
            ps.setInt(i++, getpBlockReason());
            ps.setLong(i++, getChatUnblockDate());
            ps.setBoolean(i++, hasCensoredNxLoginID());
            ps.setInt(i++, getGradeCode());
            ps.setString(i++, getCensoredNxLoginID());
            ps.setInt(i++, getCharacterSlots());
            ps.setInt(i++, getLastCharID());
            ps.setTimestamp(i++, getCreationDate() != null ? new java.sql.Timestamp(getCreationDate().toMillis()) : null);
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    setId(rs.getInt(1));
                }
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
    }

    public void updateUserToSQL() {
        String query = "UPDATE users SET " +
                "password = ?, pic = ?, email = ?, age = ?, accounttype = ?, votepoints = ?, " +
                "donationpoints = ?, maplePoints = ?, nxPrepaid = ?, clientstate = ?, " +
                "vipgrade = ?, vippoints = ?, freevippointdate = ?, vipexpireddate = ?, " +
                "nblockreason = ?, machineid = ?, banExpireDate = ?, banReason = ?, gender = ?, " +
                "msg2 = ?, purchaseexp = ?, pblockreason = ?, chatunblockdate = ?, " +
                "hascensorednxloginid = ?, gradecode = ?, censorednxloginid = ?, characterslots = ?, lastcharid = ?, " +
                "creationdate = ? " +
                "WHERE name = ?";

        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {

            int i = 1;
            ps.setString(i++, getPassword());
            ps.setString(i++, getPic());
            ps.setString(i++, getEmail());
            ps.setInt(i++, getAge());
            ps.setInt(i++, getAccountType().getVal());
            ps.setInt(i++, getVotePoints());
            ps.setInt(i++, getDonationPoints());
            ps.setInt(i++, getMaplePoints());
            ps.setInt(i++, getNxPrepaid());
            ps.setInt(i++, getClientState());
            ps.setInt(i++, getVipGrade());
            ps.setInt(i++, getVipPoints());
            ps.setTimestamp(i++, getFreeVipPointDate() != null ? new java.sql.Timestamp(getFreeVipPointDate().toMillis()) : null);
            ps.setTimestamp(i++, getVipExpiredDate() != null ? new java.sql.Timestamp(getVipExpiredDate().toMillis()) : null);
            ps.setInt(i++, getnBlockReason());
            ps.setString(i++, Util.readableByteArray(getMachineID() != null ? getMachineID() : new byte[]{}));
            ps.setTimestamp(i++, getBanExpireDate() != null ? new java.sql.Timestamp(getBanExpireDate().toMillis()) : null);
            ps.setString(i++, getBanReason());
            ps.setInt(i++, getGender());
            ps.setInt(i++, getMsg2());
            ps.setInt(i++, getPurchaseExp());
            ps.setInt(i++, getpBlockReason());
            ps.setLong(i++, getChatUnblockDate());
            ps.setBoolean(i++, hasCensoredNxLoginID());
            ps.setInt(i++, getGradeCode());
            ps.setString(i++, getCensoredNxLoginID());
            ps.setInt(i++, getCharacterSlots());
            ps.setInt(i++, getLastCharID());
            ps.setTimestamp(i++, getCreationDate() != null ? new java.sql.Timestamp(getCreationDate().toMillis()) : null);
            ps.setString(i++, getName());

            ps.executeUpdate();
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
    }

    public void saveToSQL(boolean logout) {
        if (getId() == 0) {
            insertUserToSQL(); // User creation
        } else {
            if (getCurrentChr() != null) {
                getCurrentChr().saveToSQL();
            }
            if (getCurrentAcc() != null) {
                getCurrentAcc().saveToSQL();
            }
            updateUserToSQL();
        }
    }

    public void updateUserClientStateToSQL() {
        updateUserFieldToSQL("clientstate", getClientState());
    }

    public void updateUserMachineIDToSQL() {
        updateUserFieldToSQL("machineid", Util.readableByteArray(getMachineID() != null ? getMachineID() : new byte[]{}));
    }

    public void updateUserCharacterSlotToSQL() {
        updateUserFieldToSQL("characterslots", getCharacterSlots());
    }

    public void updateUserVotePointToSQL() {
        updateUserFieldToSQL("votepoints", getVotePoints());
    }

    public void updateUserDonationPointToSQL() {
        updateUserFieldToSQL("donationpoints", getDonationPoints());
    }

    public void updateUserMaplePointToSQL() {
        updateUserFieldToSQL("maplepoints", getMaplePoints());
    }

    public void updateUserPICToSQL() {
        updateUserFieldToSQL("pic", getPic());
    }

    public void updateUserVipPointToSQL() {
        updateUserFieldToSQL("vippoints", getVipPoints());
    }

    public void updateUserLastCharIdToSQL() {
        updateUserFieldToSQL("lastcharid", getLastCharID());
    }

    private void updateUserFieldToSQL(String columnName, Object value) {
        String query = String.format("UPDATE users SET %s = ? WHERE id = ?", columnName);
        try (Connection con = DatabaseManager.getConnection();
             PreparedStatement ps = con.prepareStatement(query)) {

            if (value instanceof String) {
                ps.setString(1, (String) value);
            } else if (value instanceof Integer) {
                ps.setInt(1, (Integer) value);
            } else if (value instanceof Long) {
                ps.setLong(1, (Long) value);
            } else {
                // Handle other data types if needed
                ps.setObject(1, value);
            }

            ps.setInt(2, getId());
            ps.executeUpdate();

        } catch (Exception e) {
            DataPrinter.send(DataPrinter.HIKARICP_ERROR, e);
        }
    }

    public User() {}

    public User(String name, String password) {
        this.name = name;
        this.password = password;
        this.accountType = AccountType.Player;
        this.creationDate = FileTime.currentTime();
        this.accounts = new HashSet<>();
        this.banExpireDate = null;
        this.characterSlots = 8;
        this.pBlockReason = 3;
        this.lastCharID = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getVipGrade() {
        return vipGrade;
    }

    public void setVipGrade(int vipGrade) {
        this.vipGrade = vipGrade;
    }

    public int getVipPoints() {
        return vipPoints;
    }

    public void setVipPoints(int vipPoints) {
        this.vipPoints = vipPoints;
    }

    public void addVipPoints(int points) {
        int newPoints = getVipPoints() + points;
        setVipPoints(newPoints);
    }

    public void deductVipPoints(int points) {
        addVipPoints(-points);
    }

    public FileTime getFreeVipPointDate() {
        return freeVipPointDate;
    }

    public void setFreeVipPointDate(FileTime freeVipPointDate) {
        this.freeVipPointDate = freeVipPointDate;
    }

    public FileTime getVipExpiredDate() {
        return vipExpiredDate;
    }

    public void setVipExpiredDate(FileTime vipExpiredDate) {
        this.vipExpiredDate = vipExpiredDate;
    }

    public int getnBlockReason() {
        return nBlockReason;
    }

    public void setnBlockReason(int nBlockReason) {
        this.nBlockReason = nBlockReason;
    }

    public FileTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(FileTime creationDate) {
        this.creationDate = creationDate;
    }

    public Char getCurrentChr() {
        return currentChr;
    }

    public void setCurrentChr(Char currentChr) {
        this.currentChr = currentChr;
    }

    public int getMaplePoints() {
        return maplePoints;
    }

    public void setMaplePoints(int maplePoints) {
        this.maplePoints = maplePoints;
    }

    public int getNxPrepaid() {
        return nxPrepaid;
    }

    public void setNxPrepaid(int nxPrepaid) {
        this.nxPrepaid = nxPrepaid;
    }

    public void addMaplePoints(int points) {
        int newPoints = getMaplePoints() + points;
        setMaplePoints(newPoints);
        updateUserMaplePointToSQL();
    }

    public void deductMaplePoints(int points) {
        addMaplePoints(-points);
    }

    public void addDonationPoint(int points) {
        int newPoints = getDonationPoints() + points;
        setDonationPoints(newPoints);
        updateUserDonationPointToSQL();
    }

    public void deductDonationPoints(int points) {
        addDonationPoint(-points);
    }

    public void addNXPrepaid(int prepaid) {
        int newPrepaid = getNxPrepaid() + prepaid;
        if (newPrepaid >= 0) {
            setNxPrepaid(newPrepaid);
        }
    }

    public void deductNXPrepaid(int prepaid) {
        addNXPrepaid(-prepaid);
    }

    public void addVotePoint(int points) {
        int newPoints = getVotePoints() + points;
        setVotePoints(newPoints);
        updateUserVotePointToSQL();
    }

    public void deductVotePoints(int points) {
        addVotePoint(-points);
    }

    public Set<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }

    public void addAccount(Account account) {
        getAccounts().add(account);
    }

    public FileTime getBanExpireDate() {
        return banExpireDate;
    }

    public void setBanExpireDate(FileTime banExpireDate) {
        this.banExpireDate = banExpireDate;
    }

    public String getBanReason() {
        return banReason;
    }

    public void setBanReason(String banReason) {
        this.banReason = banReason;
    }

    public Account getCurrentAcc() {
        return currentAcc;
    }

    public void setCurrentAcc(Account currentAcc) {
        this.currentAcc = currentAcc;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public PicStatus getPicStatus() {
        return PicStatus.ENTER_PIC;
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public byte getMsg2() {
        return msg2;
    }

    public void setMsg2(byte msg2) {
        this.msg2 = msg2;
    }

    public byte getPurchaseExp() {
        return purchaseExp;
    }

    public void setPurchaseExp(byte purchaseExp) {
        this.purchaseExp = purchaseExp;
    }

    public byte getpBlockReason() {
        return pBlockReason;
    }

    public void setpBlockReason(byte pBlockReason) {
        this.pBlockReason = pBlockReason;
    }

    public byte getGradeCode() {
        return gradeCode;
    }

    public void setGradeCode(byte gradeCode) {
        this.gradeCode = gradeCode;
    }

    public long getChatUnblockDate() {
        return chatUnblockDate;
    }

    public void setChatUnblockDate(long chatUnblockDate) {
        this.chatUnblockDate = chatUnblockDate;
    }

    public boolean hasCensoredNxLoginID() {
        return hasCensoredNxLoginID;
    }

    public void setHasCensoredNxLoginID(boolean hasCensoredNxLoginID) {
        this.hasCensoredNxLoginID = hasCensoredNxLoginID;
    }

    public String getCensoredNxLoginID() {
        return censoredNxLoginID;
    }

    public void setCensoredNxLoginID(String censoredNxLoginID) {
        this.censoredNxLoginID = censoredNxLoginID;
    }

    public int getCharacterSlots() {
        return characterSlots;
    }

    public void setCharacterSlots(int characterSlots) {
        this.characterSlots = Math.min(characterSlots, GameConstants.MAX_CHARACTER_SLOTS);
    }

    public void addCharacterSlots(int amount) {
        setCharacterSlots(getCharacterSlots() + amount);
    }

    public Account getAccountByWorldId(int worldId) {
        for (Account account : getAccounts()) {
            if (account.getWorldId() == worldId) {
                return account;
            }
        }
        return null;
    }

    public int getVotePoints() {
        return votePoints;
    }

    public void setVotePoints(int votePoints) {
        this.votePoints = votePoints;
    }

    public int getDonationPoints() {
        return donationPoints;
    }

    public void setDonationPoints(int donationPoints) {
        this.donationPoints = donationPoints;
    }

    public byte getClientState() {
        return clientState;
    }

    public void setClientState(byte clientState) {
        this.clientState = clientState;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public boolean hasCorrectMachineID(byte[] machineID) {
        return Arrays.equals(machineID, getMachineID());
    }

    public byte[] getMachineID() {
        return machineID;
    }

    public void setMachineID(byte[] machineID) {
        this.machineID = machineID;
    }

    public int getLastCharID() {
        return lastCharID;
    }

    public void setLastCharID(int lastCharID) {
        this.lastCharID = lastCharID;
    }
}
