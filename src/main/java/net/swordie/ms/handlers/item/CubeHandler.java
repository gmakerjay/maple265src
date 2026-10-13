package net.swordie.ms.handlers.item;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.items.*;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.ItemConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.InvType;
import net.swordie.ms.enums.ItemGrade;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.Util;

import java.util.ArrayList;
import java.util.List;

import static net.swordie.ms.enums.ChatType.SystemNotice;
import static net.swordie.ms.enums.InvType.*;

public class CubeHandler {

    public static String getIconPotential(ItemGrade grade) {
        switch (grade) {
            case Rare:
            case RareSecondary:
                return "#fUI/UIWindow2.img/AdditionalOptionTooltip/rare#";
            case Epic:
                return "#fUI/UIWindow2.img/AdditionalOptionTooltip/epic#";
            case Unique:
                return "#fUI/UIWindow2.img/AdditionalOptionTooltip/unique#";
            case Legendary:
                return "#fUI/UIWindow2.img/AdditionalOptionTooltip/legendary#";
            default:
                return null;
        }
    }

    public static String getPotential(Equip equip, byte type, MemorialCubeInfo memorialCubeInfo) {
        StringBuilder dialog = new StringBuilder();
        int rawLevelPotential = (equip.getrLevel() + equip.getiIncReq());
        //0: Show both, 1 show Base, 2 show Bonus, 3 show Violet
        if (type == 0 || type == 1) {
            ItemGrade baseGrade = ItemGrade.getGradeByVal(equip.getBaseGrade());
            dialog.append(String.format("#eItem: #b #z%d#  #v%d##k#n\r\n", equip.getItemId(), equip.getItemId()));
            //Potential
            if (memorialCubeInfo != null) {
                //Before
                dialog.append(String.format("#eBefore Potential: #n %s\r\n", CubeHandler.getIconPotential(baseGrade)));
                dialog.append("#L0#");
                for (int option = 0; option < 3; option++) {
                    int potentialID = memorialCubeInfo.getOldPotentials().get(option);
                    ItemOption itemOption = ItemData.getItemOptionById(memorialCubeInfo.getOldPotentials().get(option));
                    if (itemOption != null) {
                        if (potentialID != 0) {
                            if (option > 0) {
                                dialog.append(String.format("\t\t  %s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                            } else {
                                dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                            }
                        }
                    }
                }
                dialog.append("#l\r\n");
                //After
                dialog.append(String.format("#eAfter Potential: #n %s\r\n", CubeHandler.getIconPotential(baseGrade)));
                dialog.append("#L1#");
                for (int option = 0; option < 3; option++) {
                    int potentialID = equip.getOptions().get(option);
                    ItemOption itemOption = ItemData.getItemOptionById(potentialID);
                    if (itemOption != null) {
                        if (potentialID != 0) {
                            if (option > 0) {
                                dialog.append(String.format("\t\t  %s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                            } else {
                                dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                            }
                        }
                    }
                }
                dialog.append("#l");
            } else {
                dialog.append(String.format("#ePotential: #n %s\r\n", CubeHandler.getIconPotential(baseGrade)));
                for (int option : equip.getOptionBase()) {
                    ItemOption itemOption = ItemData.getItemOptionById(option);
                    if (itemOption != null) {
                        dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(option)), itemOption.getString(rawLevelPotential)));
                    }
                }
            }
        }
        if (type == 0 || type == 2) {
            //Bonus Potential
            if (equip.getOptionBonus()[0] != 0) {
                ItemGrade bonusGrade = ItemGrade.getGradeByVal(equip.getBonusGrade());
                if (memorialCubeInfo != null) {
                    //Before
                    dialog.append(String.format("#eBefore Bonus Potential: #n %s\r\n", CubeHandler.getIconPotential(bonusGrade)));
                    dialog.append("#L0#");
                    for (int option = 3; option < 5; option++) {
                        int potentialID = memorialCubeInfo.getOldPotentials().get(option);
                        ItemOption itemOption = ItemData.getItemOptionById(memorialCubeInfo.getOldPotentials().get(option));
                        if (itemOption != null) {
                            if (potentialID != 0) {
                                if (option > 3) {
                                    dialog.append(String.format("\t\t  %s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                                } else {
                                    dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                                }
                            }
                        }
                    }
                    dialog.append("#l\r\n");
                    //After
                    dialog.append(String.format("#eAfter Bonus Potential: #n %s\r\n", CubeHandler.getIconPotential(bonusGrade)));
                    dialog.append("#L1#");
                    for (int option = 3; option < 5; option++) {
                        int potentialID = equip.getOptions().get(option);
                        ItemOption itemOption = ItemData.getItemOptionById(potentialID);
                        if (itemOption != null) {
                            if (potentialID != 0) {
                                if (option > 3) {
                                    dialog.append(String.format("\t\t  %s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                                } else {
                                    dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(potentialID)), itemOption.getString(rawLevelPotential)));
                                }
                            }
                        }
                    }
                    dialog.append("#l");
                } else {
                    dialog.append(String.format("#eBonus Potential: #n %s\r\n", CubeHandler.getIconPotential(bonusGrade)));
                    for (int option : equip.getOptionBonus()) {
                        ItemOption itemOption = ItemData.getItemOptionById(option);
                        if (itemOption != null) {
                            dialog.append(String.format("\t%s %s\r\n", CubeHandler.getIconPotential(ItemGrade.getGradeByOption(option)), itemOption.getString(rawLevelPotential)));
                        }
                    }
                }
            }
        }
        return dialog.toString();
    }

    public static void useVioletCube(Char chr, InPacket inPacket) {
        if (true) {
            return; // TODO
        }
        int cubeID = ItemConstants.VIOLET_CUBE;

        short equipPosition = (short) inPacket.decodeShort();
        inPacket.skip(inPacket.getUnreadAmount() - 1);
        InvType invType = equipPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(equipPosition);
        Equip zeroEquip = null;
        //Verify Equip.
        if (equip == null) {
            chr.chatMessage(SystemNotice, "Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }

        int tierUpChance = ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(equip.getBaseGrade()));
        short hiddenValue = ItemGrade.getGradeByVal(equip.getBaseGrade()).getVal();
        int itemGradeMax = CubeHandler.getMaxGradeOfItem(cubeID).getVal();
        boolean isTierUp = !(hiddenValue >= itemGradeMax) && Util.succeedProp(tierUpChance, 1000);
        if (isTierUp) {
            hiddenValue++;
        }
        boolean isThreeLine = equip.getOptionBase(2) != 0;
        List<Integer> availableOptions = new ArrayList<>(equip.getVioletOptions(cubeID, 2, isThreeLine ? 6 : 4));

        chr.consumeItem(cubeID, 1);
        int cubeCount = Math.max(chr.getScriptManager().getQuantityOfItem(cubeID) - 1, 0);

        long cost = ItemConstants.getMesoCubingCost(equip.getrLevel());
        if (cost > chr.getMoney()) {
            chr.chatMessage("You don't have enough mesos.");
            chr.dispose();
            return;
        }
        chr.deductMoney(cost);
        chr.setVioletEquip(equip);
        //For Zero.
        if (ItemConstants.isLongOrBigSword(equip.getItemId())) {
            Equip zeroWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(11);
            if (zeroWeapon != null) {
                chr.setVioletZeroEquip(zeroWeapon);
            }
        }
        chr.write(UserLocal.itemSlotExtendItemUse(true, cubeID, equip.getItemId()));
        chr.write(WvsContext.violetCubeInit(inPacket.decodeByte(),0, cubeCount,
                chr.getCashInventory().getItemByItemID(ItemConstants.VIOLET_CUBE),
                equip.getId(),
                equip,
                availableOptions));
    }

    public static ItemGrade getMaxGradeOfItem(int cubeID) {
        switch (cubeID) {
            case ItemConstants.MIRACLE_CUBE:
            case ItemConstants.PREMIUM_MIRACLE_CUBE:
                return ItemGrade.Unique;
            default:
                if (ItemConstants.MYSTICAL_CUBES.contains(cubeID)) {
                    return ItemGrade.Epic;
                }
                if (ItemConstants.HARD_CUBES.contains(cubeID)) {
                    return ItemGrade.Unique;
                }
                return ItemGrade.Legendary;
        }
    }

    @Handler(op = InHeader.USER_MEMORIAL_CUBE_OPTION_REQUEST)
    //This function will be active when click choose before or choose current or continue black cubing
    public static void handleUserMemorialCubeOptionRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        short chooseOption = inPacket.decodeShort();
        long uniqueID = inPacket.decodeLong();
        MemorialCubeInfo memorialCubeInfo = chr.getMemorialCubeInfo();
        if (memorialCubeInfo == null) {
            chr.dispose();
            return;
        }
        Equip copy = memorialCubeInfo.getEquip();
        if (copy == null) {
            chr.dispose();
            return;
        }
        InvType invType = copy.getInvType() == EQUIPPED ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(copy.getBagIndex());
        if (equip == null) {
            equip = (Equip) chr.getEquippedInventory().getItemBySlot(copy.getBagIndex());
            if (equip == null) {
                equip = (Equip) chr.getEquippedInventory().getItemBySlot(-copy.getBagIndex());
            }
        }
        if (equip == null) {
            chr.dispose();
            return;
        }
        Equip zeroEquip = null;
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getEquipInventory().getItemBySlot(-11);
        }
        switch (chooseOption) {
            case 6: // Choose Current / After (New Potential)
                equip.setOptions(copy.getOptions());
                equip.updateToChar(chr);
                if (zeroEquip != null) {
                    zeroEquip.setOptions(copy.getOptions());
                    zeroEquip.updateToChar(chr);
                }
                break;
            case 7: // Choose Before (Old Potential)
                equip.setOptions(memorialCubeInfo.getOldPotentials());
                equip.updateToChar(chr);
                if (zeroEquip != null) {
                    zeroEquip.setOptions(memorialCubeInfo.getOldPotentials());
                    zeroEquip.updateToChar(chr);
                }
                break;
        }
        chr.setMemorialCubeInfo(null);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_CASH_CUBE_ITEM_USE_REQUEST)
    public static void handleUserCashCubeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        boolean init = inPacket.decodeByte() == 0; // 0?
        inPacket.decodeByte(); // 0?
        byte type = inPacket.decodeByte(); // 7? hoặc 1
        Item item;
        if (init) {
            int pos;
            if (type == 3) {
                pos = inPacket.decodeShort();
                item = chr.getCashInventory().getItemBySlot(pos);
                if (item == null) {
                    return;
                }
                useVioletCube(chr, inPacket);
                return;
            } else {
                inPacket.decodeByte(); // 2?
                pos = inPacket.decodeInt();
            }
            item = chr.getCashInventory().getItemBySlot(pos);
            if (item == null) {
                item = chr.getConsumeInventory().getItemBySlot(pos);
            }
            if (item == null) {
                chr.dispose();
                return;
            }
            handleCubeAll(chr, item, inPacket);
        } else {
            handleBrightCube(chr, null, inPacket, ItemGrade.Legendary, false, false);
        }
    }

    @Handler(op = InHeader.USER_CONSUME_CUBE_ITEM_USE_REQUEST)
    public static void handleUserConsumeCubeItemUserRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int pos = inPacket.decodeShort();
        var item = chr.getConsumeInventory().getItemBySlot(pos);
        if (item == null) {
            item = chr.getCashInventory().getItemBySlot(pos);
        }
        if (item == null && pos < 0) {
            item = chr.getConsumeInventory().getItemBySlot(Math.abs(pos));
            if (item == null) {
                item = chr.getCashInventory().getItemBySlot(Math.abs(pos));
            }
        }
        if (item == null) {
            chr.dispose();
            return;
        }
        handleCubeAll(chr, item, inPacket);
    }

    public static void handleCubeAll(Char chr, Item item, InPacket inPacket) {
        if (item == null) {
            chr.dispose();
            return;
        }
        var itemID = item.getItemId();
        switch (itemID) {
            case ItemConstants.GLOWING_CUBE:
            case ItemConstants.RED_CUBE:
                handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, false);
                break;
            case ItemConstants.BRIGHT_CUBE:
            case ItemConstants.BLACK_CUBE:
                handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, false, true);
                break;
            case ItemConstants.BONUS_GLOWING_CUBE:
            case ItemConstants.KARMA_BONUS_GLOWING_CUBE:
            case ItemConstants.BONUS_POTENTIAL_CUBE:
            case ItemConstants.SPECIAL_BONUS_POTENTIAL_CUBE:
                handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, true);
                break;
            case ItemConstants.BONUS_BRIGHT_CUBE_1:
            case ItemConstants.BONUS_BRIGHT_CUBE_2:
                handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, true, true);
                break;
            case ItemConstants.MIRACLE_CUBE:
            case ItemConstants.PREMIUM_MIRACLE_CUBE:
                handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Unique, false);
                break;
            case ItemConstants.SUPER_MIRACLE_CUBE:
            case ItemConstants.REVOLUTIONARY_MIRACLE_CUBE:
            case ItemConstants.PLATINUM_MIRACLE_CUBE:
                handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, false);
                break;
            default:
                if (ItemConstants.MYSTICAL_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Epic, false);
                } else if (ItemConstants.HARD_CUBES.contains(itemID)) {
                    int cubeType = switch (itemID) {
                        case 2710044 -> 1;
                        case 2710032, 2710034 -> 2;
                        case 2710038 -> 3;
                        case 2710029 -> 4;
                        default -> 0;
                    };
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Unique, false);
                } else if (ItemConstants.SOLID_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, false);
                } else if (ItemConstants.BRIGHT_CUBES.contains(itemID)) {
                    handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, false, true);
                } else if (ItemConstants.BONUS_MYSTICAL_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Epic, true);
                } else if (ItemConstants.BONUS_BRIGHT_CUBES.contains(itemID)) {
                    handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, true, true);
                } else if (ItemConstants.isBonusCube(itemID)) {
                    handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, true);
                } else if (ItemConstants.isCube(itemID)) {
                    handleCube(chr, item, itemID, 0, inPacket, ItemGrade.Legendary, false);
                } else {
                    chr.dispose();
                }
                break;
        }
    }

    @Handler(op = InHeader.USER_BONUS_MYSTICAL_ITEM_USE_REQUEST)
    public static void handleUserBonusMysticalCubeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt();
        int uPos = inPacket.decodeShort();
        int cubeID = inPacket.decodeInt();
        handleCube(chr, cubeID, 0, inPacket, ItemGrade.Epic, true);
    }

    @Handler(op = InHeader.USER_BONUS_BRIGHT_CUBE_ITEM_USE_REQUEST)
    public static void handleUserBonusCubeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt();
        int cubeID = inPacket.decodeInt();
        short uPos = inPacket.decodeShort();
        var item = chr.getConsumeInventory().getItemBySlot(uPos);
        if (item == null) {
            item = chr.getCashInventory().getItemBySlot(uPos);
        }
        handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, true, true);
    }

    public static void handleCube(Char chr, int cubeID, int cubeType, InPacket inPacket, ItemGrade itemGradeMax, boolean bonus) {
        handleCube(chr, null, cubeID, cubeType, inPacket, itemGradeMax, bonus);
    }

    public static void handleCube(Char chr, Item cube, int cubeID, int cubeType, InPacket inPacket, ItemGrade itemGradeMax, boolean bonus) {
        if (inPacket.getUnreadAmount() == 0) {
            chr.dispose();
            return;
        }
        int ePos = inPacket.decodeShort();
        if (inPacket.getUnreadAmount() > 1) {
            inPacket.skip(inPacket.getUnreadAmount() - 1);
        }
        byte cubeIndex = inPacket.getUnreadAmount() > 0 ? inPacket.decodeByte() : 0;

        InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
        if (equip == null && ePos < 0) {
            equip = (Equip) chr.getEquippedInventory().getItemBySlot(ePos);
            if (equip == null) {
                equip = (Equip) chr.getEquippedInventory().getItemBySlot(-ePos);
            }
        }
        if (equip == null) {
            chr.chatMessage(SystemNotice, "An unknown error has occurred.");
            chr.dispose();
            return;
        }
        if (bonus) {
            if (equip.getBonusGrade() > itemGradeMax.getVal()) {
                String msg = String.format("Character %d tried to use %s cube (id %d) an equip with a bonus potential greater than it is allowed to (id %d)", chr.getId(), StringData.getItemStringById(cubeID), cubeID, equip.getItemId());
                DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
                chr.chatMessage(SystemNotice, "This item's bonus potential exceeds the maximum grade allowed by this cube.");
                chr.dispose();
                return;
            } else if (equip.getBonusGrade() < ItemGrade.Rare.getVal()) {
                chr.chatMessage(SystemNotice, "This item does not have bonus potential. Please use a Bonus Potential Scroll first.");
                chr.dispose();
                return;
            }
        } else {
            if (equip.getBaseGrade() > itemGradeMax.getVal()) {
                String msg = String.format("Character %d tried to use %s cube (id %d) an equip with a potential greater than it is allowed to (id %d)", chr.getId(), StringData.getItemStringById(cubeID), cubeID, equip.getItemId());
                DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
                chr.chatMessage(SystemNotice, "This item's potential exceeds the maximum grade allowed by this cube.");
                chr.dispose();
                return;
            } else if (equip.getBaseGrade() < ItemGrade.Rare.getVal()) {
                chr.chatMessage(SystemNotice, "This item does not have potential. Please use a Potential Scroll or Magnifying Glass first.");
                chr.dispose();
                return;
            }
        }
        int tierUpChance = bonus ? ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(equip.getBonusGrade())) : ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(equip.getBaseGrade()));
        short hiddenValue = bonus ? ItemGrade.getGradeByVal(equip.getBonusGrade()).getVal() : ItemGrade.getGradeByVal(equip.getBaseGrade()).getVal();
        boolean tierUp = !(hiddenValue >= ItemGrade.Legendary.getVal()) && Util.succeedProp(tierUpChance, 1000);
        if (tierUp) {
            hiddenValue++;
        }
        if (!ItemConstants.MYSTICAL_CUBES.contains(cubeID) && !ItemConstants.BONUS_MYSTICAL_CUBES.contains(cubeID)) {
            if (Util.succeedProp(1, 1000) && hiddenValue < ItemGrade.Legendary.getVal()) {
                hiddenValue++; // Can increase up to 2 ranks
            }
        }
        long cost = ItemConstants.getMesoCubingCost(equip.getrLevel());
        if (cost > chr.getMoney()) {
            chr.chatMessage("You don't have enough mesos.");
            chr.dispose();
            return;
        }
        chr.deductMoney(cost);
        if (cube != null) {
            chr.consumeItem(cube, 1);
        } else {
            chr.consumeItem(cubeID, 1);
        }
        giveCubePieces(chr, cubeID);
        int cubeCount = Math.max(chr.getScriptManager().getQuantityOfItem(cubeID), 0);
        if (bonus) {
            equip.resetHiddenOptionBonus(hiddenValue);
        } else {
            equip.setHiddenOptionBase(hiddenValue, 0);
        }
        equip.releaseOptions(bonus, cubeID);
        chr.write(UserLocal.brightCubeResult(true, cubeID, equip.getItemId()));
        equip.updateToChar(chr);
        chr.write(WvsContext.consumeCubeRelease(cubeIndex, equip.getId(), cubeCount, cubeType));
    }

    protected static void handleBrightCube(Char chr, Item cube, InPacket inPacket, ItemGrade itemGradeMax, boolean bonus, boolean init) {
        if (init) {
            if (inPacket.getUnreadAmount() == 0) {
                chr.dispose();
                return;
            }
            int ePos = inPacket.decodeShort();
            if (inPacket.getUnreadAmount() > 1) {
                inPacket.skip(inPacket.getUnreadAmount() - 1);
            }
            byte cubeIndex = inPacket.getUnreadAmount() > 0 ? inPacket.decodeByte() : 0;
            int cubeID = cube != null ? cube.getItemId() : 0;
            InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
            Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
            if (equip == null && ePos < 0) {
                equip = (Equip) chr.getEquippedInventory().getItemBySlot(ePos);
                if (equip == null) {
                    equip = (Equip) chr.getEquippedInventory().getItemBySlot(-ePos);
                }
            }
            if (equip == null) {
                chr.chatMessage(SystemNotice, "An unknown error has occurred.");
                chr.dispose();
                return;
            }
            if (bonus) {
                if (equip.getBonusGrade() > itemGradeMax.getVal()) {
                    String msg = String.format("Character %d tried to use %s cube (id %d) an equip with a bonus potential greater than it is allowed to (id %d)", chr.getId(), StringData.getItemStringById(cubeID), cubeID, equip.getItemId());
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
                    chr.chatMessage(SystemNotice, "This item's bonus potential exceeds the maximum grade allowed by this cube.");
                    chr.dispose();
                    return;
                } else if (equip.getBonusGrade() < ItemGrade.Rare.getVal()) {
                    chr.chatMessage(SystemNotice, "This item does not have bonus potential. Please use a Bonus Potential Scroll first.");
                    chr.dispose();
                    return;
                }
            } else {
                if (equip.getBaseGrade() > itemGradeMax.getVal()) {
                    String msg = String.format("Character %d tried to use %s cube (id %d) an equip with a potential greater than it is allowed to (id %d)", chr.getId(), StringData.getItemStringById(cubeID), cubeID, equip.getItemId());
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
                    chr.chatMessage(SystemNotice, "This item's potential exceeds the maximum grade allowed by this cube.");
                    chr.dispose();
                    return;
                } else if (equip.getBaseGrade() < ItemGrade.Rare.getVal()) {
                    chr.chatMessage(SystemNotice, "This item does not have potential. Please use a Potential Scroll or Magnifying Glass first.");
                    chr.dispose();
                    return;
                }
            }
            int tierUpChance = bonus ? ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(equip.getBonusGrade())) : ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(equip.getBaseGrade()));
            short hiddenValue = bonus ? ItemGrade.getGradeByVal(equip.getBonusGrade()).getVal() : ItemGrade.getGradeByVal(equip.getBaseGrade()).getVal();
            boolean tierUp = !(hiddenValue >= ItemGrade.Legendary.getVal()) && Util.succeedProp(tierUpChance, 1000);
            if (tierUp) {
                hiddenValue++;
            }
            if (Util.succeedProp(1, 1000) && hiddenValue < ItemGrade.Legendary.getVal()) {
                hiddenValue++; // Can increase up to 2 ranks
            }
            long cost = ItemConstants.getMesoCubingCost(equip.getrLevel());
            if (cost > chr.getMoney()) {
                chr.chatMessage("You don't have enough mesos.");
                chr.dispose();
                return;
            }
            chr.deductMoney(cost);
            if (cube != null) {
                chr.consumeItem(cube, 1);
            } else {
                chr.consumeItem(cubeID, 1);
            }
            giveCubePieces(chr, cubeID);
            int cubeCount = Math.max(chr.getScriptManager().getQuantityOfItem(cubeID), 0);
            var copy = equip.deepCopy();
            if (bonus) {
                copy.resetHiddenOptionBonus(hiddenValue);
            } else {
                copy.setHiddenOptionBase(hiddenValue, 0);
            }
            copy.releaseOptions(bonus, cubeID);
            chr.setMemorialCubeInfo(new MemorialCubeInfo(copy, equip.getOptions(), cubeID));
            chr.write(UserLocal.brightCubeResult(true, cubeID, copy.getItemId()));
            chr.write(WvsContext.consumeBrightCubeInit(cubeIndex, cubeCount, cube, equip.getId(), copy, bonus));
        } else {
            int result = inPacket.getUnreadAmount() >= 4 ? inPacket.decodeInt() : (inPacket.getUnreadAmount() >= 2 ? inPacket.decodeShort() : 0);
            var memorialCubeInfo = chr.getMemorialCubeInfo();
            if (memorialCubeInfo != null) {
                int cubeID = memorialCubeInfo.getCubeItemID();
                if (!ItemConstants.BRIGHT_CUBES.contains(cubeID)
                        && !ItemConstants.BONUS_BRIGHT_CUBES.contains(cubeID)
                        && cubeID != ItemConstants.BRIGHT_CUBE
                        && cubeID != ItemConstants.BLACK_CUBE
                        && cubeID != ItemConstants.BONUS_BRIGHT_CUBE_1
                        && cubeID != ItemConstants.BONUS_BRIGHT_CUBE_2) {
                    return;
                }
                var copy = memorialCubeInfo.getEquip();
                if (copy != null) {
                    InvType invType = copy.getInvType() == EQUIPPED ? EQUIPPED : EQUIP;
                    Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(copy.getBagIndex());
                    if (equip == null) {
                        equip = (Equip) chr.getEquippedInventory().getItemBySlot(copy.getBagIndex());
                        if (equip == null) {
                            equip = (Equip) chr.getEquippedInventory().getItemBySlot(-copy.getBagIndex());
                        }
                    }
                    if (equip != null) {
                        if (result == 0 || result == 6) {
                            equip.setOptions(copy.getOptions());
                        } else {
                            equip.setOptions(memorialCubeInfo.getOldPotentials());
                        }
                        equip.updateToChar(chr);
                    }
                }
            }
            if (chr.getMemorialCubeInfo() != null) {
                chr.getMemorialCubeInfo().setEquip(null);
                chr.setMemorialCubeInfo(null);
            }
            if (inPacket.getUnreadAmount() > 1) {
                inPacket.skip(inPacket.getUnreadAmount() - 1);
            }
            byte releaseIdx = inPacket.getUnreadAmount() > 0 ? inPacket.decodeByte() : 0;
            chr.write(WvsContext.consumeBrightCubeRelease(releaseIdx));
            chr.dispose();
        }
    }

    private static void giveCubePieces(Char chr, int cubeID) {
        var sm = chr.getScriptManager();
        var cubePiece = 2635594;
        switch (cubeID) {
            case ItemConstants.GLOWING_CUBE:
                if (sm.canHold(cubePiece, 1)) sm.giveItem(cubePiece, 1);
                break;
            case ItemConstants.BRIGHT_CUBE:
            case ItemConstants.BONUS_GLOWING_CUBE:
                if (sm.canHold(cubePiece, 2)) sm.giveItem(cubePiece, 2);
                break;
            case ItemConstants.BONUS_BRIGHT_CUBE_1:
            case ItemConstants.BONUS_BRIGHT_CUBE_2:
                if (sm.canHold(cubePiece, 3)) sm.giveItem(cubePiece, 3);
                break;
        }
    }

    @Handler(op = InHeader.VIOLET_CUBE_REQUEST)
    public static void handleVioletCubeRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int size = inPacket.decodeInt();
        List<Integer> potentials = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            potentials.add(inPacket.decodeInt());
        }
        if (chr.getVioletEquip() != null) {
            Equip equip = chr.getVioletEquip();
            for (int i = 0; i < size; i++) {
                equip.setOption(i, potentials.get(i), false);
            }
            equip.updateToChar(chr);
            chr.setVioletEquip(null);
            chr.write(FieldPacket.violetCubeResult(1, equip.getOptions()));
            //For Zero.
            if (chr.getVioletZeroEquip() != null) {
                Equip zeroWeapon = chr.getVioletZeroEquip();
                for (int i = 0; i < size; i++) {
                    equip.setOption(i, potentials.get(i), false);
                }
                zeroWeapon.updateToChar(chr);
                chr.setVioletZeroEquip(null);
            }
        } else {
            chr.dispose();
        }
    }
}
