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
                    for (int option = 3; option < 6; option++) {
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
                    for (int option = 3; option < 6; option++) {
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
        chr.chatMessage(SystemNotice, "Violet Cube has been upgraded to Bright Cube in v265.");
        chr.dispose();
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
            zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
            if (zeroEquip == null) {
                zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(11);
            }
        }
        switch (chooseOption) {
            case 6: // Choose Current / After (New Potential)
                equip.setOptions(copy.getOptions());
                equip.updateOptionsInSQL();
                equip.updateToChar(chr);
                if (zeroEquip != null) {
                    zeroEquip.setOptions(copy.getOptions());
                    zeroEquip.updateOptionsInSQL();
                    zeroEquip.updateToChar(chr);
                }
                break;
            case 7: // Choose Before (Old Potential)
                equip.setOptions(memorialCubeInfo.getOldPotentials());
                equip.updateOptionsInSQL();
                equip.updateToChar(chr);
                if (zeroEquip != null) {
                    zeroEquip.setOptions(memorialCubeInfo.getOldPotentials());
                    zeroEquip.updateOptionsInSQL();
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
            byte invTypeVal = 5;
            if (type == 3) {
                pos = inPacket.decodeShort();
                item = chr.getCashInventory().getItemBySlot(pos);
                if (item == null) {
                    chr.dispose();
                    return;
                }
                useVioletCube(chr, inPacket);
                return;
            } else {
                invTypeVal = inPacket.decodeByte(); // 2 = Consume, 5 = Cash
                pos = inPacket.decodeInt();
            }
            if (invTypeVal == 2) {
                item = chr.getConsumeInventory().getItemBySlot(pos);
                if (item == null) {
                    item = chr.getCashInventory().getItemBySlot(pos);
                }
            } else {
                item = chr.getCashInventory().getItemBySlot(pos);
                if (item == null) {
                    item = chr.getConsumeInventory().getItemBySlot(pos);
                }
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
        int cubeType = ItemConstants.getCubeType(itemID);
        switch (itemID) {
            case ItemConstants.GLOWING_CUBE:
            case ItemConstants.RED_CUBE:
                handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, false);
                break;
            case ItemConstants.BRIGHT_CUBE:
            case ItemConstants.BLACK_CUBE:
                handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, false, true);
                break;
            case ItemConstants.BONUS_GLOWING_CUBE:
            case ItemConstants.KARMA_BONUS_GLOWING_CUBE:
            case ItemConstants.BONUS_POTENTIAL_CUBE:
            case ItemConstants.SPECIAL_BONUS_POTENTIAL_CUBE:
                handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, true);
                break;
            case ItemConstants.BONUS_BRIGHT_CUBE_1:
            case ItemConstants.BONUS_BRIGHT_CUBE_2:
                handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, true, true);
                break;
            case ItemConstants.MIRACLE_CUBE:
            case ItemConstants.PREMIUM_MIRACLE_CUBE:
                handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Unique, false);
                break;
            case ItemConstants.SUPER_MIRACLE_CUBE:
            case ItemConstants.REVOLUTIONARY_MIRACLE_CUBE:
            case ItemConstants.PLATINUM_MIRACLE_CUBE:
                handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, false);
                break;
            default:
                if (ItemConstants.MYSTICAL_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Epic, false);
                } else if (ItemConstants.HARD_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Unique, false);
                } else if (ItemConstants.SOLID_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, false);
                } else if (ItemConstants.BRIGHT_CUBES.contains(itemID)) {
                    handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, false, true);
                } else if (ItemConstants.BONUS_MYSTICAL_CUBES.contains(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Epic, true);
                } else if (ItemConstants.BONUS_BRIGHT_CUBES.contains(itemID)) {
                    handleBrightCube(chr, item, inPacket, ItemGrade.Legendary, true, true);
                } else if (ItemConstants.isBonusCube(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, true);
                } else if (ItemConstants.isCube(itemID)) {
                    handleCube(chr, item, itemID, cubeType, inPacket, ItemGrade.Legendary, false);
                } else {
                    chr.dispose();
                }
                break;
        }
    }

    @Handler(op = InHeader.USER_BONUS_MYSTICAL_ITEM_USE_REQUEST)
    public static void handleUserBonusMysticalCubeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int uPos = inPacket.decodeShort();
        Item item = chr.getConsumeInventory().getItemBySlot(uPos);
        if (item == null) {
            item = chr.getCashInventory().getItemBySlot(uPos);
        }
        int cubeID = item != null ? item.getItemId() : ItemConstants.BONUS_MYSTICAL_CUBE;
        if (inPacket.getUnreadAmount() >= 6) {
            cubeID = inPacket.decodeInt();
        }
        handleCube(chr, item, cubeID, ItemConstants.getCubeType(cubeID), inPacket, ItemGrade.Epic, true);
    }

    @Handler(op = InHeader.USER_BONUS_BRIGHT_CUBE_ITEM_USE_REQUEST)
    public static void handleUserBonusCubeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        short uPos;
        if (inPacket.getUnreadAmount() >= 6) {
            inPacket.decodeInt(); // cubeID
            uPos = inPacket.decodeShort();
        } else {
            uPos = inPacket.decodeShort();
        }
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
        short hiddenValue;
        if (bonus) {
            ItemGrade currentGrade = ItemGrade.getGradeByVal(equip.getBonusGrade());
            if (currentGrade == null || currentGrade == ItemGrade.None) {
                chr.chatMessage(SystemNotice, "This item does not have bonus potential. Please use a Bonus Potential Scroll first.");
                chr.dispose();
                return;
            }
            if (currentGrade.isHidden() || currentGrade == ItemGrade.RareSecondary) {
                hiddenValue = (short) switch (currentGrade) {
                    case RareBonusHidden, HiddenRare, RareSecondary -> ItemGrade.Rare.getVal();
                    case EpicBonusHidden, HiddenEpic -> ItemGrade.Epic.getVal();
                    case UniqueBonusHidden, HiddenUnique -> ItemGrade.Unique.getVal();
                    case LegendaryBonusHidden, HiddenLegendary -> ItemGrade.Legendary.getVal();
                    default -> ItemGrade.Rare.getVal();
                };
            } else {
                hiddenValue = (short) currentGrade.getVal();
            }
            if (hiddenValue > itemGradeMax.getVal()) {
                chr.chatMessage(SystemNotice, "This item's bonus potential exceeds the maximum grade allowed by this cube.");
                chr.dispose();
                return;
            }
        } else {
            ItemGrade currentGrade = ItemGrade.getGradeByVal(equip.getBaseGrade());
            if (currentGrade == null || currentGrade == ItemGrade.None) {
                chr.chatMessage(SystemNotice, "This item does not have potential. Please use a Potential Scroll or Magnifying Glass first.");
                chr.dispose();
                return;
            }
            if (currentGrade.isHidden() || currentGrade == ItemGrade.RareSecondary) {
                hiddenValue = (short) switch (currentGrade) {
                    case HiddenRare, RareBonusHidden, RareSecondary -> ItemGrade.Rare.getVal();
                    case HiddenEpic, EpicBonusHidden -> ItemGrade.Epic.getVal();
                    case HiddenUnique, UniqueBonusHidden -> ItemGrade.Unique.getVal();
                    case HiddenLegendary, LegendaryBonusHidden -> ItemGrade.Legendary.getVal();
                    default -> ItemGrade.Rare.getVal();
                };
            } else {
                hiddenValue = (short) currentGrade.getVal();
            }
            if (hiddenValue > itemGradeMax.getVal()) {
                chr.chatMessage(SystemNotice, "This item's potential exceeds the maximum grade allowed by this cube.");
                chr.dispose();
                return;
            }
        }
        int tierUpChance = ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(hiddenValue));
        boolean tierUp = !(hiddenValue >= itemGradeMax.getVal()) && Util.succeedProp(tierUpChance, 1000);
        if (tierUp) {
            hiddenValue++;
        }
        if (!ItemConstants.MYSTICAL_CUBES.contains(cubeID) && !ItemConstants.BONUS_MYSTICAL_CUBES.contains(cubeID)) {
            if (Util.succeedProp(1, 1000) && hiddenValue < itemGradeMax.getVal()) {
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
            int normalizedCubeId = ItemConstants.normalizeLegacyCubeItemId(cubeID);
            if (normalizedCubeId != cubeID && cube.getQuantity() > 0) {
                int remainingQty = cube.getQuantity();
                chr.consumeItem(cube, remainingQty);
                chr.addItemToInventory(normalizedCubeId, remainingQty);
            }
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
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            Equip zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
            if (zeroEquip == null) {
                zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(11);
            }
            if (zeroEquip != null) {
                zeroEquip.setOptions(equip.getOptions());
                zeroEquip.updateToChar(chr);
            }
        }
        chr.write(UserLocal.brightCubeResult(true, cubeID, equip.getItemId()));
        equip.updateOptionsInSQL();
        equip.updateToChar(chr);
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            Equip zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
            if (zeroEquip == null) {
                zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(11);
            }
            if (zeroEquip != null) {
                zeroEquip.updateOptionsInSQL();
            }
        }
        if (cubeType == 0 && (cubeID / 10000 == 271 || cubeID / 10000 == 273)) {
            chr.write(FieldPacket.inGameCubeResult(chr.getId(), tierUp, cubeID, ePos, equip, cubeCount));
        }
        chr.write(WvsContext.consumeCubeRelease(cubeIndex, equip.getId(), cubeCount, cubeType));
        chr.dispose();
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
            short hiddenValue;
            if (bonus) {
                ItemGrade currentGrade = ItemGrade.getGradeByVal(equip.getBonusGrade());
                if (currentGrade == null || currentGrade == ItemGrade.None) {
                    chr.chatMessage(SystemNotice, "This item does not have bonus potential. Please use a Bonus Potential Scroll first.");
                    chr.dispose();
                    return;
                }
                if (currentGrade.isHidden() || currentGrade == ItemGrade.RareSecondary) {
                    hiddenValue = (short) switch (currentGrade) {
                        case RareBonusHidden, HiddenRare, RareSecondary -> ItemGrade.Rare.getVal();
                        case EpicBonusHidden, HiddenEpic -> ItemGrade.Epic.getVal();
                        case UniqueBonusHidden, HiddenUnique -> ItemGrade.Unique.getVal();
                        case LegendaryBonusHidden, HiddenLegendary -> ItemGrade.Legendary.getVal();
                        default -> ItemGrade.Rare.getVal();
                    };
                } else {
                    hiddenValue = (short) currentGrade.getVal();
                }
                if (hiddenValue > itemGradeMax.getVal()) {
                    chr.chatMessage(SystemNotice, "This item's bonus potential exceeds the maximum grade allowed by this cube.");
                    chr.dispose();
                    return;
                }
            } else {
                ItemGrade currentGrade = ItemGrade.getGradeByVal(equip.getBaseGrade());
                if (currentGrade == null || currentGrade == ItemGrade.None) {
                    chr.chatMessage(SystemNotice, "This item does not have potential. Please use a Potential Scroll or Magnifying Glass first.");
                    chr.dispose();
                    return;
                }
                if (currentGrade.isHidden() || currentGrade == ItemGrade.RareSecondary) {
                    hiddenValue = (short) switch (currentGrade) {
                        case HiddenRare, RareBonusHidden, RareSecondary -> ItemGrade.Rare.getVal();
                        case HiddenEpic, EpicBonusHidden -> ItemGrade.Epic.getVal();
                        case HiddenUnique, UniqueBonusHidden -> ItemGrade.Unique.getVal();
                        case HiddenLegendary, LegendaryBonusHidden -> ItemGrade.Legendary.getVal();
                        default -> ItemGrade.Rare.getVal();
                    };
                } else {
                    hiddenValue = (short) currentGrade.getVal();
                }
                if (hiddenValue > itemGradeMax.getVal()) {
                    chr.chatMessage(SystemNotice, "This item's potential exceeds the maximum grade allowed by this cube.");
                    chr.dispose();
                    return;
                }
            }
            int tierUpChance = ItemConstants.getTierUpChance(cubeID, ItemGrade.getGradeByVal(hiddenValue));
            boolean tierUp = !(hiddenValue >= itemGradeMax.getVal()) && Util.succeedProp(tierUpChance, 1000);
            if (tierUp) {
                hiddenValue++;
            }
            if (Util.succeedProp(1, 1000) && hiddenValue < itemGradeMax.getVal()) {
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
                int normalizedCubeId = ItemConstants.normalizeLegacyCubeItemId(cubeID);
                if (normalizedCubeId != cubeID && cube.getQuantity() > 0) {
                    int remainingQty = cube.getQuantity();
                    chr.consumeItem(cube, remainingQty);
                    chr.addItemToInventory(normalizedCubeId, remainingQty);
                }
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
            chr.dispose();
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
                    chr.dispose();
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
                        equip.updateOptionsInSQL();
                        equip.updateToChar(chr);
                        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
                            Equip zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(-11);
                            if (zeroEquip == null) {
                                zeroEquip = (Equip) chr.getEquippedInventory().getItemBySlot(11);
                            }
                            if (zeroEquip != null) {
                                zeroEquip.setOptions(equip.getOptions());
                                zeroEquip.updateOptionsInSQL();
                                zeroEquip.updateToChar(chr);
                            }
                        }
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
            equip.updateOptionsInSQL();
            equip.updateToChar(chr);
            chr.setVioletEquip(null);
            chr.write(FieldPacket.violetCubeResult(1, equip.getOptions()));
            //For Zero.
            if (chr.getVioletZeroEquip() != null) {
                Equip zeroWeapon = chr.getVioletZeroEquip();
                for (int i = 0; i < size; i++) {
                    zeroWeapon.setOption(i, potentials.get(i), false);
                }
                zeroWeapon.updateOptionsInSQL();
                zeroWeapon.updateToChar(chr);
                chr.setVioletZeroEquip(null);
            }
        }
        chr.dispose();
    }
}
