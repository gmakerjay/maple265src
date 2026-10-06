package net.swordie.ms.handlers.user;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.client.Account;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.User;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.HyperTPRock;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.TownPortal;
import net.swordie.ms.client.jobs.JobManager;
import net.swordie.ms.client.jobs.adventurer.thief.DualBlade;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.enums.FieldOption;
import net.swordie.ms.enums.MapTransferType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.FieldData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;
import net.swordie.ms.util.container.Tuple;
import net.swordie.ms.world.World;
import net.swordie.ms.world.boss.Gollux;
import net.swordie.ms.world.event.OlaOlaEvent;
import net.swordie.ms.world.event.PhysicalFitnessEvent;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.FieldInstanceType;
import net.swordie.ms.world.field.Portal;

import java.util.concurrent.TimeUnit;

public class MigrationHandler {

    @Handler(op = InHeader.MIGRATE_IN)
    public static void handleMigrateIn(Client c, InPacket inPacket) {
        inPacket.decodeInt(); // worldID
        int userID = inPacket.decodeInt();
        int charId = inPacket.decodeInt();
        byte[] machineID = inPacket.decodeArr(16);
        boolean isFirstLogin = false;
        Tuple<Byte, Client> info = Server.get().getChannelFromTransfer(charId);
        if (info == null || info.getLeft() < 0) {
            DataPrinter.send(DataPrinter.CLIENT_ERROR, String.format("Client %s gặp lỗi trong quá trình chuyển giao làm cho hệ thống không có dữ liệu.", c.getIP()));
            c.close();
            return;
        }
        byte channel = info.getLeft();
        Client oldClient = info.getRight();
        c.setOldChannel(oldClient.getOldChannel());
        User user = oldClient.getUser();
        if (user == null) {
            DataPrinter.send(DataPrinter.CLIENT_ERROR, String.format("Client %s gặp lỗi trong quá trình chuyển giao làm cho user bị null.", c.getIP()));
            c.close();
            return;
        }
        int worldId = ServerConstants.WORLD_ID;
        World world = Server.get().getWorld();
        Account acc = user.getAccountByWorldId(worldId);
        if (acc == null) {
            DataPrinter.send(DataPrinter.CLIENT_ERROR, String.format("Client %s có username %s gặp lỗi trong quá trình chuyển giao làm cho account bị null.", c.getIP(), user.getName()));
            c.close();
            return;
        }
        c.setAccount(acc);
        world.getChannelById(channel).removeClientFromTransfer(charId);
        //world.removeCharsByID(charId);
        c.setChannel(channel);
        c.setWorldId((byte) worldId);
        c.setChannelInstance(world.getChannelById(channel));
        Char chr = oldClient.getChr();
        if (chr == null || chr.getId() != charId) {
            isFirstLogin = true;
            chr = acc.getCharById(charId);
            if (chr == null) {
                chr = Char.getCharDataByID(charId);
                if (chr == null || chr.getAccId() != acc.getId()) {
                    DataPrinter.send(DataPrinter.CLIENT_ERROR, String.format("Client %s có username %s đã cố tình hoặc không tìm thấy nhân vật với ID %d trong tài khoản của họ.", c.getIP(), user.getName(), charId));
                    c.close();
                    return;
                }
            }
        }
        // User:
        user.setCurrentChr(chr);
        user.setCurrentAcc(acc);
        user.setClientState(Client.IN_FIELD);
        user.updateUserClientStateToSQL();
        user.setLastCharID(chr.getId());
        user.updateUserLastCharIdToSQL();

        // Char:
        chr.setUser(user);
        chr.setClient(c);
        chr.setAccount(acc);

        // Account:
        acc.setCurrentChr(chr);
        acc.setUser(user);

        // Client:
        c.setCurrentState(Client.IN_FIELD);
        c.setNextState(Client.NONE);
        c.setChr(chr);
        c.setUser(user);

        chr.setFieldInstanceType(FieldInstanceType.CHANNEL);

        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        if (cs.getExp() < 0) {
            cs.setExp(Math.abs(cs.getExp()));
        }
        chr.initKanna();
        try {
            if (isFirstLogin) {
                chr.loadCharacterData();
                chr.loadCharacterPartyData();
                chr.loadCharacterGuildData();
                chr.initBlessingSkillNames();
                chr.initSkillAlarms();
                chr.initHyperStats();
                chr.initCharacterPotentials();
                chr.initLinkSkills(true);
                chr.initEquips();
                chr.initCompletedSetItemID();
                chr.initRewardSystem();
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT_MIGRATION, e);
            c.close();
            return;
        }
        if (isFirstLogin) {
            if (chr.getJobHandler() == null) {
                chr.setJobHandler(chr.getSubJob() == 1 ? new DualBlade(chr) : JobManager.getJobById(chr.getJob(), chr));
            }
            var party = chr.getWorld().getPartyByPartyID(chr.getPartyID());
            if (chr.getPartyID() != 0 && party != null) {
                chr.setParty(party);
            }
        }
        chr.setBurningFieldLevel(FieldConstants.BURNING_FIELD_LEVEL_ON_START);
        var field = chr.getOrCreateFieldByCurrentInstanceType(chr.getFieldID() <= 0 ? FieldConstants.HOME_MAP : chr.getFieldID());
        chr.initAndroid(true);
        //Set this before warp for Set Field.
        chr.warp(field, true);

        Char currentChar = chr;
        chr.getTimer().addEvent(currentChar::initialize, 1500, TimeUnit.MILLISECONDS);

        chr.checkAndRemoveExpiredItems(isFirstLogin);
        if (isFirstLogin) {
            chr.initBaseStats();
            chr.initTraits();
            chr.initFatigueTimer();
        }
        chr.setOnline(true); // v195+: respect 'invisible login' setting
        if (chr.getInstance() != null) {
            chr.getScriptManager().warpInstanceOut(chr, chr.getFieldID());
        }
        //chr.write(WvsContext.checkProcessResult(true));
        if (ServerConfig.IP_LOG && isFirstLogin) {
            DataPrinter.send(DataPrinter.LOGIN, String.format("[IP: %s] [Tài khoản: %s] [Nhân vật: %s] đã vào game."
                            + " | Machine ID: " + Util.readableByteArray(machineID),
                    c.getIP(), user.getName(), chr.getName()));
        }
    }

    @Handler(op = InHeader.USER_TRANSFER_FIELD_REQUEST)
    public static void handleUserTransferFieldRequest(Char chr, InPacket inPacket) {
        Client c = chr.getClient();
        if (c.getCurrentState() == Client.IN_CASH_SHOP) {
            c.migrateOut(chr);
            return;
        }
        inPacket.decodeByte();
        byte fieldKey = inPacket.decodeByte();
        int targetField = inPacket.decodeInt();
        if (targetField == 106020100 || targetField == 106020400) {
            // same issue as below, its in mushroom kingdom so maybe the maps are just outdated or w/e
            targetField = 106020403;
        } else if (targetField == 106020402) {
            // warping from portal in 106020403 is unable to find defined portal (not a scripted portal)
            targetField = 106020000;
        }
        String portalName = inPacket.decodeString();
        if (portalName != null && !"".equals(portalName)) {
            ScriptManagerImpl sm = chr.getScriptManager();
            if (sm.isOlaOlaOpen() && portalName.equals(OlaOlaEvent.JOIN_PORTAL)) {
                chr.chatMessage("The Ola Ola Event has not been started.");
                chr.dispose();
            } else if (sm.isOlaOlaActive() && portalName.equals(OlaOlaEvent.JOIN_PORTAL)) {
                Field field = chr.getField();
                Portal portal = field.getPortalByName(portalName);
                if (portal.getScript() != null && !portal.getScript().equals("")) {
                    chr.getScriptManager().startScript(chr, portal.getId(), portal.getScript(), ScriptType.Portal);
                    chr.dispose();
                } else {
                    Field toField = chr.getOrCreateFieldByCurrentInstanceType(portal.getTargetMapId());
                    if (toField == null) {
                        return;
                    }
                    Portal toPortal = toField.getPortalByName(portal.getTargetPortalName());
                    if (toPortal == null) {
                        toPortal = toField.getPortalByName("sp");
                    }
                    chr.warp(toField, toPortal, false, false);
                }
            } else if (sm.isPhysicalFitnessOpen() && portalName.equals(PhysicalFitnessEvent.JOIN_PORTAL)) {
                chr.chatMessage("The Physical Fitness Event has not been started.");
                chr.dispose();
            } else if (sm.isPhysicalFitnessActive() && portalName.equals(PhysicalFitnessEvent.JOIN_PORTAL)) {
                Field field = chr.getField();
                Portal portal = field.getPortalByName(portalName);
                if (portal.getScript() != null && !portal.getScript().equals("")) {
                    chr.getScriptManager().startScript(chr, portal.getId(), portal.getScript(), ScriptType.Portal);
                    chr.dispose();
                } else {
                    Field toField = chr.getOrCreateFieldByCurrentInstanceType(portal.getTargetMapId());
                    if (toField == null) {
                        return;
                    }
                    Portal toPortal = toField.getPortalByName(portal.getTargetPortalName());
                    if (toPortal == null) {
                        toPortal = toField.getPortalByName("sp");
                    }
                    chr.warp(toField, toPortal, false, false);
                }
            } else {
                Field field = chr.getField();
                Portal portal = field.getPortalByName(portalName);
                if (portal == null) {
                    portal = field.getDefaultPortal();
                }
                if (portal.getScript() != null && !portal.getScript().equals("")) {
                    chr.getScriptManager().startScript(chr, portal.getId(), portal.getScript(), ScriptType.Portal);
                    chr.dispose();
                } else {
                    Field toField = chr.getOrCreateFieldByCurrentInstanceType(portal.getTargetMapId());
                    if (toField == null) {
                        return;
                    }
                    Portal toPortal = toField.getPortalByName(portal.getTargetPortalName());
                    if (toPortal == null) {
                        toPortal = toField.getPortalByName("sp");
                    }
                    chr.warp(toField, toPortal);
                }
            }
        } else if (chr.getHP() <= 0) {
            chr.revive(targetField);
        } else if (chr.getTransferField() == targetField && chr.getTransferFieldReq() == chr.getField().getId()) {
            Field toField = chr.getOrCreateFieldByCurrentInstanceType(chr.getTransferField());
            if (toField != null && chr.getTransferField() > 0) {
                chr.warp(toField);
            }
            chr.setTransferField(0);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_PORTAL_SCRIPT_REQUEST)
    public static void handleUserPortalScriptRequest(Char chr, InPacket inPacket) {
        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }
        byte portalID = inPacket.decodeByte();
        String portalName = inPacket.decodeString();
        Portal portal = chr.getField().getPortalByName(portalName);
        String script;
        if (portal != null) {
            portalID = (byte) portal.getId();
            script = "".equals(portal.getScript()) ? portalName : portal.getScript();
            if (script.equals("pt_mutoHotPot")) {
                chr.checkIngredients();
            } else {
                chr.getScriptManager().startScript(chr, portalID, script, ScriptType.Portal);
            }
        } else {
            chr.chatMessage("Lỗi cánh cổng không xác định: " + portalName);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_PORTAL_TELEPORT_REQUEST)
    public static void handleUserPortalTeleportRequest(Char chr, InPacket inPacket) {
        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }
        byte portalID = inPacket.decodeByte();
        int unk = inPacket.decodeShort();
        int unk2 = inPacket.decodeInt();
        Position toPos = new Position(inPacket.decodeInt(), inPacket.decodeInt());
        chr.write(FieldPacket.teleport(toPos, chr));
    }

    @Handler(op = InHeader.USER_TRANSFER_CHANNEL_REQUEST)
    public static void handleUserTransferChannelRequest(Client c, InPacket inPacket) {
        Char chr = c.getChr();
        byte channelId = (byte) (inPacket.decodeByte() + 1);
        if (c.getWorld().getChannelById(channelId) == null) {
            return;
        }
        if (chr == null) {
            c.close();
            return;
        }

        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }

        Field field = chr.getField();
        if ((field.getFieldLimit() & FieldOption.MigrateLimit.getVal()) > 0
                || channelId < 1 || channelId > c.getWorld().getChannels().size()) {
            chr.dispose();
            return;
        }

        chr.changeChannel(channelId);
    }

    @Handler(op = InHeader.USER_MIGRATE_TO_CASH_SHOP_REQUEST)
    public static void handleUserMigrateToCashShopRequest(Client c, InPacket inPacket) {
        Char chr = c.getChr();
        if (chr == null) {
            c.close();
            return;
        }
        Account acc = chr.getAccount();
        Field field = chr.getField();
        if ((field.getFieldLimit() & FieldOption.MigrateLimit.getVal()) > 0 || chr.getHP() <= 0) {
            chr.dispose();
            return;
        }
        c.migrateIn(false);
        c.write(Stage.setCashShop(chr));
        c.write(CCashShop.queryCashResult(chr));
        c.write(CCashShop.loadLockerDone(acc));
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item instanceof Equip equip && !equip.hasPotential()) {
                if (equip.isCash()) {
                    continue;
                }
                chr.write(WvsContext.addItemToInventory(item));
            }
        }
    }

    @Handler(op = InHeader.USER_MIGRATE_TO_AUCTION_HOUSE_REQUEST)
    public static void handleUserMigrateToAuctionHouseRequest(Client c, InPacket inPacket) {
        Char chr = c.getChr();
        if (chr == null) {
            c.close();
            return;
        }
        Field field = chr.getField();
        if ((field.getFieldLimit() & FieldOption.MigrateLimit.getVal()) > 0 || chr.getHP() <= 0) {
            chr.dispose();
            return;
        }
        c.migrateIn(true);
        c.write(Stage.setAuctionField(chr));
        for (Item item : chr.getEquipInventory().getItems()) {
            if (item instanceof Equip equip && !equip.hasPotential()) {
                if (equip.isCash()) {
                    continue;
                }
                chr.write(WvsContext.addItemToInventory(item));
            }
        }
    }

    @Handler(op = InHeader.AUCTION_LEAVE_REQUEST)
    public static void handleUserAuctionLeaveRequest(Client c, InPacket inPacket) {
        c.auctionHouseOut(c.getChr());
    }

    @Handler(op = InHeader.USER_MAP_TRANSFER_REQUEST)
    public static void handleUserMapTransferRequest(Char chr, InPacket inPacket) {
        chr.punishLieDetectorEvasion();

        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }

        byte mtType = inPacket.decodeByte();
        byte itemType = inPacket.decodeByte();

        MapTransferType mapTransferType = MapTransferType.getByVal(mtType);
        switch (mapTransferType) {
            case DeleteListRecv: //Delete request that's received
                int targetFieldID = inPacket.decodeInt();
                HyperTPRock.removeFieldId(chr, targetFieldID);
                chr.write(WvsContext.mapTransferResult(MapTransferType.DeleteListSend, itemType, chr.getHyperRockFields()));
                break;

            case RegisterListRecv: //Register request that's received
                targetFieldID = chr.getFieldID();
                Field field = chr.getField();
                if (field == null || (field.getFieldLimit() & FieldOption.TeleportItemLimit.getVal()) > 0) {
                    chr.chatMessage("Bạn không thể dịch chuyển đến bản đồ này.");
                    chr.dispose();
                    return;
                }
                int levelLimit = field.getLvLimit();
                if (chr.getLevel() < levelLimit) {
                    chr.chatMessage(String.format("Your Level: %d, Map Request Level: %d", chr.getLevel(), levelLimit));
                    chr.dispose();
                    return;
                }
                HyperTPRock.addFieldId(chr, targetFieldID);
                chr.write(WvsContext.mapTransferResult(MapTransferType.RegisterListSend, itemType, chr.getHyperRockFields()));
                break;

        }
    }

    @Handler(op = InHeader.USER_FIELD_TRANSFER_REQUEST)
    public static void handleUserFieldTransferRequest(Char chr, InPacket inPacket) {
        Field field = chr.getField();
        if ((field.getFieldLimit() & FieldOption.TeleportItemLimit.getVal()) > 0
                || (field.getFieldLimit() & FieldOption.MigrateLimit.getVal()) > 0
                || (field.getFieldLimit() & FieldOption.PortalScrollLimit.getVal()) > 0
                || !field.isChannelField()) {
            chr.chatMessage("Bạn không thể dịch chuyển đến bản đồ này.");
            chr.dispose();
            return;
        }

        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }

        int fieldID = inPacket.decodeInt();
        if (fieldID == 7860) {
            Field ardentmill = chr.getOrCreateFieldByCurrentInstanceType(FieldConstants.ARDENTMILL);
            chr.warp(ardentmill);
        } else if (fieldID == 26015) {
            chr.warp(200000301);
        } else if (FieldData.getFieldById(fieldID) != null) {
            chr.warp(fieldID);
        }
    }

    @Handler(op = InHeader.ENTER_TOWN_PORTAL_REQUEST)
    public static void handleEnterTownPortalRequest(Char chr, InPacket inPacket) {
        int chrId = inPacket.decodeInt(); // Char id
        boolean town = inPacket.decodeByte() != 0;

        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }

        Field field = chr.getField();
        TownPortal townPortal = field.getTownPortalByChrId(chrId);
        if (townPortal != null) {       // TODO Using teleports, as grabbing the TownPortalPoint portal id is not working
            if (town) {
                // townField -> fieldField
                Field fieldField = townPortal.getChannel().getField(townPortal.getFieldFieldId());

                chr.warp(fieldField); // Back to the original Door
                chr.write(FieldPacket.teleport(townPortal.getFieldPosition(), chr)); // Teleports player to the position of the TownPortal
            } else {
                // fieldField -> townField
                Field returnField = townPortal.getChannel().getField(townPortal.getTownFieldId()); // Initialise the Town Map,

                chr.warp(returnField); // warp Char
                chr.write(FieldPacket.teleport(townPortal.getTownPosition(), chr));
                if (returnField.getTownPortalByChrId(chrId) == null) { // So that every re-enter into the TownField doesn't spawn another TownPortal
                    returnField.broadcast(WvsContext.townPortal(townPortal)); // create the TownPortal
                    returnField.addTownPortal(townPortal);
                }
            }
        } else {
            chr.dispose();
            System.out.println("Character {" + chrId + "} tried entering a Town Portal in field {" + field.getId() + "} which does not exist."); // Potential Hacking Log
        }
    }

    @Handler(op = InHeader.USER_TRANSFER_FREE_MARKET_REQUEST)
    public static void handleTransferFreeMarketRequest(Char chr, InPacket inPacket) {
        byte toChannelID = (byte) (inPacket.decodeByte() + 1);
        int fieldID = inPacket.decodeInt();

        if (chr.getHP() <= 0) {
            chr.dispose();
            return;
        }

        if (chr.getWorld().getChannelById(toChannelID) != null && GameConstants.isFreeMarketField(fieldID)
                && GameConstants.isFreeMarketField(chr.getField().getId())) {
            Field toField = chr.getClient().getChannelInstance().getField(fieldID);
            if (toField == null) {
                chr.dispose();
                return;
            }
            int currentChannelID = chr.getClient().getChannel();
            if (currentChannelID != toChannelID) {
                chr.changeChannelAndWarp(toChannelID, fieldID);
            } else {
                chr.warp(toField);
            }
        }

        inPacket.decodeInt(); // tick
    }

    @Handler(op = InHeader.GOLLUX_OUT_REQUEST)
    public static void handleGolluxOutReqeust(Char chr, InPacket inPacket) {
        chr.getScriptManager().exitBoss();
    }

    @Handler(op = InHeader.REQUEST_RELOGIN_COOKIE)
    public static void handleReloginCookieRequest(Char chr, InPacket inPacket) {
        int characterID = inPacket.decodeInt();
        //chr.write(WvsContext.issueReloginCookie("1", characterID, ""));
        Server.get().getSwitchChars().put(chr.getUser().getId(), new Tuple<>(0, chr.getClient().getChannel()));
        chr.write(WvsContext.returnToTitle());
    }

    @Handler(op = InHeader.SWITCH_CHARACTER)
    public static void handleSwitchCharacter(Char chr, InPacket inPacket) {
        int characterID = inPacket.decodeInt();
        //chr.write(WvsContext.issueReloginCookie("clgt", characterID, str));
        Server.get().getSwitchChars().put(chr.getUser().getId(), new Tuple<>(characterID, chr.getClient().getChannel()));
        chr.write(WvsContext.returnToTitle());
    }

    @Handler(op = InHeader.FPS_LOG)
    public static void handleFPSLog(Char chr, InPacket inPacket) {
        int n = inPacket.decodeInt();
        byte v16 = inPacket.decodeByte();
        int v15 = inPacket.decodeInt();
        int v19 = inPacket.decodeInt();
        int dwCPUCores = inPacket.decodeInt();
        int v21 = inPacket.decodeInt();
        int v10 = inPacket.decodeInt();
        int v8 = inPacket.decodeInt();
        int v9 = inPacket.decodeInt();
        int v7 = inPacket.decodeInt();
        short v12 = inPacket.decodeShort();
        short idk = inPacket.decodeShort();
        //System.out.printf("n: %d, v16: %d, v15: %d, v19: %d, dwCPUCores: %d, v21: %d, v10: %d, v8: %d, v9: %d, v7: %d, v12: %d, idk: %d",n,v16,v15,v19,dwCPUCores,v21,v10,v8,v9,v7,v12,idk));
    }

}
