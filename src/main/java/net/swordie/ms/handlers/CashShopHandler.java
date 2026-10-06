package net.swordie.ms.handlers;


import net.swordie.ms.client.Account;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.User;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.items.*;
import net.swordie.ms.client.trunk.Trunk;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.CCashShop;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.enums.CashErrorType;
import net.swordie.ms.enums.CashItemType;
import net.swordie.ms.enums.InvType;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.CashShopData;
import net.swordie.ms.loaders.Etc.Commodity.CommodityInfo;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.shop.cashshop.CashItemInfo;
import net.swordie.ms.world.shop.cashshop.CashShopItem;

import java.util.ArrayList;
import java.util.List;

/**
 * Created on 4/23/2018.
 */
public class CashShopHandler {

    @Handler(op = InHeader.CASH_SHOP_QUERY_CASH_REQUEST)
    public static void handleCashShopQueryCashRequest(Client c, InPacket inPacket) {
        disposeForCS(c.getChr());
    }

    @Handler(op = InHeader.CASH_SHOP_CASH_ITEM_REQUEST)
    public static void handleCashShopCashItemRequest(Client c, InPacket inPacket) {
        Char chr = c.getChr();
        User user = chr.getUser();
        Account account = chr.getAccount();
        Trunk trunk = account.getTrunk();
        byte type = inPacket.decodeByte();
        CashItemType cit = CashItemType.getRequestTypeByVal(type);
        if (cit == null) {
            System.out.println("Unhandled cash shop cash item request " + type);
            c.write(CCashShop.error());
            return;
        }
        switch (cit) {
            case Req_Buy: {
                inPacket.decodeByte();
                byte paymentMethod = inPacket.decodeByte();
                inPacket.decodeArr(5);
                int id = inPacket.decodeInt();
                int quantity = inPacket.decodeInt();
                CommodityInfo ci = CashShopData.getCommodityBySN(id);
                if (ci == null || ci.getOnSale() == 0 || ci.getTerm() != 0) {
                    c.write(CCashShop.error());
                    disposeForCS(chr);
                    return;
                }
                if (quantity == 0) {
                    disposeForCS(chr);
                    return;
                }
                CashShopItem csi = new CashShopItem(ci);
                if (csi.getItemID() == 5190005) {
                    c.write(CCashShop.error());
                    disposeForCS(chr);
                    return;
                }
                if (!ItemConstants.isEquip(csi.getItemID())) {
                    csi.setBundleQuantity(csi.getBundleQuantity() * quantity);
                }
                int cost = csi.getNewPrice() * quantity;
                if (trunk.getLocker().size() + quantity > GameConstants.MAX_LOCKER_SIZE) {
                    c.write(CCashShop.failed(CashItemType.Res_Buy_Failed, CashErrorType.TooManyCashItems));
                    disposeForCS(chr);
                    return;
                }
                boolean notEnoughMoney = false;
                switch (paymentMethod) {
                    case 1: // Prepaid
                        if (user.getNxPrepaid() >= cost) {
                            user.deductNXPrepaid(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 2: // Maple points
                        if (user.getMaplePoints() >= cost) {
                            user.deductMaplePoints(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 3: // Reward Points
                        if (account.getRewardPoint() >= cost) {
                            account.deductRewardPoint(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                }
                if (notEnoughMoney) {
                    c.write(CCashShop.failed(CashItemType.Res_Buy_Failed, CashErrorType.NotEnoughCash));
                    disposeForCS(chr);
                    return;
                }
                var ii = ItemData.getItemInfoByID(csi.getItemID());
                if ((ii != null && ii.getSlotMax() == 1) || ItemConstants.isEquip(csi.getItemID()) || ItemConstants.isPet(csi.getItemID())) {
                    for (int i = 0; i < quantity; i++) {
                        CashItemInfo cashItemInfo = csi.toCashItemInfo(account, chr);
                        cashItemInfo.updateCashItemInfoToSQL();
                        account.getTrunk().addCashItem(cashItemInfo);
                        var item = cashItemInfo.getItem();
                        item.setTrunkID(account.getTrunk().getId());
                        item.saveToSQL();
                        c.write(CCashShop.cashItemResBuyDone(cashItemInfo, null, null));
                    }
                } else {
                    CashItemInfo cashItemInfo = csi.toCashItemInfo(account, chr);
                    cashItemInfo.updateCashItemInfoToSQL();
                    account.getTrunk().addCashItem(cashItemInfo);
                    var item = cashItemInfo.getItem();
                    item.setQuantity(quantity * ci.getCount());
                    item.setTrunkID(account.getTrunk().getId());
                    item.saveToSQL();
                    c.write(CCashShop.cashItemResBuyDone(cashItemInfo, null, null));
                }
                c.write(CCashShop.cashItemResPurchaseRecordDone());

                int freeRP = (int) (cost * 5.0 / 100.0);
                // When purchasing qualifying NX items, 5% of the purchase price will be awarded back in Reward Points
                account.addRewardPoint(freeRP);
                c.write(CCashShop.chargeMileageNotice(freeRP));

                disposeForCS(chr);
                break;
            }
            case Req_MoveLtoS: {
                //Di chuyển từ Trunk tới Inventory
                long itemSn = inPacket.decodeLong(); //primary Key
                int itemID = inPacket.decodeInt();
                int invType = inPacket.decodeByte();
                CashItemInfo cii = trunk.getLockerItemBySn(itemSn);
                if (cii == null) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveLtoS_Failed, CashErrorType.ItemChanged_PleaseRefresh));
                    disposeForCS(chr);
                    return;
                }
                Item item = cii.getItem();
                if (item.getItemId() != itemID) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveLtoS_Failed, CashErrorType.ItemChanged_PleaseRefresh));
                    disposeForCS(chr);
                    return;
                }
                Inventory inventory = chr.getInventoryByType(InvType.getInvTypeByVal(invType));
                if (!inventory.canPickUp(item)) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveLtoS_Failed, CashErrorType.PleaseCheckYourInventoryFullOrNot));
                    disposeForCS(chr);
                    return;
                }

                if (ItemConstants.isEquip(item.getItemId())) {
                    Equip equip = (Equip) item;
                    if (!equip.hasAttribute(EquipAttribute.NoNonCombatStatGain)) {
                        equip.setCharmEXP(60);
                    }
                }
                trunk.getLocker().removeIf(x -> x.getId() == cii.getId());
                cii.setItem(null);
                cii.deleteCashItemInfoFromSQL();

                item.setCash(true);
                item.setTrunkID(0);
                chr.addItemToInventory(item);
                item.saveToSQL();

                c.write(CCashShop.resMoveLtoSDone(item));
                disposeForCS(chr);
                break;
            }
            case Req_MoveStoL: {
                long itemSN = inPacket.decodeLong();
                int itemID = inPacket.decodeInt();
                byte invType = inPacket.decodeByte();
                int pos = inPacket.decodeShort();
                Inventory inv = chr.getInventoryByType(InvType.getInvTypeByVal(invType));
                Item item = inv == null ? null : inv.getItemBySlot(pos);
                if (item == null || item.getItemId() != itemID || item.getId() != itemSN) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveStoL_Failed, CashErrorType.ItemChanged_PleaseRefresh));
                    disposeForCS(chr);
                    return;
                }
                if (trunk.getLocker().size() + 1 > GameConstants.MAX_LOCKER_SIZE) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveStoL_Failed, CashErrorType.TooManyCashItems));
                    disposeForCS(chr);
                    return;
                }
                if (item instanceof PetItem petItem) {
                    if (petItem.getActiveState() != 0) {
                        c.write(CCashShop.failed(CashItemType.Res_MoveStoL_Failed, CashErrorType.ThatItemCannotBeMoved));
                        disposeForCS(chr);
                        return;
                    }
                }
                item.setInventoryID(0);
                item.setCharID(chr.getId());
                item.setTrunkID(trunk.getId());
                item.saveToSQL();
                CashItemInfo cii = CashItemInfo.fromItem(chr, item);
                if (cii == null) {
                    c.write(CCashShop.failed(CashItemType.Res_MoveStoL_Failed, CashErrorType.ThatItemCannotBeMoved));
                    disposeForCS(chr);
                    return;
                }

                c.write(CCashShop.resMoveStoLDone(cii));
                inv.removeItem(item);
                cii.updateCashItemInfoToSQL();
                trunk.addCashItem(cii);
                disposeForCS(chr);
                break;
            }
            case Req_IncSlotCount: {
                inPacket.decodeByte();
                int paymentMethod = inPacket.decodeInt();
                int itemSN = inPacket.decodeInt();
                CommodityInfo ci = CashShopData.getCommodityBySN(itemSN);
                if (ci == null || ci.getOnSale() == 0 || ci.getTerm() != 0) {
                    c.write(CCashShop.error());
                    disposeForCS(chr);
                    return;
                }
                CashShopItem csi = new CashShopItem(ci);
                int cost = csi.getNewPrice();
                InvType slotType = InvType.getInvTypeByVal((ci.getItemId() - 9110000) / 1000);
                int slotCount = ci.getItemId() == 9111004 || ci.getItemId() == 9112004 || ci.getItemId() == 9113004 || ci.getItemId() == 9114004 ? 4 : 8;
                Inventory inv = chr.getInventoryByType(slotType);
                if (inv.getSlots() >= GameConstants.MAX_INVENTORY_SLOTS) {
                    c.write(CCashShop.failed(CashItemType.Res_IncSlotCount_Failed, CashErrorType.ReachedMaximumSlots));
                    disposeForCS(chr);
                    return;
                }
                boolean notEnoughMoney = false;
                switch (paymentMethod) {
                    case 1: // Prepaid
                        if (user.getNxPrepaid() >= cost) {
                            user.deductNXPrepaid(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 2: // Maple points
                        if (user.getMaplePoints() >= cost) {
                            user.deductMaplePoints(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 3: // Reward Points
                        if (account.getRewardPoint() >= cost) {
                            account.deductRewardPoint(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                }
                if (notEnoughMoney) {
                    c.write(CCashShop.failed(CashItemType.Res_IncSlotCount_Failed, CashErrorType.NotEnoughCash));
                    disposeForCS(chr);
                    return;
                }
                inv.addSlots((byte) slotCount);
                inv.updateSlotsToSQL();
                c.write(CCashShop.cashItemResIncSlotDone(slotType.getVal(), inv.getSlots()));
                c.write(CCashShop.cashItemResPurchaseRecordDone());
                c.write(WvsContext.expandInventory(slotType.getVal(), (byte) inv.getSlots()));
                disposeForCS(chr);
                break;
            }
            case Req_EnableEquipSlotExt: {
                c.write(CCashShop.error());
                disposeForCS(chr);
                break;
            }
            case Req_IncCharSlotCount: {
                inPacket.decodeByte();
                int paymentMethod = inPacket.decodeInt();
                int id = inPacket.decodeInt();
                CommodityInfo ci = CashShopData.getCommodityBySN(id);
                if (ci == null || ci.getOnSale() == 0 || ci.getTerm() != 0) {
                    c.write(CCashShop.error());
                    disposeForCS(chr);
                    return;
                }
                CashShopItem csi = new CashShopItem(ci);
                int cost = csi.getNewPrice();
                if (user.getCharacterSlots() == GameConstants.MAX_CHARACTER_SLOTS) {
                    c.write(CCashShop.failed(CashItemType.Res_IncBuyCharCount_Failed, CashErrorType.ReachedMaximumSlots));
                    disposeForCS(chr);
                    return;
                }
                boolean notEnoughMoney = false;
                switch (paymentMethod) {
                    case 1: // Prepaid
                        if (user.getNxPrepaid() >= cost) {
                            user.deductNXPrepaid(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 2: // Maple points
                        if (user.getMaplePoints() >= cost) {
                            user.deductMaplePoints(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 3: // Reward Points
                        if (account.getRewardPoint() >= cost) {
                            account.deductRewardPoint(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                }
                if (notEnoughMoney) {
                    c.write(CCashShop.failed(CashItemType.Res_IncBuyCharCount_Failed, CashErrorType.NotEnoughCash));
                    disposeForCS(chr);
                    return;
                }
                user.addCharacterSlots(1);
                user.updateUserCharacterSlotToSQL();
                c.write(CCashShop.cashItemResIncBuyCharCountDone((short) c.getUser().getCharacterSlots()));
                c.write(CCashShop.cashItemResPurchaseRecordDone());
                disposeForCS(chr);
                break;
            }
            case Req_IncTrunkCount: {
                inPacket.decodeByte();
                int paymentMethod = inPacket.decodeInt();
                int itemSN = inPacket.decodeInt();
                CommodityInfo ci = CashShopData.getCommodityBySN(itemSN);
                if (ci == null || ci.getOnSale() == 0 || ci.getTerm() != 0) {
                    c.write(CCashShop.error());
                    disposeForCS(chr);
                    return;
                }
                if (trunk.getSlotCount() == GameConstants.MAX_LOCKER_SIZE) {
                    c.write(CCashShop.failed(CashItemType.Res_IncTrunkCount_Failed, CashErrorType.ReachedMaximumSlots));
                    disposeForCS(chr);
                    return;
                }
                CashShopItem csi = new CashShopItem(ci);
                int cost = csi.getNewPrice();
                boolean notEnoughMoney = false;
                switch (paymentMethod) {
                    case 1: // Prepaid
                        if (user.getNxPrepaid() >= cost) {
                            user.deductNXPrepaid(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 2: // Maple points
                        if (user.getMaplePoints() >= cost) {
                            user.deductMaplePoints(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                    case 3: // Reward Points
                        if (account.getRewardPoint() >= cost) {
                            account.deductRewardPoint(cost);
                        } else {
                            notEnoughMoney = true;
                        }
                        break;
                }
                if (notEnoughMoney) {
                    c.write(CCashShop.failed(CashItemType.Res_IncTrunkCount_Failed, CashErrorType.NotEnoughCash));
                    disposeForCS(chr);
                    return;
                }
                trunk.addSlots((byte) (ci.getItemId() == 9110000 ? 8 : 4));
                trunk.updateTrunkSlotToSQL();
                c.write(CCashShop.cashItemResIncTrunkCountDone((short) trunk.getSlotCount()));
                c.write(CCashShop.cashItemResPurchaseRecordDone());
                disposeForCS(chr);
                break;
            }
            case Req_ShowCashItems:
                disposeForCS(chr);
                break;
            case Req_Destroy:
                inPacket.decodeInt();
                inPacket.decodeByte();
                int picSize = inPacket.decodeShort();
                String pic = inPacket.decodeString(picSize); // Pic is bypassed
                long itemSN = inPacket.decodeLong();
                CashItemInfo removedItem = trunk.getLockerItemBySn(itemSN);
                if (removedItem != null) {
                    trunk.getLocker().removeIf(x -> x.getId() == removedItem.getId());
                    c.write(CCashShop.resDestroyDone(itemSN));
                    removedItem.deleteCashItemInfoFromSQL();
                }
                disposeForCS(chr);
                break;
            case Req_PurchaseRecord:
                int val = inPacket.decodeInt();
                c.write(CCashShop.cashItemResPurchaseRecordDone(val, val != 0 ? 0 : 1));
                break;
            default: {
                c.write(CCashShop.error());
                disposeForCS(chr);
                System.out.println("Unhandled cash shop cash item request " + cit);
                break;
            }
        }
    }

    @Handler(op = InHeader.SURPRISE_BOX)
    public static void handleSurpriseBox(Client c, InPacket inPacket) {
        Char chr = c.getChr();
        Account account = chr.getAccount();

        long sn = inPacket.decodeLong();
        boolean isRare = Util.succeedProp(10);
        Trunk trunk = account.getTrunk();
        CashItemInfo box = trunk.getLockerItemBySn(sn);
        Equip equip;
        if (isRare) { // Lmao get fucked
            equip = ItemData.getEquipDeepCopyFromID(ItemConstants.getSSB_Rare_Reward(), false);
        } else {
            equip = ItemData.getEquipDeepCopyFromID(ItemConstants.getSSB_Common_Reward(), false);
        }
        if (equip == null) {
            c.write(CCashShop.surpriseBoxFailed());
            disposeForCS(chr);
            return;
        }
        CashItemInfo cii = CashItemInfo.fromItem(c.getChr(), equip);
        if (cii == null) {
            c.write(CCashShop.surpriseBoxFailed());
            disposeForCS(chr);
            return;
        }
        if (box != null) {
            box.getItem().setQuantity(box.getItem().getQuantity() - 1);
            c.write(CCashShop.openSurpriseBox(cii, box, isRare));
            if (box.getItem().getQuantity() == 0) {
                trunk.getLocker().removeIf(x -> x.getId() == box.getId());
                box.deleteCashItemInfoFromSQL();
                c.write(CCashShop.resDestroyDone(sn));
            } else {
                c.write(CCashShop.resDestroyDone(sn));
                c.write(CCashShop.resAddedCashItemDone(box));
            }
        } else {
            c.write(CCashShop.surpriseBoxFailed());
        }
        trunk.addCashItem(cii);
        cii.updateCashItemInfoToSQL();
        c.write(CCashShop.resAddedCashItemDone(cii));
        disposeForCS(chr);
    }

    private static void disposeForCS(Char chr) {
        chr.write(CCashShop.queryCashResult(chr));
        Trunk trunk = chr.getAccount().getTrunk();
        final List<CashItemInfo> locker = trunk.getLocker();
        final List<CashItemInfo> removes = new ArrayList<>();
        for (CashItemInfo cii : locker) {
            if (cii.getItem() == null) {
                cii.deleteCashItemInfoFromSQL();
                continue;
            }
            if (cii.getItem() != null && cii.getItem().getDateExpire() != null && cii.getItem().getDateExpire().isExpired()) {
                chr.write(CCashShop.resExpireDone(cii.getItem().getId()));
                removes.add(cii);
                cii.deleteCashItemInfoFromSQL();
            }
        }
        trunk.getLocker().removeAll(removes);
        chr.dispose();
    }

    @Handler(op = InHeader.M_V_P__DAILY_PACK__REQUEST)
    public static void handleCashShopMVPDailyPackRequest(Client c, InPacket inPacket) {
        disposeForCS(c.getChr());
    }

    @Handler(op = InHeader.M_V_P__SPECIAL_PACK__REQUEST)
    public static void handleCashShopMVPSpecialPackRequest(Client c, InPacket inPacket) {
        disposeForCS(c.getChr());
    }
}
