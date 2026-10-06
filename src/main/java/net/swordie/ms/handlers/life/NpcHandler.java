package net.swordie.ms.handlers.life;


import net.swordie.ms.Server;
import net.swordie.ms.client.AccountQuest;
import net.swordie.ms.client.character.BroadcastMsg;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.achievement.AchievementHandler;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.quest.Quest;
import net.swordie.ms.client.trunk.TrunkOpen;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.constants.QuestConstants;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.enums.InvType;
import net.swordie.ms.enums.InventoryOperation;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.movement.Movement;
import net.swordie.ms.life.movement.MovementInfo;
import net.swordie.ms.life.npc.Npc;
import net.swordie.ms.loaders.*;
import net.swordie.ms.loaders.containerclasses.ItemInfo;
import net.swordie.ms.loaders.containerclasses.QuestInfo;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.gach.GachaponConstants;
import net.swordie.ms.world.gach.result.GachaponDlgType;
import net.swordie.ms.world.gach.result.GachaponResult;
import net.swordie.ms.world.shop.NpcShopDlg;
import net.swordie.ms.world.shop.NpcShopItem;
import net.swordie.ms.world.shop.ShopRequestType;
import net.swordie.ms.world.shop.result.BuyShopResult;
import net.swordie.ms.world.shop.result.MsgShopResult;
import net.swordie.ms.world.shop.result.SellShopResult;
import net.swordie.ms.world.shop.result.ShopResultType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class NpcHandler {

    @Handler(op = InHeader.USER_SELECT_NPC)
    public static void handleUserSelectNpc(Char chr, InPacket inPacket) {
        int npcID = inPacket.decodeInt();
        Position playerPos = inPacket.decodePosition();
        Life life = chr.getField().getLifeByObjectID(npcID);
        Npc npc = null;
        if (life instanceof Npc) {
            npc = (Npc) life;
        }
        if (npc == null) {
            Field originField = FieldData.getFieldById(chr.getFieldID());
            List<Integer> currentNPCs = new ArrayList<>();
            for (Npc currentNPC : chr.getField().getNpcs()) {
                currentNPCs.add(currentNPC.getTemplateId());
            }
            for (Npc originNPC : originField.getNpcs()) {
                if (!currentNPCs.contains(originNPC.getTemplateId())) {
                    npc = originNPC;
                    npc.setObjectId(npcID);
                    chr.getField().spawnLife(npc, chr);
                }
            }
            if (npc == null) {
                chr.chatMessage("Đã xảy ra lỗi không xác định.");
                return;
            }
        }
        int templateID = npc.getTemplateId();
        if (npc.getTrunkGet() > 0 || npc.getTrunkPut() > 0) {
            chr.write(FieldPacket.trunkDlg(new TrunkOpen(templateID, chr.getAccount().getTrunk())));
            return;
        }
        String script = npc.getScripts().get(0);
        ScriptManagerImpl sm = chr.getScriptManager();
        if (script == null) {
            NpcShopDlg nsd = NpcData.getShopById(templateID);
            if (nsd != null) {
                sm.stop(ScriptType.Npc); // reset contents before opening shop?
                nsd.setChar(chr);
                chr.setShop(nsd);
                chr.write(ShopDlg.openShop(0, nsd));
                return;
            } else if (npc.isShop()) {
                sm.openShop(templateID, GameConstants.GENERAL_SHOP);
                return;
            } else {
                script = String.valueOf(templateID);
            }
        }
        sm.startScript(chr, templateID, npcID, script, ScriptType.Npc);
    }

    @Handler(op = InHeader.USER_COMPLETE_NPC_SPEECH)
    public static void handleUserCompleteNpcSpeech(Char chr, InPacket inPacket) {
        int fieldID = inPacket.decodeInt();
        int questID = inPacket.decodeInt();
        int npcTemplateID = inPacket.decodeInt();
        int speech = inPacket.decodeByte();
        int objectID = inPacket.decodeInt();

        Life life = chr.getField().getLifeByObjectID(objectID);
        if (!(life instanceof Npc)) {
            chr.chatMessage("Đã xảy ra lỗi không xác định.");
            return;
        }
        if (chr.hasQuestInProgress(questID)) {
            QuestInfo qi = QuestData.getQuestInfoById(questID);
            int speechID = speech - 1;
            String scriptName = qi.getSpeech().getOrDefault(speechID, null);
            if (scriptName == null || scriptName.equalsIgnoreCase("")) {
                chr.chatMessage("Không thể tìm thấy nhiệm vụ " + questID + ", phát biểu " + speechID);
                return;
            }
            chr.getScriptManager().startScript(chr, questID, scriptName, ScriptType.Quest);
            if (speech < qi.getSpeech().size()) { // nếu không có điều kiện này thì nó sẽ thụt lại 1 speech
                chr.createQuestWithQRValue(questID, "NpcSpeech="+npcTemplateID+speech);
            }
        }
    }

    @Handler(op = InHeader.USER_SHOP_REQUEST)
    public static void handleUserShopRequest(Char chr, InPacket inPacket) {
        byte type = inPacket.decodeByte();
        ShopRequestType shr = ShopRequestType.getByVal(type);
        if (shr == null) {
            System.out.printf("Unhandled shop request type %d", type);
            return;
        }
        NpcShopDlg nsd = chr.getShop();
        if (nsd == null) {
            chr.chatMessage("Đã xảy ra lỗi không xác định.");
            return;
        }
        chr.write(ShopDlg.shopCrystal(false));
        switch (shr) {
            case BUY:
                int eventPoint = 0;
                short itemIndex = inPacket.decodeShort();
                int itemID = inPacket.decodeInt();
                short quantity = inPacket.decodeShort();
                NpcShopItem nsi = nsd.getItemByIndex(itemIndex);
                if (nsi == null || nsi.getItemID() != itemID) {
                    return;
                }
                if (quantity < 0) {
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, "User tried buying negative quantity from NPC shop");
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    chr.dispose();
                    return;
                }
                if (nsi.getMaxPerSlot() == 0 ? quantity != 1 : quantity > nsi.getMaxPerSlot()) {
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Possible hack: max slot for shop itemID %d is %d, got %d", nsi.getItemID(), nsi.getMaxPerSlot(), quantity));
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    chr.dispose();
                    return;
                }
                int itemQuantity = nsi.getQuantity() > 0 ? nsi.getQuantity() : 1;
                if (!chr.canHold(itemID, itemQuantity)) {
                    chr.chatPopup("Bạn không đủ ô chứa để mua vật phẩm này.");
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    return;
                }
                ItemInfo ii = ItemData.getItemInfoByID(itemID);
                if (ii != null && ii.isCash() && chr.getCashInventory().isFull()) {
                    chr.chatPopup("Bạn không đủ ô chứa để mua vật phẩm này.");
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    return;
                }
                int buyLimit = nsi.getBuyLimit();
                if (buyLimit > 0) {
                    int amountBought = chr.getItemBoughtAmounts().getOrDefault(nsi.getId(), 0);
                    int amountLeft = buyLimit - amountBought;
                    if (quantity > amountLeft) {
                        chr.write(ShopDlg.shopResult(new MsgShopResult(ShopResultType.CanOnlyPurchaseXMoreMsgInt)));
                        return;
                    }
                }
                if (nsi.getTokenItemID() != 0) {
                    if (ItemConstants.isEquip(itemID) && quantity > 1) {
                        chr.chatPopup("Đã xảy ra lỗi không xác định.");
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        chr.dispose();
                        return;
                    }
                    int cost = nsi.getTokenPrice() * quantity;
                    if (chr.hasItemCount(nsi.getTokenItemID(), cost)) {
                        if (nsi.getTokenItemID() == 4310229) {
                            chr.getScriptManager().addUnionCoin(-cost);
                        }
                        chr.consumeItem(nsi.getTokenItemID(), cost);
                    } else {
                        chr.chatPopup("Bạn không có đủ meso để mua vật phẩm này.");
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        return;
                    }
                } else if (nsi.getPointPrice() != 0) {
                    int pointQuestID = nsi.getPointQuestID();
                    int price = nsi.getPointPrice() * quantity;
                    ScriptManagerImpl sm = chr.getScriptManager();
                    if (chr.hasQuest(pointQuestID)) {
                        int point = Integer.parseInt(chr.getQRValue(pointQuestID).substring(6));
                        if (pointQuestID == QuestConstants.DONATION_POINT) {
                            point = chr.getUser().getDonationPoints();
                        } else if (pointQuestID == QuestConstants.VOTE_POINT) {
                            point = chr.getUser().getVotePoints();
                        } else if (pointQuestID == QuestConstants.UNION_COIN) {
                            point = chr.getUnion().getUnionCoin();
                        }
                        if (point < price) {
                            chr.chatPopup("Bạn không có đủ điểm để mua vật phẩm này.");
                            chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                            return;
                        }
                        sm.decPoint(nsi.getPointQuestID(), price);
                    } else {
                        chr.chatPopup("Bạn không có đủ điểm để mua vật phẩm này.");
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        return;
                    }
                } else {
                    long price = (long) nsi.getPrice() * quantity;
                    long cost = nsi.getDiscountPerc() != 0 ? (long) (price - (price * ((nsi.getDiscountPerc() / (double) 100)))) : price;
                    if (chr.getMoney() < cost) {
                        chr.chatPopup("Bạn không có đủ meso để mua vật phẩm này.");
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        return;
                    }
                    chr.deductMoney(cost);
                    AchievementHandler.handleSpendingMesos(chr, cost);
                }
                if (buyLimit > 0) {
                    int amountBought = chr.getItemBoughtAmounts().getOrDefault(nsi.getId(), 0);
                    amountBought += quantity;
                    chr.addItemBoughtAmount(nsi.getId(), amountBought);
                    chr.updateItemBoughtAmountsToSQL(nsi.getId(), amountBought);
                }
                LocalDateTime localDateTime = null;
                if (nsi.getItemPeriod() > 0) {
                    localDateTime = LocalDateTime.now().plusMinutes(nsi.getItemPeriod());
                }
                if (itemID == 1202236) { // Totem
                    localDateTime = LocalDateTime.now().plusHours(24);
                }
                if (itemID == 5211121 || itemID == 5360056) { // x2 for 2 hours
                    localDateTime = LocalDateTime.now().plusHours(2);
                } else if (ii != null && ii.isCash()) {
                    localDateTime = LocalDateTime.now().plusDays(30);
                }
                Item item = ItemData.getItemDeepCopy(itemID);
                item.setQuantity(quantity * itemQuantity);
                if (localDateTime != null) {
                    item.setDateExpire(FileTime.fromDate(localDateTime));
                }
                chr.addItemToInventory(item);
                if (!chr.getRepurchaseItems().isEmpty()) {
                    int x = 0, index = -1;
                    for (NpcShopItem i : chr.getRepurchaseItems()) {
                        if (i.getItemID() == itemID) {
                            index = x;
                            break;
                        }
                        x++;
                    }
                    if (index >= 0) {
                        chr.getRepurchaseItems().remove(index);
                        chr.write(ShopDlg.shopResult(new BuyShopResult(index)));
                        return;
                    }
                }
                String msg = "";
                if (eventPoint >= 1) {
                    chr.getScriptManager().addEventPoint(eventPoint);
                    msg = String.format("Mua thành công\r\n%s x %d. Bạn nhận được %d điểm sự kiện.", StringData.getItemStringById(itemID), quantity * itemQuantity, eventPoint);
                } else {
                    msg = String.format("Mua thành công\r\n%s x %d.", StringData.getItemStringById(itemID), quantity);
                }
                chr.chatPopup(msg);
                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                AchievementHandler.handleBuyingEquipFromShop(chr, itemID, nsi.getShopID());
                break;
            case RECHARGE:
                short slot = inPacket.decodeShort();
                item = chr.getConsumeInventory().getItemBySlot(slot);
                if (item == null || !ItemConstants.isRechargable(item.getItemId())) {
                    chr.chatMessage(String.format("Không tìm thấy vật phẩm có thể sạc lại ở vị trí %d.", slot));
                    return;
                }
                ii = ItemData.getItemInfoByID(item.getItemId());
                if (ii != null && item.getQuantity() >= ii.getSlotMax()) {
                    chr.dispose();
                    return;
                }
                long cost = ii.getSlotMax() - item.getQuantity();
                if (chr.getMoney() < cost) {
                    chr.chatPopup("Bạn không có đủ meso để mua vật phẩm này.");
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    return;
                }
                chr.deductMoney(cost);
                item.setQuantity(ii.getSlotMax());
                chr.write(WvsContext.inventoryOperation(true, false, InventoryOperation.UpdateQuantity, slot, (short) 0, 0, item));
                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                break;
            case SELL:
                slot = inPacket.decodeShort();
                itemID = inPacket.decodeInt();
                quantity = inPacket.decodeShort();
                InvType it = ItemConstants.getInvTypeByItemID(itemID);
                if (it == null) {
                    chr.chatPopup("Đã xảy ra lỗi không xác định.");
                    chr.dispose();
                    return;
                }
                item = chr.getInventoryByType(it).getItemBySlot(slot);
                ii = ItemData.getItemInfoByID(itemID);
                if (item == null || item.getItemId() != itemID || item.getQuantity() < quantity) {
                    chr.chatPopup("Đã xảy ra lỗi không xác định.");
                    chr.dispose();
                    return;
                }
                if (quantity < 0) {
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("[Cảnh báo] Người chơi %s đã thử bán vật phẩm %s (%d) số lượng âm cho cửa hàng.",
                            chr.getName(), StringData.getItemStringById(itemID), itemID));
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    chr.dispose();
                    return;
                }
                if (!chr.hasItemCount(itemID, quantity) || (quantity == 0 && !ItemConstants.isRechargable(itemID))) {
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("[Cảnh báo] Người chơi %s đã bán vật phẩm %s (%d) với số lượng %d mà không có trong túi.",
                            chr.getName(), StringData.getItemStringById(itemID), itemID, quantity));
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    chr.dispose();
                    return;
                }
                if (ItemConstants.isEquip(itemID) || GameConstants.isIntensePowerCrystal(itemID)) {
                    cost = item.getPrice();
                } else {
                    if (ii != null) {
                        cost = (long) ii.getPrice() * quantity;
                    } else {
                        cost = 0;
                    }
                }
                if (GameConstants.isIntensePowerCrystal(itemID)) {
                    int maxAll = QuestConstants.CRYSTAL_MAX_ALL;
                    int maxWeekly = QuestConstants.CRYSTAL_MAX_WEEKLY;
                    String time = FileTime.currentTime().toYYYYMMDD();
                    if (chr.hasQuest(QuestConstants.CRYSTAL_ALL)) {
                        int count = Integer.parseInt(chr.getQRValueByKey(QuestConstants.CRYSTAL_ALL, "count"));
                        String lastTimeAll = chr.getQRValueByKey(QuestConstants.CRYSTAL_ALL, "time");
                        if (FileTime.isNewMonth(lastTimeAll)) { // reset tháng
                            count = maxAll;
                            chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "time", time);
                        } else if (count <= 0 && !FileTime.isNewMonth(lastTimeAll)) {
                            chr.chatPopup(String.format("Bạn đã bán đủ lượt hàng tháng của %s.", StringData.getItemStringById(itemID)));
                            chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                            return;
                        }
                        if (itemID == 4001928) { // Weekly
                            int w = Integer.parseInt(chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "max"));
                            String lastTimeWeekly = chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "time");
                            if (FileTime.isNewWeek(lastTimeWeekly)) { // reset tuần
                                w = maxWeekly;
                                chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "time", time);
                                chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "max", String.valueOf(w));
                                chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "data", "");
                            } else if (w <= 0 && !FileTime.isNewWeek(lastTimeWeekly)) {
                                chr.chatPopup(String.format("Bạn đã bán đủ lượt hàng tuần của %s.", StringData.getItemStringById(itemID)));
                                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                                return;
                            }
                            w--;
                            chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "max", String.valueOf(w));
                            String data = chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "data");
                            int bossID = item.getBossRewardID();
                            String newData = chr.getQRValueByKey(data, cost, bossID);
                            chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "data", newData);
                        }
                        chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "count", String.valueOf(count - 1));
                        chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "time", time);
                    } else {
                        int initCount = itemID != 4001928 ? maxAll - 1 : maxAll;
                        int initWeekly = itemID == 4001928 ? maxWeekly - 1 : maxWeekly;
                        int bossID = item.getBossRewardID();
                        chr.createQuestWithQRValue(QuestConstants.CRYSTAL_ALL, "count="+initCount+";time="+time+";max="+maxAll+";type=2");
                        chr.createQuestWithQRValue(QuestConstants.CRYSTAL_WEEKLY, "time="+time+";data="+cost+"="+bossID+";max="+initWeekly);
                    }
                }
                if (!chr.canAddMoney(cost)) {
                    chr.chatPopup("Lượng Meso trong túi của bạn đã đạt đến giới hạn tối đa..");
                    chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                    chr.dispose();
                    break;
                }
                if (item.isTradable() && cost > 0 && item.getItemId() != ItemConstants.CURRENCY) {
                    cost = (long) (cost * 1.3D);
                    if (chr.getRepurchaseItems().size() == 10) {
                        chr.getRepurchaseItems().removeFirst();
                    }
                    Item clone = ItemData.getItemDeepCopy(itemID);

                    if (ItemConstants.isEquip(itemID)) {
                        nsi = new NpcShopItem(itemID, (int) cost, quantity, cost, (short) 1, clone);
                    } else {
                        if (ii != null) {
                            nsi = new NpcShopItem(itemID, (int) cost, quantity, ii.getUnitPrice(), (short) ii.getSlotMax(), clone);
                        } else {
                            nsi = new NpcShopItem(itemID, (int) cost, quantity, cost, quantity, clone);
                        }
                    }
                    chr.getRepurchaseItems().add(nsi);
                }
                if (ItemConstants.isThrowingItem(itemID)) {
                    chr.consumeAllThrowingItem(item);
                } else {
                    chr.consumeItem(itemID, quantity);
                }
                if (item.getItemId() == ItemConstants.CURRENCY) {
                    int gain = quantity * 10000;
                    chr.getScriptManager().addPoint(QuestConstants.DONATION_POINT, gain);
                    chr.getUser().addDonationPoint(gain);
                    chr.chatPopup(String.format("Bạn nhận được %d đồng vàng từ việc bán Lá Phong Vàng x %d", gain, quantity));
                    DataPrinter.send("log-lpv", String.format("Người chơi %s đã bán %d lá phong vàng nhận được %d xu vàng.", chr.getName(), quantity, gain));
                } else {
                    chr.addMoney(cost);
                }
                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                break;
            case SELL_ALL:
                int size = inPacket.decodeInt();
                for (int i = 0; i < size; i++) {
                    slot = inPacket.decodeShort();
                    itemID = inPacket.decodeInt();
                    quantity = inPacket.decodeShort();
                    it = ItemConstants.getInvTypeByItemID(itemID);
                    assert it != null;
                    item = chr.getInventoryByType(it).getItemBySlot(slot);
                    ii = ItemData.getItemInfoByID(itemID);
                    if (item == null || item.getItemId() != itemID) {
                        chr.chatMessage("Đã xảy ra lỗi không xác định.");
                        return;
                    }
                    if (!chr.hasItemCount(itemID, quantity)) {
                        DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("[Cảnh báo] Người chơi %s đã bán vật phẩm %s (%d) với số lượng %d mà không có trong túi.",
                                chr.getName(), StringData.getItemStringById(itemID), itemID, quantity));
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        chr.dispose();
                        return;
                    }
                    cost = item.getPrice();
                    int maxAll = QuestConstants.CRYSTAL_MAX_ALL;
                    int maxWeekly = QuestConstants.CRYSTAL_MAX_WEEKLY;
                    String time = FileTime.currentTime().toYYYYMMDD();
                    if (chr.hasQuest(QuestConstants.CRYSTAL_ALL)) {
                        int count = Integer.parseInt(chr.getQRValueByKey(QuestConstants.CRYSTAL_ALL, "count"));
                        String lastTimeAll = chr.getQRValueByKey(QuestConstants.CRYSTAL_ALL, "time");
                        if (FileTime.isNewMonth(lastTimeAll)) { // reset tháng
                            count = maxAll;
                            chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "time", time);
                        } else if (count <= 0 && !FileTime.isNewMonth(lastTimeAll)) {
                            chr.chatPopup(String.format("Bạn đã bán đủ lượt hàng tháng của %s.", StringData.getItemStringById(itemID)));
                            chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                            return;
                        }
                        if (itemID == 4001928) { // Weekly
                            int w = Integer.parseInt(chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "max"));
                            String lastTimeWeekly = chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "time");
                            if (FileTime.isNewWeek(lastTimeWeekly)) { // reset tuần
                                w = maxWeekly;
                                chr.createQuestWithQRValue(QuestConstants.CRYSTAL_WEEKLY, "");
                            } else if (w <= 0 && !FileTime.isNewWeek(lastTimeWeekly)) {
                                chr.chatPopup(String.format("Bạn đã bán đủ lượt hàng tuần của %s.", StringData.getItemStringById(itemID)));
                                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                                return;
                            }
                            w--;
                            String data = chr.getQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "data");
                            int bossID = item.getBossRewardID();
                            String newData = chr.getQRValueByKey(data, cost, bossID);
                            //chr.setQRValueByKey(QuestConstants.CRYSTAL_WEEKLY, "data", newData);
                            chr.createQuestWithQRValue(QuestConstants.CRYSTAL_WEEKLY, "time="+time+";data="+newData+";max="+w);
                        }
                        chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "count", String.valueOf(count - 1));
                        chr.setQRValueByKey(QuestConstants.CRYSTAL_ALL, "time", time);
                    } else {
                        int initCount = itemID != 4001928 ? maxAll - 1 : maxAll;
                        int initWeekly = itemID == 4001928 ? maxWeekly - 1 : maxWeekly;
                        int bossID = item.getBossRewardID();
                        chr.createQuestWithQRValue(QuestConstants.CRYSTAL_ALL, "count="+initCount+";time="+time+";max="+maxAll+";type=2");
                        chr.createQuestWithQRValue(QuestConstants.CRYSTAL_WEEKLY, "time="+time+";data="+cost+"="+bossID+";max="+initWeekly);
                    }
                    if (!chr.canAddMoney(cost)) {
                        chr.chatPopup("Lượng Meso trong túi của bạn đã đạt đến giới hạn tối đa..");
                        chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                        chr.dispose();
                        break;
                    }
                    chr.consumeItem(itemID, quantity);
                    chr.addMoney(cost);
                }
                chr.write(ShopDlg.shopResult(new SellShopResult(nsd)));
                break;
            case CLOSE:
                nsd.setChar(null);
                chr.setShop(null);
                break;
            default:
                System.out.printf("Unhandled shop request type %s%n", shr);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.GACHAPON_REQUEST)
    public static void handleGachaponRequest(Char chr, InPacket inPacket) {
        final int type = inPacket.decodeByte();
        final GachaponResult result = GachaponResult.getByVal(type);
        if (result == null) {
            System.out.println("[Gachapon] Found unknown gachapon result " + type);
            chr.write(GachaponDlg.gachResult(GachaponResult.ERROR));
            return;
        }
        switch (result) {
            case SUCCESS:
                final int ticketID = inPacket.decodeInt();
                GachaponDlgType dialog = GachaponConstants.getDlgByTicket(ticketID);
                if (dialog == null || !chr.hasItem(ticketID)) {
                    chr.write(GachaponDlg.gachResult(GachaponResult.ERROR));
                    return;
                }
                final int reward = Objects.requireNonNull(GachaponConstants.getRandomItem(dialog)).getItemID();
                final boolean isHotItem = Objects.requireNonNull(GachaponConstants.getRandomItem(dialog)).isHotTime();
                if (reward == -1) {
                    chr.chatMessage("Xin chào, tôi không có thông tin nào cho gachapon này!");
                    chr.write(GachaponDlg.gachResult(GachaponResult.ERROR));
                    return;
                }
                if (!chr.canHold(reward)) {
                    chr.chatMessage("Bạn không đủ ô chứa để nhận phần thưởng của Gachapon!");
                    chr.write(GachaponDlg.gachResult(GachaponResult.ERROR));
                    return;
                }
                Equip equip = ItemData.getEquipDeepCopyFromID(reward, true);
                if (equip == null) {
                    Item item = ItemData.getItemDeepCopy(reward, true);
                    if (item == null) {
                        chr.write(GachaponDlg.gachResult(GachaponResult.ERROR));
                        return;
                    }
                    item.setQuantity(1);
                    chr.addItemToInventory(item);
                    chr.write(GachaponDlg.gachResult(GachaponResult.SUCCESS, item, (short) 1));
                    chr.getGachaponManager().addItem(dialog, item, (short) 1);
                } else {
                    chr.addItemToInventory(equip);
                    chr.write(GachaponDlg.gachResult(GachaponResult.SUCCESS, equip, (short) 1));
                    chr.getGachaponManager().addItem(dialog, equip, (short) 1);
                }
                if (isHotItem) {
                    Item item = ItemData.getItemDeepCopy(reward);
                    Server.get().broadcastForWorld(WvsContext.broadcastMsg(BroadcastMsg.RewardMessage(chr.getName(), StringData.getItemStringById(ticketID), item)));
                }
                chr.consumeItem(ticketID, 1);
                chr.getField().broadcast(UserPacket.setGachaponEffect(chr));
                DataPrinter.send(DataPrinter.ALL_IN_ONE, String.format("Người chơi %s nhận được %s từ %s", chr.getName(), StringData.getItemStringById(reward), StringData.getItemStringById(ticketID)));
                break;
            case REMOTE:
                chr.write(chr.getGachaponManager().encode(GachaponDlgType.REMOTE));
                break;
            case EXIT:
                chr.write(GachaponDlg.gachResult(GachaponResult.EXIT));
                break;
        }
    }

    @Handler(op = InHeader.NPC_MOVE)
    public static void handleNpcMove(Char chr, InPacket inPacket) {
        int objectID = inPacket.decodeInt();
        byte oneTimeAction = inPacket.decodeByte();
        byte chatIdx = inPacket.decodeByte();
        int duration = inPacket.decodeInt();
        Life life = chr.getField().getLifeByObjectID(objectID);
        if (life instanceof Npc && ((Npc) life).isMove()) {
            Npc npc = (Npc) chr.getField().getLifeByObjectID(objectID);
            boolean move = npc.isMove();
            MovementInfo movementInfo = new MovementInfo(npc.getPosition(), npc.getVPosition());
            byte keyPadState = 0;
            if (move && inPacket.getUnreadAmount() > 0) {
                movementInfo.decode(inPacket);
                for (Movement m : movementInfo.getMovements()) {
                    Position pos = m.getPosition();
                    Position vPos = m.getVPosition();
                    if (pos != null) {
                        npc.setPosition(pos);
                    }
                    if (vPos != null) {
                        npc.setvPosition(vPos);
                    }
                    npc.setMoveAction(m.getMoveAction());
                    npc.setFh(m.getFh());
                }
                if (inPacket.getUnreadAmount() > 0) {
                    keyPadState = inPacket.decodeByte(); // not always encoded?
                }
            }
            chr.getField().broadcast(NpcPool.npcMove(objectID, oneTimeAction, chatIdx, duration, move,
                    movementInfo, keyPadState));
        }
    }

    @Handler(op = InHeader.NPC_SPECIAL_ACTION)
    public static void handleNpcSpecialAction(Char chr, InPacket inPacket) {
        int objectID = inPacket.decodeInt();
        String action = inPacket.decodeString();
        Life life = chr.getField().getLifeByObjectID(objectID);
        if (life == null) {
            return;
        }
        if (life instanceof Npc) {
            chr.getField().broadcast(NpcPool.npcSetSpecialAction(objectID, action, 0));
        }
    }
}
