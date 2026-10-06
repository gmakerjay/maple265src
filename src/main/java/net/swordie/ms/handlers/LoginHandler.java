package net.swordie.ms.handlers;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.client.Account;
import net.swordie.ms.client.AccountQuest;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.User;
import net.swordie.ms.client.character.BroadcastMsg;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.EventNameTag;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.union.UnionBoard;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.client.jobs.JobManager;
import net.swordie.ms.client.jobs.adventurer.pirate.Cannoneer;
import net.swordie.ms.client.jobs.adventurer.thief.DualBlade;
import net.swordie.ms.client.social.Guild.Guild;
import net.swordie.ms.client.social.Guild.GuildResult;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.hikariCP.DatabaseManager;
import net.swordie.ms.connection.packet.Login;
import net.swordie.ms.connection.packet.MapLoadable;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.*;
import net.swordie.ms.enums.social.Guild.GuildType;
import net.swordie.ms.enums.social.Party.PartyType;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.handlers.header.OutHeader;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Util;
import net.swordie.ms.util.container.Tuple;
import net.swordie.ms.world.Channel;
import net.swordie.ms.world.World;
import net.swordie.ms.world.event.SunnySunday;
import org.mindrot.jbcrypt.BCrypt;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.ServerConstants.*;
import static net.swordie.ms.handlers.ApiRequestHandler.RND_BITS;
import static net.swordie.ms.handlers.ApiRequestHandler.USER_MASK;

public class LoginHandler {

    @Handler(op = InHeader.AUTH_HEARTBEAT)
    public static void handleAuthHeartBeat(Client c, InPacket inPacket) {
        if (c.isWaitingForAliveAck()) {
            c.setPing(System.currentTimeMillis() - c.getLastPingTime());
            Server.get().getPingTimer().addEvent(() -> {
                long now = System.currentTimeMillis();
                c.setLastPingTime(now);
                OutPacket outPacket = new OutPacket(OutHeader.ALIVE_REQ.getValue());
                outPacket.encodeLong(now);
                c.write(outPacket);
            }, 10, TimeUnit.SECONDS);
        }
    }

    @Handler(op = InHeader.PERMISSION_REQUEST)
    public static void handlePermissionRequest(Client c, InPacket inPacket) {
        byte locale = inPacket.decodeByte();
        short versionClient = inPacket.decodeShort();
        if (locale != LOCALE || versionClient != version) {
            c.close();
        }
    }

    @Handler(op = InHeader.WVS_SET_UP_STEP)
    public static void handleWvsSetUpStep(Client c, InPacket inPacket) {
        //System.out.printf("[%s] Setting up step : %d.%n", c.getIP(), inPacket.decodeInt());
    }

    @Handler(op = InHeader.CLIENT_LOADING_TIME_LOG)
    public static void handleClientLoadingTimeLong(Client c, InPacket inPacket) {
        System.out.printf("[%s] Loaded.%n", c.getIP());
    }

    @Handler(op = InHeader.USE_AUTH_SERVER)
    public static void handleAuthServer(Client c, InPacket inPacket) {
    }

    @Handler(op = InHeader.USER_GET_TIME_REQUEST)
    public static void handleServerTimeRequest(Client c, InPacket inPacket) {
        c.write(Login.sendLoginTime());
    }

    @Handler(op = InHeader.APPLIED_HOT_FIX)
    public static void handleAppliedHotFix(Client c, InPacket inPacket) {
        File dataWz = new File(RESOURCES_DIR + "/Data2.wz");
        byte[] data = new byte[0];
        try {
            data = Files.readAllBytes(dataWz.toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }
        //c.write(Login.setHotFix(data));
    }

    @Handler(op = InHeader.PONG)
    public static void handlePong(Client c, InPacket inPacket) {
    }

    @Handler(op = InHeader.CHECK_LOGIN_AUTH_INFO)
    public static void handleCheckLoginAuthInfo(Client c, InPacket inPacket) {
        changeLoginIMG(c);
    }

    @Handler(ops = {InHeader.WORLD_LIST_REQUEST, InHeader.WORLD_INFO_REQUEST})
    public static void handleWorldListRequest(Client c, InPacket packet) {
        changeLoginIMG(c);
    }

    private static void changeLoginIMG(Client c) {
        String[] bgs = new String[]{"Familiar", "twenteena", "Adversary"};
        var sunday = SunnySunday.SunnySundayLogic.get();
        if (sunday != null) {
            bgs = new String[]{"sundayMaple"};
        }
        c.write(MapLoadable.setMapTaggedObjectVisibleLogin(Util.getRandomFromCollection(bgs)));
        c.write(Login.sendWorldInformation(Server.get().getWorld(), c.getAccount() != null ? c.getAccount().getCharacters().size() : 0, null));
        c.write(Login.sendWorldInformationEnd(Server.get().getWorld()));
    }

    @Handler(op = InHeader.LOGOUT_WORLD)
    public static void handleLogOutWorld(Client c, InPacket inPacket) {
        int worldID = inPacket.decodeInt();
        int unk = inPacket.decodeInt();
        int lastCharacterID = inPacket.decodeInt();
        inPacket.decodeByte(); // not interested
        inPacket.decodeInt(); // not interested
        inPacket.decodeInt(); // not interested
        inPacket.decodeInt(); // not interested
        int loginTheme = inPacket.decodeInt();
        c.setCurrentState(Client.LOGOUT);
        c.setNextState(Client.NONE);
        User user = c.getUser();
        Char chr = null;
        if (user != null) {
            user.setClientState(c.getCurrentState());
            user.updateUserClientStateToSQL();
            user.setLastCharID(lastCharacterID);
            user.updateUserLastCharIdToSQL();
        }
        var acc = c.getAccount();
        if (acc != null) {
            chr = acc.getCharById(lastCharacterID);
            if (loginTheme >= 0) {
                acc.setLoginTheme(loginTheme);
                acc.saveLoginTheme();
            }
        }
        if (chr != null) {
            c.write(Login.quickLogin(chr));
        }
        changeLoginIMG(c);
    }

    @Handler(op = InHeader.WORLD_STATUS_REQUEST)
    public static void handleWorldStatusRequest(Client c, InPacket inPacket) {
        byte worldId = inPacket.decodeByte();
        // c.write(Login.sendServerStatus(worldId)); // In v265, sending SERVER_STATUS causes Error 38 crash
    }

    @Handler(op = InHeader.SERVERSTATUS_REQUEST)
    public static void handleServerStatusRequest(Client c, InPacket inPacket) {
        handleWorldStatusRequest(c, inPacket);
    }

    @Handler(op = InHeader.SELECT_WORLD)
    public static void handleSelectWorld(Client c, InPacket inPacket) {
        byte type = inPacket.decodeByte(); // 0
        byte worldId = inPacket.decodeByte();
        byte channel = (byte) (inPacket.decodeByte() + 1);
        inPacket.decodeByte();
        inPacket.decodeByte();
        inPacket.decodeInt();
        int loginType = inPacket.decodeByte(); // type
        short len = inPacket.decodeShort();
        String authInfo = null;
        if (len > 0) {
            authInfo = inPacket.decodeString(len);
        }
        byte[] machineID = inPacket.decodeArr(16);
        inPacket.decodeInt(); // 0
        inPacket.decodeByte(); // 1
        inPacket.decodeByte(); // 0
        byte[] localIP = inPacket.decodeArr(4);
        String cpuName = inPacket.decodeString(); // CPU Name
        String osName = inPacket.decodeString(); // OS Name
        int ram = inPacket.decodeInt(); // RAM
        byte code = 0; // success code
        int userID = 0;
        User user = null;
        if (c.getUser() != null) {
            userID = c.getUser().getId();
            user = c.getUser();
        } else {
            c.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Không tìm thấy dữ liệu tài khoản, vui lòng đăng nhập lại.")));
            return;
        }
        boolean isBannedMachine = false;
        try {
            isBannedMachine = Server.get().getBannedMacs().stream().anyMatch(s -> s != null && Arrays.equals(s, machineID));
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
        }
        Account account = user.getAccountByWorldId(worldId);
        World world = Server.get().getWorld();
        if (world != null && world.getChannelById(channel) != null) {
            if (Server.get().isUserLoggedIn(user)) {
                try {
                    User oldUser = Server.get().getUserById(userID);
                    final Client oldClient = oldUser.getClient();
                    if (oldClient != null && !oldClient.getIP().equals(c.getIP())) {
                        oldClient.close();
                    }
                    user = Server.get().getUserById(userID);
                    if (user == null) {
                        return;
                    }
                    user.setClient(c);
                    account = user.getCurrentAcc();
                } catch (Exception e) {
                    DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                }
            }
            if (user.getBanExpireDate() != null && !user.getBanExpireDate().isExpired()) {
                c.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("Your account has been banned!")));
                return;
            }
            if (isBannedMachine) {
                DataPrinter.send(DataPrinter.LOGIN, "Thông tin tài khoản " + user.getName() + " đã từng hoặc địa chỉ máy bị khoá tài khoản!");
            }
            if (ServerConfig.ADMIN_LOGIN && user.getAccountType() != AccountType.Admin) {
                c.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("The server is undergoing maintenance. Please try again later.")));
                return;
            }
            if (account == null) {
                account = user.getCurrentAcc();
                if (account == null) {
                    account = Account.getAccountFromSQLByUserID(userID);
                    if (account == null) {
                        account = new Account(user, worldId);
                        account.saveToSQL();
                    }
                }
            }
            account.init();
            user.setClient(c);
            c.setUser(user);
            c.setAccount(account);
            user.addAccount(account);
            c.write(Login.sendAccountInfo(user));
            c.setWorldId((byte) worldId);
            c.setChannel(channel);
            user.setMachineID(machineID);
            user.updateUserMachineIDToSQL();
            c.setCurrentState(Client.LOGIN_TRANSITION);
            c.setNextState(Client.NONE);
            user.setClientState(Client.LOGIN_TRANSITION);
            user.updateUserClientStateToSQL();
            //c.write(WvsContext.sendUserIDCheck(user.getId()));
            c.write(Login.setClientKey(199));
            c.write(Login.setPhysicalWorldID(worldId));
            c.write(WvsContext.sendSetPhysicalWorldAttach("VN"));
            c.write(Login.sendJobValues());
            c.write(new OutPacket(OutHeader.CLIENT_ALIVE));
            c.write(Login.selectWorldResult(c.getUser(), c.getAccount(), code, channel, "normal", true));
            DataPrinter.send(DataPrinter.LOGIN, "Thông tin tài khoản " + user.getName()
                    + " | IP: " + c.getIP()
                    + " | OS: " + osName
                    + " | Ram: " + ram + " MB"
                    + " | CPU: " + cpuName
                    + " | Machine ID: " + Util.readableByteArray(machineID)
            );
        } else {
            c.write(Login.selectCharacterResult(LoginType.UnauthorizedUser, (byte) 0, 0, 0));
        }
    }

    @Handler(op = InHeader.CHECK_DUPLICATE_ID)
    public static void handleCheckDuplicatedID(Client c, InPacket inPacket) {
        String name = inPacket.decodeString();
        CharNameResult code;
        if (!GameConstants.isValidName(name)) {
            code = CharNameResult.Unavailable_Invalid;
        } else {
            code = Char.isAvailableCharacter(name, c.getAccount().getWorldId()) ? CharNameResult.Available : CharNameResult.Unavailable_InUse;
        }
        c.write(Login.checkDuplicatedIDResult(name, code.getVal()));
    }

    @Handler(op = InHeader.CREATE_NEW_CHARACTER)
    public static void handleCreateNewCharacter(Client c, InPacket inPacket) {
        Account acc = c.getAccount();
        short size = inPacket.decodeShort();
        String name = inPacket.decodeString(size);
        int keySettingType = inPacket.decodeInt();
        int eventNewCharSaleJob = inPacket.decodeInt();
        int curSelectedRace = inPacket.decodeInt();
        JobConstants.JobEnum job = JobConstants.LoginJob.getLoginJobById(curSelectedRace).getBeginJob();
        short curSelectedSubJob = inPacket.decodeShort();
        byte gender = inPacket.decodeByte();
        byte skin = inPacket.decodeByte();
        byte itemLength = inPacket.decodeByte();
        int[] items = new int[itemLength]; //face, hair, markings, skin, overall, top, bottom, cape, boots, weapon
        for (int i = 0; i < itemLength; i++) {
            items[i] = inPacket.decodeInt();
        }
        int face = items[0];
        int hair = items[1];
        if (face > ItemConstants.MAX_FACE_2) {
            face = items[1];
            hair = items[0];
        }
        CharNameResult code = null;
        if (!ItemData.isStartingItems(items) || skin > ItemConstants.MAX_SKIN || skin < 0
                || (face < ItemConstants.MIN_FACE
                || face > ItemConstants.MAX_FACE && (face < ItemConstants.MIN_FACE_2 || face > ItemConstants.MAX_FACE_2))
                || (hair < ItemConstants.MIN_HAIR
                || hair > ItemConstants.MAX_HAIR && (hair < ItemConstants.MIN_HAIR_2 || hair > ItemConstants.MAX_HAIR_2))) {
            code = CharNameResult.Unavailable_CashItem;
        }
        if (!GameConstants.isValidName(name)) {
            code = CharNameResult.Unavailable_Invalid;
        } else if (!Char.isAvailableCharacter(name, acc.getWorldId())) {
            code = CharNameResult.Unavailable_InUse;
        } else if (acc.getCharacters().size() >= ServerConstants.MAX_CHARACTERS) {
            code = CharNameResult.Unavailable_Invalid;
            c.write(WvsContext.broadcastMsg(BroadcastMsg.popUpMessage("You are already at the maximum amount of characters on this world.")));
        }
        if (code != null) {
            c.write(Login.checkDuplicatedIDResult(name, code.getVal()));
            return;
        }
        //Character: Create.
        Char chr = new Char(acc.getId(), name, keySettingType, eventNewCharSaleJob, job.getJobId(), curSelectedSubJob,
                gender, skin, face, hair, items);
        chr.setOrderId(acc.generateNewOrderId());
        //Character: Settings.
        chr.setJobHandler(JobManager.getCreationJobById(curSelectedRace, chr));
        chr.getJobHandler().setCharCreationStats(chr);
        chr.initFuncKeyMaps(keySettingType, false);
        chr.setQuickslotKeys(new LinkedList<>(Arrays.asList((keySettingType == 0 ? GameConstants.QuickSlot_basic : GameConstants.QuickSlot_adv))));
        //Account: Add Character.
        acc.addCharacter(chr);
        //Character Stat: Settings.
        CharacterStat characterStat = chr.getAvatarData().getCharacterStat();
        characterStat.setSubJob(curSelectedSubJob);
        characterStat.setCharacterId(chr.getId());
        characterStat.setCharacterIdForLog(chr.getId());
        characterStat.setWorldIdForLog(WORLD_ID);
        characterStat.setMaxFriends(FriendConstant.DEFAULT_FRIEND_SLOT);
        characterStat.setMoney(100000);
        characterStat.setPosMap(FieldConstants.HENESYS_ID); // All newly created characters spawn in Henesys
        EventNameTag eventNameTag = new EventNameTag(chr.getId(), (byte) -1, (byte) -1, (byte) -1, (byte) -1, (byte) -1,
                "0000000000", "0000000000", "0000000000", "0000000000", "0000000000");
        chr.addEventNameTag(eventNameTag);
        chr.saveToSQL(); // insert to SQL and get new Id
        chr.getJobHandler().addItemToNewCharacter(chr);
        c.write(Login.createNewCharacterResult(LoginType.Success, chr));
    }

    @Handler(op = InHeader.DELETE_CHARACTER)
    public static void handleDeleteCharacter(Client c, InPacket inPacket) {
        Account acc = c.getAccount();
        if (acc != null) {
            inPacket.skipString();
            int charId = inPacket.decodeInt();
            Char chr = acc.getCharById(charId);
            if (chr != null) {
                final long now = System.currentTimeMillis();
                final long endTime = System.currentTimeMillis() + 24 * 60 * 60 * 1000L; // 24 hours
                try {
                    chr.setDeletionStartTime(now);
                    chr.updateCharFieldToSQL("deletionStartTime", now);
                }   catch (Exception e) {
                    DataPrinter.send(DataPrinter.ALL_IN_ONE, String.format("Thất bại đặt lịch xoá nhân vật %s: %s", chr.getName(), e.getMessage()));
                    c.write(Login.sendDeleteCharacterResult(charId, LoginType.UnauthorizedUser));
                } finally {
                    c.write(Login.sendReverseDeleteCharacterResult(charId, LoginType.Success, FileTime.fromLong(now), FileTime.fromLong(endTime)));
                    DataPrinter.send(DataPrinter.ALL_IN_ONE, String.format("Thành công đặt lịch xoá nhân vật %s vào lúc ." + FileTime.fromLong(now).toYYYYMMDDHHMMSS(), chr.getName()));
                }
            }
        } else {
            c.write(Login.selectCharacterResult(LoginType.IncorrectPassword, (byte) 0, 0, 0));
        }
    }

    @Handler(op = InHeader.RESERVED_DELETE_CHARACTER_CONFIRM)
    public static void handleReservedDeleteCharacterConfirm(Client c, InPacket inPacket) {
        int charId = inPacket.decodeInt();
        inPacket.skipString();
        Account acc = c.getAccount();
        User user = c.getUser();
        Char chr = Char.getCharDeleteByID(charId);
        if (chr != null && chr.getDeletionStartTime() != 0) {
            final String name = chr.getName();
            final int guildID = chr.getGuildID();
            final int partyID = chr.getPartyID();
            try {
                chr.deleteFromSQL();
                if (guildID != 0) {
                    Guild guild = Server.get().getWorld().getGuildByID(guildID);
                    if (guild != null) {
                        guild.removeMember(charId);
                        guild.broadcast(WvsContext.guildResult(GuildResult.response_GuildKick_Success(guild, charId, name)));
                    }
                }
                if (partyID != 0) {
                    Party party = Server.get().getWorld().getPartyByPartyID(partyID);
                    if (party.getMembers().size() == 1) {
                        party.disband();
                    } else {
                        party.leave(charId);
                    }
                }
                for (UnionBoard ub : acc.getUnion().getUnionBoards()) {
                    ub.removeMemberByCharId(charId);
                }
                acc.removeLinkSkillByChar(charId);
                acc.removeCharacter(chr);
                if (acc.getCurrentChr() != null && acc.getCurrentChr().getId() == charId) {
                    acc.setCurrentChr(null);
                }
                if (user.getCurrentChr() != null && user.getCurrentChr().getId() == charId) {
                    user.setCurrentChr(null);
                }
                if (c.getChr() != null && c.getChr().getId() == charId) {
                    c.setChr(null);
                }
                Server.get().removeChar(charId);
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.ALL_IN_ONE, String.format("Thất bại xoá nhân vật %s: %s", name, e.getMessage()));
                c.write(Login.sendDeleteCharacterResult(charId, LoginType.UnauthorizedUser));
            } finally {
                c.write(Login.sendDeleteCharacterResult(charId, LoginType.Success));
                DataPrinter.send(DataPrinter.ALL_IN_ONE, String.format("Thành công xoá nhân vật %s.", name));
            }
        } else {
            c.write(Login.sendDeleteCharacterResult(charId, LoginType.UnauthorizedUser));
        }
    }

    @Handler(op = InHeader.RESERVED_DELETE_CHARACTER_CANCEL)
    public static void handleReservedDeleteCharacterCancel(Client c, InPacket inPacket) {
        int charId = inPacket.decodeInt();
        Account acc = c.getAccount();
        if (acc != null) {
            Char chr = acc.getCharById(charId);
            if (chr != null) {
                try {
                    chr.setDeletionStartTime(0);
                    chr.updateCharFieldToSQL("deletionStartTime", 0);
                } catch (Exception e) {
                    c.write(Login.sendReverseDeleteCharacterCancelResult(charId, LoginType.UnauthorizedUser));
                } finally {
                    c.write(Login.sendReverseDeleteCharacterCancelResult(charId, LoginType.Success));
                }
            }
        }
    }

    @Handler(op = InHeader.CLIENT_ERROR)
    public static void handleClientError(Client c, InPacket inPacket) {
        c.close();
        if (inPacket.getData().length < 8) {
            DataPrinter.send(DataPrinter.CLIENT_ERROR, String.format("Error: %s", inPacket), true);
            return;
        }
        short type = inPacket.decodeShort();
        String type_str = "[Unknown]";
        if (type == 1) {
            type_str = "[OutPacket]";
        } else if (type == 2) {
            type_str = "[Crash Report]";
        } else if (type == 3) {
            type_str = "[Exception]";
        }
        int errortype = inPacket.decodeInt();
        short data_length = inPacket.decodeShort();
        inPacket.decodeInt();
        short op = inPacket.decodeShort();

        OutHeader opcode = OutHeader.getOutHeaderByOp(op);
        System.out.println(type_str + " Error "  + errortype + ": " + opcode  + "(" + op + ")");
        StringBuilder sb = new StringBuilder();
        String err = String.format("[Error %s] (%s / %d) Data: %s", errortype, opcode, op, inPacket);
        sb.append(err);
        if (opcode == OutHeader.TEMPORARY_STAT_SET) {
            for (int i = 0; i < CharacterTemporaryStat.length; i++) {
                int mask = inPacket.decodeInt();
                for (CharacterTemporaryStat cts : CharacterTemporaryStat.values()) {
                    if (cts.getPos() == i && (cts.getVal() & mask) != 0) {
                        err = String.format("[Error %s] Contained stat %s", errortype, cts);
                        System.out.println(err);
                        sb.append(err);
                    }
                }
            }
        } else if (opcode == OutHeader.CASH_SHOP_CASH_ITEM_RESULT) {
            byte cashType = inPacket.decodeByte();
            CashItemType cit = CashItemType.getResultTypeByVal(cashType);
            err = String.format("[Error %s] CashItemType %s", errortype, cit == null ? "Unknown" : cit.toString());
            sb.append(err);
        } else if (opcode == OutHeader.GUILD_RESULT) {
            byte guildType = inPacket.decodeByte();
            GuildType gt = GuildType.getTypeByVal(guildType);
            err = String.format("[Error %s] GuildType %s", errortype, gt == null ? "Unknown" : gt.toString());
            sb.append(err);
        } else if (opcode == OutHeader.PARTY_RESULT) {
            byte partyType = inPacket.decodeByte();
            PartyType pt = PartyType.getByVal(partyType);
            err = String.format("[Error %s] PartyType %s", errortype, pt == null ? "Unknown" : pt.toString());
            sb.append(err);
        } else if (opcode == OutHeader.REMOTE_SET_TEMPORARY_STAT) {
            int chrId = inPacket.decodeInt();
            for (int i = 0; i < CharacterTemporaryStat.length; i++) {
                int mask = inPacket.decodeInt();
                for (CharacterTemporaryStat cts : CharacterTemporaryStat.values()) {
                    if (cts.getPos() == i && (cts.getVal() & mask) != 0) {
                        err = String.format("[Error %s] %s contained stat %s", errortype, Char.getCharDataByID(chrId).getName(), cts);
                        sb.append(err);
                    }
                }
            }
        } else if (opcode == OutHeader.SHOP_OPEN) {
            int NpcTemplateID = inPacket.decodeInt();
            err = String.format("[Error %s] Shop Open %s", errortype, NpcTemplateID);
            sb.append(err);
        } else if (opcode == OutHeader.MOB_ENTER_FIELD) {
            inPacket.decodeByte();
            inPacket.decodeInt();
            inPacket.decodeByte();
            int mobTemplateID = inPacket.decodeInt();
            err = String.format("[Error %s] Mob Template ID: %s", errortype, mobTemplateID);
            sb.append(err);
        } else if (opcode == OutHeader.SUMMONED_CREATED) {
            int charID = inPacket.decodeInt();
            inPacket.decodeInt();
            int skillID = inPacket.decodeInt();
            err = String.format("[Error %s] Summon Created Skill ID %d from character %d", errortype, skillID, charID);
            sb.append(err);
        } else if (opcode == OutHeader.REMOTE_MAGIC_ATTACK
                || opcode == OutHeader.REMOTE_MELEE_ATTACK
                || opcode == OutHeader.REMOTE_SHOOT_ATTACK) {
            int charID = inPacket.decodeInt();
            inPacket.decodeByte();
            inPacket.decodeByte();
            inPacket.decodeInt();
            int slv = inPacket.decodeInt();
            int skillID = 0;
            if (slv > 0) {
                skillID = inPacket.decodeInt();
            }
            err = String.format("[Error %s] Character %d got an attack Skill ID %d, SLV: %d", charID, errortype, skillID, slv);
            sb.append(err);
        } else if (opcode == OutHeader.REMOTE_MAGIC_ATTACK
                || opcode == OutHeader.REMOTE_MELEE_ATTACK
                || opcode == OutHeader.REMOTE_SHOOT_ATTACK) {
            int charID = inPacket.decodeInt();
            inPacket.decodeByte();
            inPacket.decodeByte();
            inPacket.decodeInt();
            int slv = inPacket.decodeInt();
            int skillID = 0;
            if (slv > 0) {
                skillID = inPacket.decodeInt();
            }
            err = String.format("[Error %s] Character %d got an attack Skill ID %d, SLV: %d", charID, errortype, skillID, slv);
            sb.append(err);
        }

        DataPrinter.send(DataPrinter.CLIENT_ERROR, sb.toString(), true);
    }

    @Handler(op = InHeader.PRIVATE_SERVER_PACKET)
    public static void handlePrivateServerPacket(Client c, InPacket inPacket) {
        if (inPacket.getUnreadAmount() >= 4) { // hack to ignore another non-game op that throws you a bunch of random bytes
            //c.write(Login.sendAuthResponse(((int) OutHeader.PRIVATE_SERVER_PACKET.getValue()) ^ inPacket.decodeInt()));
        }
    }

    @Handler(op = InHeader.LOGIN_AFTER_CHAR_CREATION)
    public static void LoginAfterCharacterCreation(Client c, InPacket inPacket) {
        int characterId = inPacket.decodeInt();
        byte channelId = inPacket.decodeByte();
        String mac = inPacket.decodeString();
        String somethingElse = inPacket.decodeString();
        if (c.getAccount().getCharById(characterId) == null) {
            c.write(Login.selectCharacterResult(LoginType.UnauthorizedUser, (byte) 0, 0, 0));
            return;
        }
        c.setAuthorized(true); // Since no pic
        byte worldId = c.getWorldId();
        Channel channel = Server.get().getWorld().getChannelById(channelId);
        if (channel == null) {
            channel = Server.get().getWorld().getChannelById((byte) 1);
            channelId = (byte) 1;
        }
        channel.addClientInTransfer(channelId, characterId, c);
        c.setNextState(Client.IN_FIELD);
        c.write(Login.selectCharacterResult(LoginType.Success, (byte) 0, channel.getPort(), characterId));
    }

    @Handler(op = InHeader.CHAR_SELECT_NO_PIC)
    public static void handleCharSelectNoPic(Client c, InPacket inPacket) {
        int characterId = inPacket.decodeInt();
        String mac = inPacket.decodeString();
        String somethingElse = inPacket.decodeString();
        String pic = BCrypt.hashpw(inPacket.decodeString(), BCrypt.gensalt(BCRYPT_ITERATIONS));
        c.getUser().setPic(pic);
        byte worldId = c.getWorldId();
        byte channelId = c.getChannel();
        Char chr = c.getAccount().getCharById(characterId);
        Channel channel = Server.get().getWorld().getChannelById(channelId);
        if (channel == null) {
            channel = Server.get().getWorld().getChannelById((byte) 1);
        }
        channel.addClientInTransfer(channelId, characterId, c);
        Client oldClient = Server.get().getChannelFromTransfer(characterId).getRight();
        if (chr == null || channel == null || oldClient == null) {
            System.out.println("Client " + c.getIP() + " bị Null ở chr hoặc channel hoặc oldClient.");
            return;
        }
        c.setAuthorized(true); // Since no pic
        oldClient.setChr(chr);
        c.setNextState(Client.IN_FIELD);
        c.write(Login.selectCharacterResult(LoginType.Success, (byte) 0, channel.getPort(), characterId));
        System.out.println(chr.getName() + " is logging in!");
    }

    @Handler(op = InHeader.CHAR_SELECT)
    public static void handleCharSelect(Client c, InPacket inPacket) {
        int characterId = inPacket.decodeInt();
        String name = inPacket.decodeString();
        byte worldId = c.getWorldId();
        byte channelId = c.getChannel();
        c.setAuthorized(true); // Since no pic
        Channel channel = Server.get().getWorld().getChannelById(channelId);
        if (channel == null) {
            channel = Server.get().getWorld().getChannelById((byte) 1);
        }
        if (c.isAuthorized() && c.getAccount().hasCharacter(characterId)) {
            channel.addClientInTransfer(channelId, characterId, c);
            c.setNextState(Client.IN_FIELD);
            c.write(Login.selectCharacterResult(LoginType.Success, (byte) 0, channel.getPort(), characterId));
            System.out.println(name + " is logging in!");
        }
    }

    @Handler(op = InHeader.SELECT_CHARACTER)
    public static void handleSelectCharacter(Client c, InPacket inPacket) {
        int characterId = inPacket.decodeInt();
        byte worldId = c.getWorldId();
        byte channelId = c.getChannel();
        c.setAuthorized(true); // Since no pic
        Channel channel = Server.get().getWorld().getChannelById(channelId);
        if (channel == null) {
            channel = Server.get().getWorld().getChannelById((byte) 1);
        }
        if (c.isAuthorized() && c.getAccount().hasCharacter(characterId)) {
            channel.addClientInTransfer(channelId, characterId, c);
            c.setNextState(Client.IN_FIELD);
            c.write(Login.selectCharacterResult(LoginType.Success, (byte) 0, channel.getPort(), characterId));
        }
    }

    @Handler(op = InHeader.CHANGE_PIC_REQUEST)
    public static void handleChangePicRequest(Client c, InPacket inPacket) {
        short currentPicSize = inPacket.decodeShort();
        String currentPic = inPacket.decodeString(currentPicSize);
        short newPicSize = inPacket.decodeShort();
        String unencryptedPic = inPacket.decodeString(newPicSize);

        if (BCrypt.checkpw(currentPic, c.getUser().getPic())) {
            if (unencryptedPic.length() < 6) {
                c.write(Login.changePicResponse(LoginType.InsufficientSPW));
            } else if (BCrypt.checkpw(unencryptedPic, c.getUser().getPassword())) {
                c.write(Login.changePicResponse(LoginType.SamePasswordAndSPW));
            } else {
                String pic = BCrypt.hashpw(unencryptedPic, BCrypt.gensalt(BCRYPT_ITERATIONS));
                c.getUser().setPic(pic);
                c.getUser().updateUserPICToSQL();
                c.write(Login.changePicResponse(LoginType.Success));
            }
        } else {
            c.write(Login.changePicResponse(LoginType.IncorrectSPW));
        }
    }

    public static int extractUserId(int token) {
        return (token >>> RND_BITS) & USER_MASK;
    }

    public static int verifyTokenAndUserId(int token) {
        int mappedUserId = Server.get().getUserIdFromAuthToken(token);
        if (mappedUserId > 0) {
            int embeddedUserId = extractUserId(token);
            if (embeddedUserId == mappedUserId || LOCAL_HOST_SERVER) {
                return mappedUserId;
            }
            return -1;
        }

        if (LOCAL_HOST_SERVER || ServerConfig.DEBUG_MODE) {
            int embeddedUserId = extractUserId(token);
            if (embeddedUserId > 0 && User.getUserFromSQLByID(embeddedUserId) != null) {
                return embeddedUserId;
            }
            if (token > 0 && token < 100000 && User.getUserFromSQLByID(token) != null) {
                return token;
            }
        }
        return -1;
    }

    @Handler(op = InHeader.SPECIAL_LOGIN_AUTH_REQUEST)
    public static void handleSpecialLogin_Auth_Request(Client c, InPacket inPacket) {
        inPacket.decodeByte();
        int sessionKey = inPacket.decodeInt();
        int userID = verifyTokenAndUserId(sessionKey);
        User user = null;
        if (c.getUser() != null) {
            userID = c.getUser().getId();
            user = c.getUser();
        } else {
            user = User.getUserFromSQLByID(userID);
            if (user == null) {
                c.write(Login.checkPasswordResult(false, LoginType.UnauthorizedUser, null));
                return;
            }
            user.loadAccountsData();
        }
        int worldId = WORLD_ID;
        Account account = user.getAccountByWorldId(worldId);
        World world = Server.get().getWorld();
        if (world != null) {
            if (Server.get().isUserLoggedIn(user)) {
                try {
                    User oldUser = Server.get().getUserById(userID);
                    final Client oldClient = oldUser.getClient();
                    if (oldClient != null && !oldClient.getIP().equals(c.getIP())) {
                        oldClient.close();
                    }
                    user = Server.get().getUserById(userID);
                    if (user == null) {
                        return;
                    }
                    user.setClient(c);
                    account = user.getCurrentAcc();
                } catch (Exception e) {
                    DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                }
            }
            if (user.getBanExpireDate() != null && !user.getBanExpireDate().isExpired()) {
                c.write(Login.checkPasswordResult(false, LoginType.Blocked, null));
                return;
            }
            if (ServerConfig.ADMIN_LOGIN && user.getAccountType() != AccountType.Admin) {
                c.write(Login.checkPasswordResult(false, LoginType.Timeout, null));
                return;
            }
            if (account == null) {
                account = user.getCurrentAcc();
                if (account == null) {
                    account = Account.getAccountFromSQLByUserID(userID);
                    if (account == null) {
                        account = new Account(user, worldId);
                        account.saveToSQL();
                    }
                }
            }
            account.init();
            user.setClient(c);
            c.setUser(user);
            c.setAccount(account);
            user.addAccount(account);
            c.setWorldId((byte) worldId);
            user.updateUserMachineIDToSQL();
            c.setCurrentState(Client.LOGIN_TRANSITION);
            c.setNextState(Client.NONE);
            user.setClientState(Client.LOGIN_TRANSITION);
            user.updateUserClientStateToSQL();
            c.write(Login.checkPasswordResult(true, null, user));
            DataPrinter.send(DataPrinter.LOGIN, "Thông tin tài khoản " + user.getName() + " | IP: " + c.getIP());
            Char chr = null;
            if (user.getLastCharID() != 0) {
                chr = account.getCharById(user.getLastCharID());
            }
            if (chr != null) {
                c.write(Login.quickLogin(chr));
            }
            changeLoginIMG(c);
            Tuple<Integer, Byte> switchChar = Server.get().getSwitchCharID(user.getId());
            if (switchChar != null) {
                final int charID = switchChar.getLeft();
                byte channelId = switchChar.getRight();
                Channel channel = Server.get().getWorld().getChannelById(channelId);
                if (channel == null) {
                    channel = Server.get().getWorld().getChannelById((byte) 1);
                    channelId = 1;
                }
                Server.get().getSwitchChars().remove(user.getId());
                if (!account.hasCharacter(charID) && charID != 0) {
                    return;
                }
                c.write(Login.sendAccountInfo(user));
                c.setWorldId((byte) worldId);
                c.setChannel(channelId);
                //c.write(WvsContext.sendUserIDCheck(user.getId()));
                c.write(Login.setClientKey(199));
                c.write(Login.setPhysicalWorldID(worldId));
                c.write(WvsContext.sendSetPhysicalWorldAttach("VN"));
                c.write(Login.sendJobValues());
                c.write(new OutPacket(OutHeader.CLIENT_ALIVE));
                c.write(Login.selectWorldResult(c.getUser(), c.getAccount(), (byte) 0, channelId, "normal", true));
                if (charID != 0) {
                    // switch char
                    c.setAuthorized(true); // Since no pic
                    if (c.isAuthorized() && c.getAccount().hasCharacter(charID)) {
                        channel.addClientInTransfer(channelId, charID, c);
                        c.setNextState(Client.IN_FIELD);
                        c.write(Login.selectCharacterResult(LoginType.Success, (byte) 0, channel.getPort(), charID));
                    }
                }
            }
        } else {
            c.write(Login.selectCharacterResult(LoginType.UnauthorizedUser, (byte) 0, 0, 0));
        }
    }


    @Handler(op = InHeader.AUTH_FAILURE)
    public static void handleAuthFailure(Client c, InPacket inPacket) {
        byte step = inPacket.decodeByte();
        int errorCode = inPacket.decodeInt();
        System.out.printf("Auth failure! Login step %d, errorCode %d.%n", step, errorCode);
        byte worldID = 1;
        byte channel = 1;
        byte code = 0;
        c.setWorldId(worldID);
        c.setChannel(channel);
    }

    @Handler(op = InHeader.CHECK_SPW_REQUEST)
    public static boolean handleCheckSpwRequest(Client c, InPacket inPacket) {
        c.setAuthorized(true);
        return true;
    }

    @Handler(op = InHeader.EXCEPTION_LOG)
    public static void handleExceptionLog(Client c, InPacket inPacket) {
        String str = Util.toStringFromAscii(inPacket.getData());
        System.out.println(str + "\r\n");

        try {
            String packet = str.split("[]]")[1].substring(12); // skip everything up until the opcode
            byte[] fullPacketArr = Util.getByteArrayByString(packet);
            short op = (short) ((fullPacketArr[0] & 0xFF) + ((fullPacketArr[1] & 0xFF) << 8));
            byte[] packetData = new byte[fullPacketArr.length - 2];
            System.arraycopy(fullPacketArr, 2, packetData, 0, packetData.length);
            OutHeader header = OutHeader.getOutHeaderByOp(op);

            String msg = String.format("Exception log: [%s], %d/0x%X\t| %s\r\n Full String: %s", header, op, op, Util.readableByteArray(packetData), str);
            StringBuilder sb = new StringBuilder();

            if (header == OutHeader.TEMPORARY_STAT_SET || header == OutHeader.REMOTE_SET_TEMPORARY_STAT || header == OutHeader.USER_ENTER_FIELD) {
                inPacket = new InPacket(packetData);
                if (header == OutHeader.REMOTE_SET_TEMPORARY_STAT) {
                    inPacket.decodeInt(); // chr id
                } else if (header == OutHeader.USER_ENTER_FIELD) {
                    inPacket.decodeInt();
                    inPacket.decodeInt();
                    inPacket.decodeString();
                    inPacket.decodeString(); // parent name, deprecated
                    // guild
                    inPacket.decodeString();
                    inPacket.decodeShort();
                    inPacket.decodeByte();
                    inPacket.decodeShort();
                    inPacket.decodeByte();
                    // end guild
                    inPacket.decodeByte();
                    inPacket.decodeInt();
                    inPacket.decodeInt();
                    inPacket.decodeInt();
                    inPacket.decodeInt();
                    inPacket.decodeByte();
                }
                for (int i = 0; i < CharacterTemporaryStat.length; i++) {
                    int mask = inPacket.decodeInt();
                    for (CharacterTemporaryStat cts : CharacterTemporaryStat.values()) {
                        if (cts.getPos() == i && (cts.getVal() & mask) != 0) {
                            String stat = String.format("Contained stat %s", cts);
                            sb.append(stat);
                        }
                    }
                }
            }

            msg = msg + "\r\n" + sb;
            System.out.println(msg);
        } catch (Exception ignored) {
        }
    }

    @Handler(op = InHeader.WVS_CRASH_CALLBACK)
    public static void handleWvsCrashCallback(Client c, InPacket inPacket) {
        if (c != null && c.getChr() != null) {
            c.close();
        }
    }

    @Handler(op = InHeader.CHANGE_CHARACTER_SLOT)
    public static void handleChangeCharacterSlot(Client c, InPacket inPacket) {
        int userID = inPacket.decodeInt();
        if (c.getUser().getId() != userID) {
            return;
        }
        List<Char> chars = new ArrayList<>(c.getAccount().getCharacters());
        chars.sort(Comparator.comparingInt(Char::getId));
        int size = inPacket.decodeInt();
        for (int i = 0; i < size; i++) {
            int newID = inPacket.decodeInt();
            Char chr = c.getAccount().getCharacters().stream().filter(ch -> ch.getId() == newID).findFirst().orElse(null);
            if (chr != null) {
                chr.setOrderId(i);
                chr.updateCharacterOrderIDToSQL();
            }
        }
    }

    @Handler(op = InHeader.VIEW_CHANNEL_REQUEST)
    public static void handleViewChannelRequest(Client c, InPacket inPacket) {
        byte idk = inPacket.decodeByte();
        int worldId = inPacket.decodeInt();
        World world = Server.get().getWorld();
        if (world != null) {
            c.write(Login.viewChannelResult(LoginType.Success, worldId, -1));
        } else {
            c.write(Login.viewChannelResult(LoginType.Unknown, worldId, -1));
        }
    }

    @Handler(op = InHeader.CREATE_NEW_CHARACTER_CHECKER)
    public static void handleCreateNewCharacterChecker(Client c, InPacket inPacket) {
        final String Secondpw_Client = inPacket.decodeString();
        c.write(Login.createNewCharacterCheckResult(0));
    }
}
