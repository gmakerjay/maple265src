package net.swordie.ms.handlers.item;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.items.*;
import net.swordie.ms.client.character.potential.CharacterPotential;
import net.swordie.ms.client.character.potential.CharacterPotentialValueHolder;
import net.swordie.ms.client.character.quest.Quest;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.social.Guild.GuildSkill;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.*;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.QuestData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.loaders.containerclasses.ItemInfo;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.Util;

import java.util.List;
import java.util.Map;

import static net.swordie.ms.enums.ChatType.SystemNotice;
import static net.swordie.ms.enums.EquipBaseStat.iuc;
import static net.swordie.ms.enums.EquipBaseStat.tuc;
import static net.swordie.ms.enums.InvType.*;

public class ItemUpgradeHandler {

    @Handler(op = InHeader.USER_MEMORIAL_EX_UPGRADE_ITEM_USE_REQUEST)
    public static void handleMemorialExUpgradeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        inPacket.decodeInt(); // 1
        short usePosition = inPacket.decodeShort(); //Use Position
        int flameID = inPacket.decodeInt(); // 1
        short eqpPosition = inPacket.decodeShort(); //Equip Position
        inPacket.decodeByte(); //boolean
        inPacket.decodeByte(); //boolean
        Item flame = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(usePosition);
        InvType invType = eqpPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(eqpPosition);
        if (flame == null || equip == null || (flame.getItemId() != flameID)) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        if (!ItemConstants.isRebirthFlame(flame.getItemId())) {
            String msg = String.format("Character %d tried to use a uncorrected (id %d) on an equip via Use inventory. OPCode : %d",
                    chr.getId(), flame.getItemId(), InHeader.USER_MEMORIAL_EX_UPGRADE_ITEM_USE_REQUEST.getValue());
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        ItemInfo ii = ItemData.getItemInfoByID(flame.getItemId());
        if (ii == null) {
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        if (!ii.getReqItemIds().contains(equip.getItemId()) && ii.getReqItemIds().size() > 0) {
            chr.chatPopup("Vật phẩm này không dùng được trên trang bi này.");
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        Map<ScrollStat, Integer> vals = ii.getScrollStats();
        if (!vals.isEmpty()) {
            int reqEquipLevelMax = vals.getOrDefault(ScrollStat.reqEquipLevelMax, 250);
            if (equip.getrLevel() + equip.getiIncReq() > reqEquipLevelMax) {
                chr.chatPopup("Cấp độ trang bị không đáp ứng yêu cầu vật phẩm.");
                chr.write(WvsContext.blackFlameOfResurrectionModifed());
                chr.dispose();
                return;
            }
            String itemName = StringData.getItemStringById(flameID).toLowerCase();
            FlameType flameType = null;
            if (ii.isExNew()) {
                if (itemName.contains("powerful")) {
                    flameType = FlameType.Powerful;
                } else if (itemName.contains("eternal")) {
                    flameType = FlameType.Eternal;
                } else if (itemName.contains("black")) {
                    flameType = FlameType.Black;
                } else if (itemName.contains("abyssal")) {
                    flameType = FlameType.Abyssal;
                } else {
                    String msg = String.format("Người chơi %d sử dụng vật phẩm trái phép (id %d) để cường hoá trang bị. OPCode : %d",
                            chr.getId(), flameID, InHeader.USER_MEMORIAL_EX_UPGRADE_ITEM_USE_REQUEST.getValue());
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
                    chr.write(WvsContext.blackFlameOfResurrectionModifed());
                    chr.dispose();
                    return;
                }
                if (flameType == FlameType.Powerful || flameType == FlameType.Eternal) {
                    short tier = equip.flame(flameType);
                    chr.write(WvsContext.blackFlameOfResurrectionModifed(1, equip, equip, flameID, tier));
                    chr.createQuestWithQRValue(QuestConstants.FLAME_QR, "flameid=" + flameID + ";epos="+eqpPosition+";ex="+equip.getExGradeOption()+";tier="+tier+";eid="+equip.getId());
                } else {
                    Equip equipCopy = equip.deepCopy();
                    short tier = equipCopy.flame(flameType);
                    chr.write(WvsContext.blackFlameOfResurrectionModifed(1, equip, equipCopy, flameID, tier));
                    chr.createQuestWithQRValue(QuestConstants.FLAME_QR, "flameid=" + flameID + ";epos="+eqpPosition+";ex="+equipCopy.getExGradeOption()+";tier="+tier+";eid="+equip.getId());
                }
                chr.consumeItem(flameID, 1);
            }
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_MEMORIAL_EX_UPGRADE_ITEM_OPTION_REQUEST)
    public static void handleMemorialExUpgradeItemOptionRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // -1
        short equipBagIndex = 0;
        long SN = 0;
        long exGradeOption = 0;
        try {
            equipBagIndex = Short.parseShort(chr.getQRValueByKey(QuestConstants.FLAME_QR, "epos"));
            SN = Long.parseLong(chr.getQRValueByKey(QuestConstants.FLAME_QR, "eid"));
            exGradeOption = Long.parseLong(chr.getQRValueByKey(QuestConstants.FLAME_QR, "ex"));
        } catch (Exception e) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        InvType invType = equipBagIndex < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySN(SN);
        if (equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.write(WvsContext.blackFlameOfResurrectionModifed());
            chr.dispose();
            return;
        }
        equip.flame(exGradeOption);
        equip.saveToSQL();
        equip.updateToChar(chr);
        chr.write(WvsContext.blackFlameOfResurrectionModifed());
        chr.dispose();
    }

    @Handler(op = InHeader.GOLD_HAMMER_REQUEST)
    public static void handleGoldHammerRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int nItemUsePosition = inPacket.decodeInt();
        int hammerID = inPacket.decodeInt(); // hammer item id
        inPacket.decodeInt(); // use hammer? useless though
        int nEquipPosition = inPacket.decodeInt();

        InvType invType = nEquipPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot((short) nEquipPosition);
        Equip zeroEquip = null;
        Item hammer = chr.getInventoryByType(CONSUME).getItemBySlot((short) nItemUsePosition);
        short maxHammers = ItemConstants.MAX_HAMMER_SLOTS;
        if (equip == null || !ItemConstants.canEquipGoldHammer(equip) || hammer == null || !ItemConstants.isGoldHammer(hammer) || hammerID != hammer.getItemId()) {
            chr.write(WvsContext.goldHammerItemUpgradeResult(GoldHammerResult.Error, 1, 0));
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried to use hammer (id %d) on an invalid equip (id %d)", chr.getId(), hammer == null ? 0 : hammer.getItemId(), equip == null ? 0 : equip.getItemId()));
            chr.dispose();
            return;
        }
        Equip defaultEquip = ItemData.getEquipById(equip.getItemId());
        if (defaultEquip.isHasIUCMax()) {
            maxHammers = defaultEquip.getIUCMax();
        }
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getInventoryByType(invType).getItemBySlot(-11);
        }

        Map<ScrollStat, Integer> vals = ItemData.getItemInfoByID(hammer.getItemId()).getScrollStats();

        if (vals.size() > 0 || hammerID == 2470000) {
            if (equip.getIuc() >= maxHammers) {
                DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried to use hammer (id %d) an invalid equip (id %d)", chr.getId(), hammerID, equip.getItemId()));
                chr.write(WvsContext.goldHammerItemUpgradeResult(GoldHammerResult.Error, 2, 0));
                chr.dispose();
                return;
            }
            boolean success = Util.succeedProp(vals.getOrDefault(ScrollStat.success, 100));
            if (success || hammerID == 2470000) {
                equip.addStat(iuc, 1); // +1 hammer used
                equip.addStat(tuc, 1); // +1 upgrades available
                equip.updateToChar(chr);
                if (zeroEquip != null) {
                    zeroEquip.addStat(iuc, 1); // +1 hammer used
                    zeroEquip.addStat(tuc, 1); // +1 upgrades available
                    zeroEquip.updateToChar(chr);
                }
                chr.getTimer().addEvent(() -> {
                    chr.write(FieldPacket.closeUI(UIType.UI_ITEMREPLACE));
                    chr.chatPopup("Successfully expanded upgrade slots.");
                }, 2700);
            } else {
                //Wrong Header
                chr.getTimer().addEvent(() -> {
                    chr.write(FieldPacket.closeUI(UIType.UI_ITEMREPLACE));
                    chr.chatPopup("Failed to expand upgrade slots.");
                }, 2700);
                //chr.write(WvsContext.goldHammerItemUpgradeResult(GoldHammerResult.Fail, 1, equip.getIuc()));
            }
            if (zeroEquip != null) {
                chr.write(WvsContext.goldHammerItemUpgradeResult(success ? GoldHammerResult.Success : GoldHammerResult.Fail,success ? 0 : 1, zeroEquip.getIuc()));
            }
            chr.consumeItem(hammer.getItemId(), 1);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.GOLD_HAMMER_COMPLETE)
    public static void handleGoldHammerComplete(Char chr, InPacket inPacket) {
        int returnResult = inPacket.decodeInt();
        int result = inPacket.decodeInt();
        if (returnResult == GoldHammerResult.Success.getVal() || returnResult == GoldHammerResult.Fail.getVal()) {
            //I think its ok to just send back the result given.
            chr.write(WvsContext.goldHammerItemUpgradeResult(GoldHammerResult.Done, result, 0));
        } else {
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d have invalid gold hammer complete returnResult %d",
                    chr.getId(), returnResult));
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_UPGRADE_ASSIST_ITEM_USE_REQUEST)
    public static void handleUserUpgradeAssistItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short uPos = inPacket.decodeShort(); //Use Position
        short ePos = inPacket.decodeShort(); //Eqp Position
        byte bEnchantSkill = inPacket.decodeByte(); //no clue what this means exactly
        Item scroll = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(uPos);
        InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
        if (scroll == null || equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        Equip zeroWeapon = null;
        if (ItemConstants.isLongOrBigSword(equip.getItemId()) && JobConstants.isZero(chr.getJob())) {
            zeroWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(11);
        }
        ItemInfo ii = ItemData.getItemInfoByID(scroll.getItemId());
        if (ii == null) {
            chr.dispose();
            return;
        }
        if (!ii.getReqItemIds().contains(equip.getItemId()) && ii.getReqItemIds().size() > 0) {
            chr.chatMessage(SystemNotice, "Cuôn giây này không dùng trên trang bi này.");
            chr.dispose();
            return;
        }
        int scrollID = scroll.getItemId();
        switch (scrollID) {
            case 2532000: // Safety Scroll
            case 2532001: // Pet Safety Scroll
            case 2532002: // Safety Scroll
            case 2532003: // Safety Scroll
            case 2532004: // Pet Safety Scroll
            case 2532005: // Safety Scroll
                equip.addAttribute(EquipAttribute.UpgradeCountProtection);
                if (zeroWeapon != null) {
                    zeroWeapon.addAttribute(EquipAttribute.UpgradeCountProtection);
                }
                break;
            case 2530000: // Lucky Day
            case 2530001: // Happy-Go-Lucky
            case 2530002: // Lucky Day
            case 2530003: // Pet Lucky Day
            case 2530004: // Lucky Day
            case 2530006: // Pet Lucky Day
                equip.addAttribute(EquipAttribute.LuckyDay);
                if (zeroWeapon != null) {
                    zeroWeapon.addAttribute(EquipAttribute.LuckyDay);
                }
                break;
            case 2531000: // Protection Scroll account only
            case 2531001: // Protection Scroll untradeable
            case 2531004: // Protection Scroll account only
            case 2531005: // Protection Scroll no restriction
            case 2531007: // Protection Scroll untradeable
                equip.addAttribute(EquipAttribute.ProtectionScroll);
                if (zeroWeapon != null) {
                    zeroWeapon.addAttribute(EquipAttribute.ProtectionScroll);
                }
                break;
            case 2533000: // Recovery
            case 2533001: // Pet Guardian
            case 2533002: // Pet Recovery
                equip.addAttribute(EquipAttribute.ScrollProtection);
                if (zeroWeapon != null) {
                    zeroWeapon.addAttribute(EquipAttribute.ScrollProtection);
                }
                break;
            default:
                System.out.println("Unhandled scroll " + scrollID);
                chr.dispose();
                return;
        }
        chr.write(UserLocal.hyperEnchantScrollRegister(true, scrollID, equip.getItemId()));
        equip.updateToChar(chr);
        if (zeroWeapon != null) {
            zeroWeapon.updateToChar(chr);
        }
        chr.consumeItem(scroll, 1);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_UPGRADE_ITEM_USE_REQUEST)
    public static void handleUserUpgradeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short uPos = inPacket.decodeShort(); //Use Position
        short quantity = inPacket.decodeShort();
        short ePos = inPacket.decodeShort(); //Eqp Position
        quantity = inPacket.decodeShort();
        byte bEnchantSkill = inPacket.decodeByte(); //no clue what this means exactly
        Item scroll = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(uPos);
        InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
        Equip zeroWeapon = null;
        if (scroll == null || equip == null || equip.hasSpecialAttribute(EquipSpecialAttribute.Vestige)) {
            chr.chatMessage("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        int scrollID = scroll.getItemId();
        if (ItemConstants.isLongOrBigSword(equip.getItemId()) && JobConstants.isZero(chr.getJob())) {
            zeroWeapon = (Equip) chr.getEquippedInventory().getItemBySlot(11);
        }
        if (equip.getTuc() == 0 && !ItemConstants.isCleanStateScroll(scrollID) && !ItemConstants.isInnocenceScroll(scrollID)) {
            chr.chatMessage("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        }
        if (ItemConstants.isCleanStateScroll(scrollID) && !equip.isLastScrollFail()) {
            chr.chatMessage("Can only be used on equipment when item has failed to be upgraded at lease at 1 time(s).");
            chr.dispose();
            return;
        }
        ItemInfo itemInfo = ItemData.getItemInfoByID(scrollID);
        if (!itemInfo.getReqItemIds().contains(equip.getItemId()) && itemInfo.getReqItemIds().size() > 0) {
            chr.chatMessage("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        }
        boolean success = true;
        boolean boom = false;
        boolean protection = false;
        Map<ScrollStat, Integer> vals = ItemData.getItemInfoByID(scrollID).getScrollStats();
        if (vals.size() > 0) {
            int chance = vals.getOrDefault(ScrollStat.success, 100);
            int boomChance = vals.getOrDefault(ScrollStat.cursed, 0);
            if (!ItemConstants.isCleanStateScroll(scrollID) && !ItemConstants.isInnocenceScroll(scrollID)) {
                if (equip.hasAttribute(EquipAttribute.LuckyDay)) {
                    chance += 10;
                    chr.chatMessage("[Cuộn May Mắn] Bạn sẽ nhận được " + 10 + "% tỷ lệ thành công cuộn cộng thêm cho Hệ thống cuộn.");
                }
                int chanceFromTrait = GameConstants.getScrollSuccessRateByTraitLevel(chr.getTraitLevelByExp(chr.getStat(Stat.craftEXP)));
                if (chanceFromTrait != 0) {
                    chance += chanceFromTrait;
                    chr.chatMessage("[Hệ Thống Đặc Tính] Bạn sẽ nhận được " + chanceFromTrait + "% tỷ lệ thành công cuộn cộng thêm cho Hệ thống cuộn.");
                }
            }
            //Guild Skill Discount
            int guildBonus = 0;
            if (chr.getGuild() != null) {
                GuildSkill guildSkill = chr.getGuild().getSkillById(GuildConstants.ENHANCEMENT_MASTERY);
                SkillInfo skillInfo = SkillData.getSkillInfoById(GuildConstants.ENHANCEMENT_MASTERY);
                if (guildSkill != null && skillInfo != null) {
                    guildBonus = skillInfo.getValue(SkillStat.itemUpgradeBonusR, guildSkill.getLevel());
                    chance += guildBonus;
                    chr.chatMessage("[Kỹ năng Bang Hội] Bạn sẽ nhận được " + guildBonus + "% tỷ lệ cuộn thành công thưởng cho Hệ thống cuộn theo kỹ năng bang hội.");
                }
            }
            protection = equip.hasAttribute(EquipAttribute.ProtectionScroll);
            success = Util.succeedProp(chance);
            if (!success) {
                boom = Util.succeedProp(boomChance);
                if (chr.getGuild() != null && boom) {
                    GuildSkill guildSkill = chr.getGuild().getSkillById(GuildConstants.ITEM_SALVATION);
                    SkillInfo skillInfo = SkillData.getSkillInfoById(GuildConstants.ITEM_SALVATION);
                    if (guildSkill != null && skillInfo != null) {
                        int chanceNoBoom = skillInfo.getValue(SkillStat.itemCursedProtectR, guildSkill.getLevel());
                        chr.chatMessage("[Kỹ năng Bang Hội] Bạn sẽ nhận được " + chanceNoBoom + "% tỷ lệ thành công thưởng để ngăn vật phẩm bị nổ trong Hệ thống cuộn.");
                        if (Util.succeedProp(chanceNoBoom)) {
                            chr.chatMessage("Vật phẩm lẽ ra đã bị nổ, nhưng đã được bảo vệ bởi Kỹ năng Bang Hội.");
                            boom = false;
                        }
                    }
                }
            }
            boolean chaos = vals.containsKey(ScrollStat.randStat);
            if (success && chaos && zeroWeapon != null) {
                boolean noNegative = vals.containsKey(ScrollStat.noNegative);
                int max = vals.containsKey(ScrollStat.incRandVol) ? ItemConstants.INCREDIBLE_RAND_CHAOS_MAX : ItemConstants.RAND_CHAOS_MAX;
                for (EquipBaseStat ebs : ScrollStat.equipBaseStat) {
                    int cur = (int) equip.getBaseStat(ebs);
                    if (cur == 0) {
                        continue;
                    }
                    int randStat = Util.getRandom(max);
                    randStat = !noNegative && Util.succeedProp(50) ? -randStat : randStat;
                    equip.addStat(ebs, randStat);
                    zeroWeapon.addStat(ebs, randStat);
                }
                equip.addStat(EquipBaseStat.tuc, -1);
                zeroWeapon.addStat(EquipBaseStat.tuc, -1);

                equip.addStat(EquipBaseStat.cuc, 1);
                zeroWeapon.addStat(EquipBaseStat.cuc, 1);

                equip.recalcEnchantmentStats();
                zeroWeapon.recalcEnchantmentStats();

                equip.updateToChar(chr);
                zeroWeapon.updateToChar(chr);

                //chr.write(UserPacket.showItemUpgradeEffect(chr.getId(), success, false, scrollID, equip.getItemId(), false));
                //chr.write(FieldPacket.showItemUpgradeEffect(chr.getId(), success, false, scrollID, zeroWeapon.getItemId(), false));
                if (!equip.hasAttribute(EquipAttribute.ScrollProtection) || !zeroWeapon.hasAttribute(EquipAttribute.ScrollProtection)) {
                    chr.consumeItem(scrollID, 1);
                } else {
                    equip.removeAttribute(EquipAttribute.ScrollProtection);
                    if (zeroWeapon != null) {
                        zeroWeapon.removeAttribute(EquipAttribute.ScrollProtection);
                    }
                }
            } else {
                boolean tucProtect = false;
                if (!success && chr.getGuild() != null) {
                    GuildSkill guildSkill = chr.getGuild().getSkillById(GuildConstants.UPGRADE_SALVATION);
                    SkillInfo skillInfo = SkillData.getSkillInfoById(GuildConstants.UPGRADE_SALVATION);
                    if (guildSkill != null && skillInfo != null) {
                        int chanceNoDecreaseTuc = skillInfo.getValue(SkillStat.itemTUCProtectR, guildSkill.getLevel());
                        chr.chatMessage("[Kỹ năng Bang Hội] Bạn sẽ nhận được " + chanceNoDecreaseTuc + "% tỷ lệ thành công thưởng để ngăn số lần cuộn thất bại bị giảm trong Hệ thống cuộn.");
                        tucProtect = Util.succeedProp(chanceNoDecreaseTuc);
                    }
                }
                equip.applyScroll(scroll, chr, success, boom, tucProtect);
                if (zeroWeapon != null) {
                    zeroWeapon.applyScroll(scroll, chr, success, boom, tucProtect);
                }
                if (boom && zeroWeapon != null && !protection) {
                    chr.getScriptManager().startScript(chr, 2400009, "ZeroRefund", ScriptType.Npc);
                }
            }
        }
        chr.write(FieldPacket.scrollTimerEffective());
        equip.saveToSQL();
        if (zeroWeapon != null) {
            zeroWeapon.saveToSQL();
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ITEM_OPTION_UPGRADE_ITEM_USE_REQUEST)
    public static void handleUserItemOptionUpgradeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick

        short nItemUsePosition = inPacket.decodeShort();
        short nEquipPosition = inPacket.decodeShort();

        byte bEnchantSkill = inPacket.decodeByte(); // bool or byte?

        Item scroll = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(nItemUsePosition);
        InvType invType = nEquipPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(nEquipPosition);
        Equip zeroEquip = null; //If Zero slotType will be 11 because 11 r weapon slot and equip r 10.

        if (scroll == null || equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (equip.getItemId() == 1113231) {
            chr.chatPopup("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        } else if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getInventoryByType(invType).getItemBySlot(-11);
            if (zeroEquip == null) {
                chr.chatPopup("Đã xảy ra lỗi không xác định.");
                chr.dispose();
                return;
            }
        } else if (!ItemConstants.canEquipHavePotential(equip)) {
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried to add potential an eligible item (id %d)", chr.getId(), equip.getItemId()));
            chr.dispose();
            return;
        }
        int scrollID = scroll.getItemId();
        ItemInfo itemInfo = ItemData.getItemInfoByID(scrollID);
        if (itemInfo == null) {
            chr.dispose();
            return;
        }
        if (!itemInfo.getReqItemIds().contains(equip.getItemId()) && itemInfo.getReqItemIds().size() > 0) {
            chr.chatPopup("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        }
        Map<ScrollStat, Integer> vals = itemInfo.getScrollStats();
        int chance = vals.getOrDefault(ScrollStat.success, 100);
        int curse = vals.getOrDefault(ScrollStat.cursed, 0);
        boolean success = Util.succeedProp(chance);
        if (success) {
            short val;
            int thirdLineChance = ItemConstants.THIRD_LINE_CHANCE;
            switch (scrollID / 10) {
                // Rare Pot
                case 204940, 204941, 204942, 204943, 204944, 204945, 204946 -> { // Rare pot
                    val = ItemGrade.HiddenRare.getVal();
                    equip.setHiddenOptionBase(val, thirdLineChance);
                }
                case 204970, 204971 -> { // Epic pot
                    val = ItemGrade.HiddenEpic.getVal();
                    equip.setHiddenOptionBase(val, thirdLineChance);
                }
                case 204974, 204975, 204976, 204979 -> { // Unique Pot
                    val = ItemGrade.HiddenUnique.getVal();
                    equip.setHiddenOptionBase(val, thirdLineChance);
                }
                case 204978 -> { // Legendary Pot
                    val = ItemGrade.HiddenLegendary.getVal();
                    equip.setHiddenOptionBase(val, thirdLineChance);
                }
                default -> {
                    System.out.println("Unhandled scroll " + scrollID);
                    chr.dispose();
                    return;
                }
            }
        }
        // Phiên bản này thì không còn hidden nữa.
        boolean base = equip.getOptionBase(0) < 0;
        boolean bonus = equip.getOptionBonus(0) < 0;
        if (base && bonus) {
            equip.releaseOptions(true);
            equip.releaseOptions(false);
        } else {
            equip.releaseOptions(bonus);
        }
        if (zeroEquip != null) {
            zeroEquip.setOptions(equip.getOptions());
            chr.write(UserLocal.hyperEnchantScrollRegister(success, scrollID, zeroEquip.getItemId()));
            chr.write(UserPacket.showItemReleaseEffect(chr.getId(), nEquipPosition, bonus));
            chr.write(UserPacket.showItemReleaseEffect(chr.getId(), (short) -11, bonus));
            zeroEquip.updateToChar(chr);
        }
        chr.write(UserLocal.hyperEnchantScrollRegister(success, scrollID, equip.getItemId()));
        equip.updateToChar(chr);
        if (!equip.hasAttribute(EquipAttribute.ScrollProtection)) {
            chr.consumeItem(scrollID, 1);
        } else {
            equip.removeAttribute(EquipAttribute.ScrollProtection);
            if (zeroEquip != null) {
                zeroEquip.removeAttribute(EquipAttribute.ScrollProtection);
            }
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ITEM_SLOT_EXTEND_ITEM_USE_REQUEST)
    public static void handleUserItemSlotExtendItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        short nItemUsePosition = inPacket.decodeShort();
        short nEquipPosition = inPacket.decodeShort();
        Item stamp = chr.getConsumeInventory().getItemBySlot(nItemUsePosition);
        Equip equip = null;
        Equip zeroEquip = null;
        InvType invType = nEquipPosition < 0 ? EQUIPPED : EQUIP;
        equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(nEquipPosition);
        if (stamp == null || equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        } else if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getInventoryByType(invType).getItemBySlot(-11);
            if (zeroEquip == null) {
                chr.chatPopup("Đã xảy ra lỗi không xác định.");
                chr.dispose();
                return;
            }
        }
        int stampID = stamp.getItemId();
        ItemInfo itemInfo = ItemData.getItemInfoByID(stampID);
        if (itemInfo == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (!itemInfo.getReqItemIds().contains(equip.getItemId()) && itemInfo.getReqItemIds().size() > 0) {
            chr.chatPopup("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        }
        int successChance = itemInfo.getScrollStats().getOrDefault(ScrollStat.success, 100);
        boolean success = Util.succeedProp(successChance);
        if (success) {
            switch (stampID) {
                // Gold Potential Stamp
                case 2049500:
                case 2049501:
                case 2049505:
                case 2049506:
                case 2049507:
                case 2049508:
                case 2049509:
                case 2049510:
                case 2049511:
                case 2049512:
                case 2049514:
                case 2049515:
                case 2049517:
                    equip.setOption(2, equip.getRandomOption(false, 2, ItemConstants.SYSTEM_DEFAULT_CUBE_INDICATOR, ItemConstants.getAdditionalPrimeCountForCube(ItemConstants.SYSTEM_DEFAULT_CUBE_INDICATOR)), false);
                    break;
                default:
                    System.out.println("Unhandled slot extend item " + stampID);
                    chr.dispose();
                    return;
            }
            if (zeroEquip != null) {
                zeroEquip.setOptions(equip.getOptions());
                zeroEquip.updateToChar(chr);
                chr.write(UserLocal.hyperEnchantScrollRegister(true, stampID, equip.getItemId()));
            }
            equip.updateToChar(chr);
        }
        chr.consumeItem(stampID, 1);
        chr.write(UserLocal.itemSlotExtendItemUse(success, stampID, equip.getItemId()));
        //chr.write(UserPacket.showItemUpgradeEffect(chr.getId(), success, false, stampID, equip.getItemId(), false));
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ADDITIONAL_OPT_UPGRADE_ITEM_USE_REQUEST)
    public static void handleUserAdditionalOptUpgradeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short nItemUsePosition = inPacket.decodeShort();
        short nEquipPosition = inPacket.decodeShort();
        byte bEnchantSkill = inPacket.decodeByte();
        Item scroll = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(nItemUsePosition);
        InvType invType = nEquipPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(nEquipPosition);
        Equip zeroEquip = null;
        if (scroll == null || equip == null) {
            chr.dispose();
            return;
        }
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getInventoryByType(invType).getItemBySlot(-11);
            if (zeroEquip == null) {
                chr.dispose();
                return;
            }
        }
        int scrollID = scroll.getItemId();
        if (!ItemConstants.isBonusPotentialScroll(scrollID)) {
            chr.dispose();
            return;
        }
        ItemInfo itemInfo = ItemData.getItemInfoByID(scroll.getItemId());
        if (itemInfo == null) {
            chr.dispose();
            return;
        }
        if (!itemInfo.getReqItemIds().contains(equip.getItemId()) && itemInfo.getReqItemIds().size() > 0) {
            chr.chatPopup("Vật phẩm này không dùng được trên trang bị này.");
            chr.dispose();
            return;
        }
        short val;
        int successChance = itemInfo.getScrollStats().getOrDefault(ScrollStat.success, 100);
        boolean success = Util.succeedProp(successChance);
        if (success) {
            switch (scrollID) {
                case 2048305: // Bonus Pot
                case 2048308:
                case 2048309:
                case 2048310:
                case 2048311:
                case 2048313:
                case 2048314:
                case 2048316:
                case 2048329:
                case 2048307:
                case 2048315:
                case 2048201:
                    val = ItemGrade.HiddenRare.getVal();
                    equip.setHiddenOptionBonus(val);
                    break;
                case 2048306:
                case 2048331:
                    // Special Bonus Pot
                    val = ItemGrade.HiddenRare.getVal();
                    if (!ItemConstants.canEquipHavePotential(equip)) {
                        return;
                    }
                    equip.setOptionBonus(0, -val);
                    equip.setOptionBonus(1, -val);
                    equip.setOptionBonus(2, -val);
                    break;
                default:
                    System.out.println("Unhandled scroll " + scrollID);
                    chr.dispose();
                    return;
            }
        }
        // Phiên bản này thì không còn hidden nữa.
        boolean base = equip.getOptionBase(0) < 0;
        boolean bonus = equip.getOptionBonus(0) < 0;
        if (base && bonus) {
            equip.releaseOptions(true);
            equip.releaseOptions(false);
        } else {
            equip.releaseOptions(bonus);
        }
        if (zeroEquip != null) {
            zeroEquip.setOptions(equip.getOptions());
            //For Scroll Effect of Zero Second Equip.
            chr.write(UserLocal.hyperEnchantScrollRegister(true, scrollID, zeroEquip.getItemId()));
            //For release Option.
            chr.write(UserPacket.showItemReleaseEffect(chr.getId(), nEquipPosition, bonus));
            chr.write(UserPacket.showItemReleaseEffect(chr.getId(), (short) -11, bonus));
            zeroEquip.updateToChar(chr);
        }
        chr.write(UserLocal.hyperEnchantScrollRegister(success, scrollID, equip.getItemId()));
        equip.updateToChar(chr);
        if (!equip.hasAttribute(EquipAttribute.ScrollProtection)) {
            chr.consumeItem(scrollID, 1);
        } else {
            equip.removeAttribute(EquipAttribute.ScrollProtection);
            if (zeroEquip != null) {
                zeroEquip.removeAttribute(EquipAttribute.ScrollProtection);
            }
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ADDITIONAL_SLOT_EXTEND_ITEM_USE_REQUEST)
    public static void handleUserAdditionalSlotExtendItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short nItemUsePosition = inPacket.decodeShort();
        short nEquipPosition = inPacket.decodeShort();
        Item item = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(nItemUsePosition);
        InvType invType = nEquipPosition < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(nEquipPosition);
        Equip zeroEquip = null;
        if (item == null || equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (JobConstants.isZero(chr.getJob()) && ItemConstants.isLongOrBigSword(equip.getItemId())) {
            zeroEquip = (Equip) chr.getInventoryByType(invType).getItemBySlot(-11);
            if (zeroEquip == null) {
                chr.chatPopup("Đã xảy ra lỗi không xác định.");
                chr.dispose();
                return;
            }
        }
        int itemID = item.getItemId();
        if (!ItemConstants.isAdditionalSlotExtendItem(itemID)) {
            String msg = String.format("Character %d tried to use a uncorrected (id %d) on an equip via Use inventory. OPCode : %d", chr.getId(), itemID, InHeader.USER_ADDITIONAL_SLOT_EXTEND_ITEM_USE_REQUEST.getValue());
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, msg);
            chr.dispose();
            return;
        }
        ItemInfo itemInfo = ItemData.getItemInfoByID(itemID);
        if (itemInfo == null) {
            chr.dispose();
            return;
        }
        if (!itemInfo.getReqItemIds().contains(equip.getItemId()) && itemInfo.getReqItemIds().size() > 0) {
            chr.chatMessage(SystemNotice, "Cuôn giây này không dùng trên trang bi này.");
            chr.dispose();
            return;
        }
        if (equip.getOptionBonus(2) != 0) {
            System.out.println("[" + chr.getName() + "] Tried to add 1 additional line of Bonus Potential to an equip without an empty hidden option.");
            chr.chatMessage("You can only use stamp with an equipment with less than 3 Bonus Potential lines.");
            chr.dispose();
            return;
        }
        int successChance = itemInfo.getScrollStats().getOrDefault(ScrollStat.success, 100);
        boolean noCursed = itemInfo.isNoCursed();
        boolean success = Util.succeedProp(successChance);
        if (success) {
            int line = equip.getOptionBonus(1) == 0 ? 1 : 2;
            equip.setOption(line, equip.getRandomOption(true, line, ItemConstants.SYSTEM_DEFAULT_CUBE_INDICATOR, ItemConstants.getAdditionalPrimeCountForCube(ItemConstants.SYSTEM_DEFAULT_CUBE_INDICATOR)), true);
            if (zeroEquip != null) {
                zeroEquip.setOptions(equip.getOptions());
            }
        } else {
            if (!noCursed) {
                if (!equip.hasAttribute(EquipAttribute.ProtectionScroll)) {
                    chr.consumeItem(equip);
                    if (zeroEquip != null) {
                        chr.consumeItem(zeroEquip);
                    }
                }
            }
        }
        if (zeroEquip != null) {
            zeroEquip.updateToChar(chr);
        }
        chr.write(UserLocal.itemSlotExtendItemUse(success, item.getItemId(), equip.getItemId()));
        equip.updateToChar(chr);
        chr.consumeItem(itemID, 1);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ITEM_RELEASE_REQUEST)
    public static void handleUserItemReleaseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short uPos = inPacket.decodeShort();
        short ePos = inPacket.decodeShort();
        Item item = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(uPos); // old system with magnifying glasses
        InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
        if (equip == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            return;
        }
        long cost = ItemConstants.getMesoCubingCost(equip.getrLevel());
        if (chr.getMoney() < cost) {
            chr.chatPopup("You don't have enough Meso.");
            return;
        }
        boolean base = equip.getOptionBase(0) < 0;
        boolean bonus = equip.getOptionBonus(0) < 0;
        if (base && bonus) {
            equip.releaseOptions(true);
            equip.releaseOptions(false);
        } else {
            equip.releaseOptions(bonus);
        }
        chr.write(UserPacket.showItemReleaseEffect(chr.getId(), ePos, bonus));
        equip.updateToChar(chr);
        chr.deductMoney(cost);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_MIRACLE_CIRCULATOR_OPTION_REQUEST)
    public static void handleUserMiracleCirculatorOptionRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // crc
        byte type = inPacket.decodeByte();
        if (chr.getCharacterPotentialValueHolder() == null) {
            return;
        }
        if (type == 1) {
            for (CharacterPotential cp : chr.getPotentialsByPreset(type)) {
                CharacterPotentialValueHolder newCP = chr.getCharacterPotentialValueHolder(cp.getKey());
                if (newCP != null) {
                    cp.setSkillID(newCP.getSkillID());
                    cp.setSlv(newCP.getSlv());
                    cp.setGrade(newCP.getGrade());
                    chr.write(WvsContext.characterPotentialSet(chr, true, true, type));
                }
            }
        }
    }

    @Handler(op = InHeader.USER_TOADS_HAMMER_REQUEST)
    public static void handleUserToadsHammerRequest(Char chr, InPacket inPacket) {
        int type = inPacket.decodeShort();
        short fromPos = inPacket.decodeShort(); // extraction target
        short toPos = inPacket.decodeShort(); // transfer target
        Item fromItem = chr.getEquipInventory().getItemBySlot(fromPos);
        Item toItem = chr.getEquipInventory().getItemBySlot(toPos);
        if (type == 1) {
            if (chr.getLevel() < 40) {
                chr.chatPopup("Only Lv. 40+ characters to use Transfer Hammers.");
                return;
            }
            if (fromItem == null) {
                fromItem = chr.getEquippedInventory().getItemBySlot(fromPos);
            }
            if (toItem == null) {
                toItem = chr.getEquippedInventory().getItemBySlot(fromPos);
            }
            if (fromItem == null || toItem == null) {
                chr.chatPopup("Không tìm thấy trang bị");
                return;
            }
            if (!(fromItem instanceof Equip fromEquip) || !(toItem instanceof Equip toEquip)) {
                chr.chatPopup("Không tìm thấy trang bị");
                return;
            }
            int prefixFrom = ItemConstants.getItemPrefix(fromEquip.getItemId());
            int prefixTo = ItemConstants.getItemPrefix(toItem.getItemId());
            if (prefixFrom != prefixTo) {
                chr.chatPopup("Trang bị phải cùng loại.");
                return;
            }
            if (fromEquip.getChuc() < 1) {
                chr.chatPopup("Trang bị phải có ít nhất 1 lần nâng cấp Star Force để có thể sử dụng được các khả năng của nó.");
                return;
            }
            short oldChuc = toEquip.getChuc();
            short newChuc = (short) (fromEquip.getChuc() - 1);
            toEquip.setChuc(newChuc, true);
            toEquip.setOptions(fromEquip.getOptions());
            toEquip.setSoulItemId(fromEquip.getSoulItemId());
            toEquip.setSoulOptionId(fromEquip.getSoulOptionId());
            toEquip.setSoulSocketId(fromEquip.getSoulSocketId());
            toEquip.setSoulOption(fromEquip.getSoulOption());
            Equip.notifyUnionChuc(chr, toEquip, oldChuc, newChuc);
            toEquip.updateToChar(chr);
            chr.consumeItem(fromItem);
            if (EventConstants.HYPER_BURNING_MAX && toItem.getItemId() == 1122445 && chr.hasQuest(102443)) {
                chr.createQuestWithQRValue(102443, "star=7;step=2;toad=1");
            }
            chr.write(WvsContext.receiveToadsHammerRequestResult(type, fromItem, toItem));
        }
    }

    @Handler(op = InHeader.USER_TOADS_HAMMER_HELP_REQUEST)
    public static void handleUserToadsHammerHelpRequest(Char chr, InPacket inPacket) {
        chr.write(UserLocal.openUrl("https://maplestory.nexon.net/micro-site/64462"));
    }

    @Handler(op = InHeader.USER_LUCKY_ITEM_USE_REQUEST)
    public static void handleUserLuckyItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        short uPos = inPacket.decodeShort();
        Item scroll = chr.getConsumeInventory().getItemBySlot(uPos);
        if (scroll == null) {
            return;
        }
        // nItemID / 100 == 20489;
        ItemInfo scrollInfo = ItemData.getItemInfoByID(scroll.getItemId());
        if (scrollInfo == null) {
            chr.dispose();
            return;
        }
        int setId = scrollInfo.getScrollStats().getOrDefault(ScrollStat.setItemCategory, 0);
        boolean success = Util.succeedProp(scrollInfo.getScrollStats().getOrDefault(ScrollStat.success, 100));
        if (setId != 0 && success) {
            if (chr.hasQuestInProgress(QuestConstants.ZERO_SET_QUEST) || chr.hasQuestCompleted(QuestConstants.ZERO_SET_QUEST)) {
                chr.removeQuest(QuestConstants.ZERO_SET_QUEST);
            }
            Quest q = QuestData.createQuestFromId(QuestConstants.ZERO_SET_QUEST, chr.getId());
            q.setQrValue(String.valueOf(setId));
            chr.addQuest(q);
        }
        chr.write(UserPacket.showItemLuckyItemEffect(chr.getId(), success, scroll.getItemId()));
        chr.consumeItem(scroll.getItemId(), 1);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_HYPER_UPGRADE_ITEM_USE_REQUEST)
    public static void handleUserHyperUpgradeItemUseRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); //tick
        short uPos = inPacket.decodeShort(); //Use Position
        short ePos = inPacket.decodeShort(); //Eqp Position
        byte bEnchantSkill = inPacket.decodeByte(); //no clue what this means exactly
        Item scroll = chr.getInventoryByType(InvType.CONSUME).getItemBySlot(uPos);
        InvType invType = ePos < 0 ? EQUIPPED : EQUIP;
        Equip equip = (Equip) chr.getInventoryByType(invType).getItemBySlot(ePos);
        if (scroll == null || equip == null || equip.hasSpecialAttribute(EquipSpecialAttribute.Vestige)) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            chr.dispose();
            return;
        }
        ItemInfo scrollInfo = ItemData.getItemInfoByID(scroll.getItemId());
        if (scrollInfo == null) {
            chr.dispose();
            return;
        }
        if (!ItemConstants.isUpgradable(equip.getItemId())
                || equip.getTuc() != 0
                || equip.getChuc() > 0
                || equip.hasSpecialAttribute(EquipSpecialAttribute.Vestige)) {
            chr.chatMessage(SystemNotice, "Equipment cannot be enhanced.");
            chr.dispose();
            return;
        }
        boolean success = true;
        boolean boom = false;
        Map<ScrollStat, Integer> vals = scrollInfo.getScrollStats();
        if (vals.size() > 0) {
            int rLevel = equip.getrLevel() + equip.getiIncReq();
            int forceUpgrade = vals.getOrDefault(ScrollStat.forceUpgrade, 0);
            int curse = vals.getOrDefault(ScrollStat.cursed, 0);
            if (equip.isSuperiorEqp() && rLevel <= 94 && forceUpgrade > 3) {
                chr.chatMessage(SystemNotice, "Unabled to use enchancement scroll on superior equip.");
                chr.dispose();
                return;
            }
            success = Util.succeedProp(vals.getOrDefault(ScrollStat.success, 100));
            if (success) {
                equip.setChuc((short) forceUpgrade, true);
            } else {
                if (curse > 0) {
                    boom = Util.succeedProp(curse);
                    if (boom) {
                        if (!equip.hasAttribute(EquipAttribute.ProtectionScroll)) {
                            chr.consumeItem(equip);
                        } else {
                            equip.removeAttribute(EquipAttribute.ProtectionScroll);
                        }
                    }
                }
            }
            chr.write(UserLocal.hyperEnchantScrollRegister(success, scroll.getItemId(), equip.getItemId()));
            if (!boom) {
                equip.recalcEnchantmentStats();
                equip.updateToChar(chr);
            }
            if (!equip.hasAttribute(EquipAttribute.ScrollProtection)) {
                chr.consumeItem(scroll.getItemId(), 1);
            } else {
                equip.removeAttribute(EquipAttribute.ScrollProtection);
            }
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_REQUEST_JEWEL_CRAFT)
    public static void handleUserRequestJewelCraft(Char chr, InPacket inPacket) {
        if (chr == null) return;
        inPacket.decodeInt(); //tick
        short ePos = inPacket.decodeShort(); //Eqp Position
        short uPos = inPacket.decodeShort(); //Use Position
        boolean isFuseJewel = inPacket.decodeByte() != 0;
        if (isFuseJewel) {
            if (chr.getInventoryByType(ETC).isFull()) {
                chr.chatPopup("Your inventory is full.");
                chr.dispose();
                return;
            }
            Item jewel1 = chr.getInventoryByType(ETC).getItemBySlot(uPos);
            Item jewel2 = chr.getInventoryByType(ETC).getItemBySlot(ePos);
            if (jewel1 == null || jewel2 == null) {
                chr.chatPopup("Something was wrong. Please try again later.");
                chr.dispose();
                return;
            }
            if (ePos == uPos && !chr.hasItemCount(jewel1.getItemId(), 2)) {
                chr.chatPopup("Something was wrong. Please try again later.");
                chr.dispose();
                return;
            }
            if (jewel1.getItemId() != jewel2.getItemId()) {
                chr.chatPopup("Something was wrong. Please try again later.");
                chr.dispose();
                return;
            }
            if (jewel1.getItemId() == 4440001 || jewel1.getItemId() == 4441001 || jewel1.getItemId() == 4442001 || jewel1.getItemId() == 4443001) {
                chr.chatPopup("Jewel is maxed.");
                chr.dispose();
                return;
            }
            int money = 0;
            if (jewel1.getItemId() == 4440300 || jewel1.getItemId() == 4441300 || jewel1.getItemId() == 4442300 || jewel1.getItemId() == 4443300) {
                money = 50000;
            } else if (jewel1.getItemId() == 4440200 || jewel1.getItemId() == 4441200 || jewel1.getItemId() == 4442200 || jewel1.getItemId() == 4443200) {
                money = 100000;
            } else if (jewel1.getItemId() == 4440101 || jewel1.getItemId() == 4441101 || jewel1.getItemId() == 4442101 || jewel1.getItemId() == 4443101) {
                money = 200000;
            }
            if (chr.getMoney() < money) {
                chr.chatPopup("Make sure you have enough money.");
                chr.dispose();
                return;
            }
            chr.deductMoney(money);
            chr.consumeItem(jewel1, 1);
            chr.consumeItem(jewel2, 1);
            switch (jewel1.getItemId()) {
                case 4440300 -> //Mighty Jewel C
                        chr.addItemToInventory(4440200, 1);
                case 4440200 -> //Mighty Jewel B
                        chr.addItemToInventory(4440101, 1);
                case 4440101 -> //Mighty Jewel A
                        chr.addItemToInventory(4440001, 1);

                case 4441300 -> //Lucky Jewel C
                        chr.addItemToInventory(4441200, 1);
                case 4441200 -> //Lucky Jewel B
                        chr.addItemToInventory(4441101, 1);
                case 4441101 -> //Lucky Jewel A
                        chr.addItemToInventory(4441001, 1);

                case 4442300 -> //Keen Jewel C
                        chr.addItemToInventory(4442200, 1);
                case 4442200 -> //Keen Jewel B
                        chr.addItemToInventory(4442101, 1);
                case 4442101 -> //Keen Jewel A
                        chr.addItemToInventory(4442001, 1);

                case 4443300 -> //Nimble Jewel C
                        chr.addItemToInventory(4443200, 1);
                case 4443200 -> //Nimble Jewel B
                        chr.addItemToInventory(4443101, 1);
                case 4443101 -> //Nimble Jewel A
                        chr.addItemToInventory(4443001, 1);
            }
        } else {
            Equip equip = (Equip) chr.getInventoryByType(InvType.EQUIP).getItemBySlot(ePos);
            Item jewel = chr.getInventoryByType(ETC).getItemBySlot(uPos);
            if (equip == null || jewel == null) {
                chr.chatPopup("Something was wrong. Please try again later.");
                chr.dispose();
                return;
            }
            if (chr.getInventoryByType(EQUIP).isFull()) {
                chr.chatPopup("Your inventory is full.");
                chr.dispose();
                return;
            }
            //Jewel Craft Ring
            if (equip.getItemId() != 1112762) {
                chr.chatPopup("Something was wrong. Please try again later.");
                chr.dispose();
                return;
            }
            chr.consumeItem(equip);
            chr.consumeItem(jewel, 1);
            switch (jewel.getItemId()) {
                case 4440300 -> //Mighty Jewel C
                        chr.addItemToInventory(1112766, 1);
                case 4440200 -> //Mighty Jewel B
                        chr.addItemToInventory(1112765, 1);
                case 4440101 -> //Mighty Jewel A
                        chr.addItemToInventory(1112764, 1);
                case 4440001 -> //Strong Jewel S
                        chr.addItemToInventory(1112763, 1);

                case 4441300 -> //Lucky Jewel C
                        chr.addItemToInventory(1112770, 1);
                case 4441200 -> //Lucky Jewel B
                        chr.addItemToInventory(1112769, 1);
                case 4441101 -> //Lucky Jewel A
                        chr.addItemToInventory(1112768, 1);
                case 4441001 -> //Lucky Jewel S
                        chr.addItemToInventory(1112767, 1);

                case 4442300 -> //Keen Jewel C
                        chr.addItemToInventory(1112774, 1);
                case 4442200 -> //Keen Jewel B
                        chr.addItemToInventory(1112773, 1);
                case 4442101 -> //Keen Jewel A
                        chr.addItemToInventory(1112772, 1);
                case 4442001 -> //Keen Jewel S
                        chr.addItemToInventory(1112771, 1);

                case 4443300 -> //Nimble Jewel C
                        chr.addItemToInventory(1112778, 1);
                case 4443200 -> //Nimble Jewel B
                        chr.addItemToInventory(1112777, 1);
                case 4443101 -> //Nimble Jewel A
                        chr.addItemToInventory(1112776, 1);
                case 4443001 -> //Nimble Jewel S
                        chr.addItemToInventory(1112775, 1);
            }
        }
        chr.write(FieldPacket.closeUI(104));
        chr.write(FieldPacket.openUI(104));
        chr.dispose();
    }
}
