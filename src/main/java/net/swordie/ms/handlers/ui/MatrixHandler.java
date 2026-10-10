package net.swordie.ms.handlers.ui;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.matrix.MatrixCore;
import net.swordie.ms.client.character.skills.matrix.MatrixSlot;
import net.swordie.ms.client.character.skills.matrix.NodeEnhance;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.MatrixConstants;
import net.swordie.ms.enums.MatrixStateType;
import net.swordie.ms.enums.MatrixUpdateType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.Etc.VCore.VCore;
import net.swordie.ms.loaders.Etc.VCore.VCoreData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.Randomizer;

import java.util.*;

public class MatrixHandler {

    // Max level a V skill can get from its node (VMatrixOption.img gradeMax) / from boost nodes (totalGradeMax)
    private static final int SKILL_NODE_LEVEL_MAX = MatrixConstants.GRADE_MAX;
    private static final int BOOST_NODE_LEVEL_MAX = MatrixConstants.TOTAL_GRADE_MAX;
    // Max bonus from slot enhancement: one slot for a skill node, up to two slots for a boost skill (2 boost nodes)
    private static final int SKILL_SLOT_BONUS_MAX = MatrixConstants.EQUIP_SLOT_ENHANCE_MAX;
    private static final int BOOST_SLOT_BONUS_MAX = MatrixConstants.EQUIP_SLOT_ENHANCE_MAX * 2;
    // VMatrixOption.img craftCompleteEnchantVCoreCost
    private static final int CRAFT_CUSTOM_BOOST_CORE_COST = 500;
    // Slot expansion can only be bought up to 10 levels ahead
    private static final int SLOT_EXPAND_MAX_LEVEL_GAP = 10;

    @Handler(op = InHeader.NODE_STONE_CRAFTING)
    public static void handleNodeStoneCrafting(Char chr, InPacket inPacket) {
        chr.getScriptManager().startScript(chr, 0, 0, "Craft_NodeStone", ScriptType.Npc);
    }

    @Handler(op = InHeader.UPDATE_MATRIX)
    public static void handleUpdateMatrix(Char chr, InPacket inPacket) {
        List<MatrixCore> sortedMatrixCores = chr.getSortedMatrixCores();
        MatrixCore core;
        MatrixSlot slot;
        int action = inPacket.decodeInt();
        MatrixUpdateType type = MatrixUpdateType.getUpdateTypeByVal(action);
        if (type == null) {
            chr.dispose();
            return;
        }
        switch (type) {
            case Activate: {
                int nodeId = inPacket.decodeInt();
                int otherNodeId = inPacket.decodeInt(); // if there's a node already on the Position
                int otherNodeId_toPos = inPacket.decodeInt(); // toPosition of the nodeID that will be force moved
                int pos = inPacket.decodeInt();
                boolean byDrag = inPacket.decodeByte() != 0;
                core = getCoreByIndex(sortedMatrixCores, nodeId);
                if (!isUsable(core)) {
                    chr.dispose();
                    return;
                }
                VCoreData coreData = VCore.getCore(core.getCoreID());
                if (coreData == null || coreData.getType() == VCore.EXP) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể gắn node này.");
                    chr.dispose();
                    return;
                }
                if (!byDrag && pos < 0) {
                    pos = getFirstOpenSlot(chr); // Check  Locked Slots
                }
                if (!isSlotAvailable(chr, pos)) {
                    chr.chatMessage("You have no empty node slots.");
                    chr.dispose();
                    return;
                }
                slot = chr.getMatrixSlotByPosition(pos);
                if (slot == null) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể gắn node này.");
                    chr.dispose();
                    return;
                }
                if (core.isActive() && core.getSlot() == pos) {
                    chr.dispose();
                    return;
                }
                // The node that currently occupies the target position (server side truth, not the client index)
                MatrixCore occupant = chr.getMatrixCoreByPosition(pos);
                if (occupant == core || (occupant != null && !occupant.isActive())) {
                    occupant = null;
                }
                if (occupant != null && occupant.isLock()) {
                    chr.dispose();
                    return;
                }
                // Where the occupant goes: the old slot of the dragged node (swap), the client requested slot, or unequipped
                int occupantNewSlot = -1;
                if (occupant != null) {
                    if (core.isActive()) {
                        occupantNewSlot = core.getSlot();
                    } else if (otherNodeId_toPos >= 0 && otherNodeId_toPos != pos && isSlotAvailable(chr, otherNodeId_toPos)
                            && chr.getMatrixCoreByPosition(otherNodeId_toPos) == null) {
                        occupantNewSlot = otherNodeId_toPos;
                    }
                }
                String conflict = getActivationConflict(chr, core, coreData, occupantNewSlot < 0 ? occupant : null);
                if (conflict != null) {
                    chr.chatPopup(conflict);
                    chr.dispose();
                    return;
                }
                Set<Integer> touched = new HashSet<>(getCoreSkillIds(core));
                if (occupant != null) {
                    touched.addAll(getCoreSkillIds(occupant));
                    if (occupantNewSlot >= 0) {
                        occupant.setState(MatrixStateType.ACTIVE);
                        occupant.setSlot(occupantNewSlot);
                    } else {
                        occupant.setState(MatrixStateType.INACTIVE);
                        occupant.setSlot(-1);
                    }
                    occupant.saveToSQL();
                }
                core.setState(MatrixStateType.ACTIVE);
                core.setSlot(pos);
                core.saveToSQL();
                recalcMatrixSkills(chr, touched);
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), nodeId));
                break;
            }
            case Deactivate: {
                int nodeId = inPacket.decodeInt();
                int pos = inPacket.decodeInt();
                core = getCoreByIndex(sortedMatrixCores, nodeId);
                if (!isUsable(core)) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể tháo node này.");
                    chr.dispose();
                    return;
                }
                if (core.isLock()) {
                    chr.dispose();
                    return;
                }
                if (!core.isActive() || core.getState() == MatrixStateType.INACTIVE) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể tháo node này.");
                } else {
                    core.setState(MatrixStateType.INACTIVE);
                    core.setSlot(-1);
                    core.saveToSQL();
                    recalcMatrixSkills(chr, getCoreSkillIds(core));
                }
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), nodeId));
                break;
            }
            case Swap: {
                int switcherId = inPacket.decodeInt(); // the main node that is dragged
                int switchedId = inPacket.decodeInt(); // one that is automatically swapped as well
                int fromPos = inPacket.decodeInt();
                int toPos = inPacket.decodeInt();
                MatrixCore mc = getCoreByIndex(sortedMatrixCores, switcherId);
                if (!isUsable(mc) || !mc.isActive() || !isSlotAvailable(chr, toPos) || mc.getSlot() == toPos) {
                    chr.dispose();
                    return;
                }
                if (mc.isLock()) {
                    chr.dispose();
                    return;
                }
                // node currently at the destination (server side truth) takes the old position of the dragged node
                MatrixCore otherCore = chr.getMatrixCoreByPosition(toPos);
                if (otherCore != null && otherCore != mc && otherCore.isActive()) {
                    if (otherCore.isLock()) {
                        chr.dispose();
                        return;
                    }
                    otherCore.setSlot(mc.getSlot());
                    otherCore.saveToSQL();
                } else {
                    otherCore = null;
                }
                mc.setSlot(toPos);
                mc.saveToSQL();
                Set<Integer> touched = new HashSet<>(getCoreSkillIds(mc));
                if (otherCore != null) {
                    touched.addAll(getCoreSkillIds(otherCore));
                }
                recalcMatrixSkills(chr, touched);
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), switcherId));
                break;
            }
            case Enhance: {
                int nodeId = inPacket.decodeInt();
                int size = inPacket.decodeInt();
                List<Integer> fodderIds = new ArrayList<>();
                for (int i = 0; i < size; i++) {
                    fodderIds.add(inPacket.decodeInt());
                }
                core = getCoreByIndex(sortedMatrixCores, nodeId);
                if (!isUsable(core)) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể nâng cấp node này.");
                    chr.dispose();
                    return;
                }
                NodeEnhance enhance = enhanceCore(chr, sortedMatrixCores, nodeId, core, fodderIds);
                if (enhance == null) {
                    chr.chatPopup("[Lỗi không xác định]\r\nVui lòng thử lại.");
                    chr.dispose();
                    return;
                }
                chr.write(WvsContext.nodeEnhanceResult(enhance));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), -1));
                break;
            }
            case EnhanceAll: {
                int size0 = inPacket.decodeInt();
                int unk = inPacket.decodeInt();
                List<NodeEnhance> enhances = new ArrayList<>(Math.max(0, Math.min(size0, 64)));
                for (int x = 0; x < size0; x++) {
                    int nodeId = inPacket.decodeInt();
                    int size = inPacket.decodeInt();
                    List<Integer> fodderIds = new ArrayList<>();
                    for (int i = 0; i < size; i++) {
                        fodderIds.add(inPacket.decodeInt());
                    }
                    core = getCoreByIndex(sortedMatrixCores, nodeId);
                    if (!isUsable(core)) {
                        continue;
                    }
                    NodeEnhance enhance = enhanceCore(chr, sortedMatrixCores, nodeId, core, fodderIds);
                    if (enhance != null) {
                        enhances.add(enhance);
                    }
                }
                chr.write(WvsContext.nodeEnhanceResultInBulk(enhances));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
            case Disassemble: {
                int nodeId = inPacket.decodeInt();
                core = getCoreByIndex(sortedMatrixCores, nodeId);
                // equipped, locked or already disassembled nodes can't be disassembled
                if (!isUsable(core) || core.isActive() || core.isLock()) {
                    chr.dispose();
                    return;
                }
                int shards = getExtractShards(core);
                disassemble(core);
                gainNodeShards(chr, shards);
                chr.write(WvsContext.nodeShardResult(shards));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
            case DisassembleGroup: {
                int size = inPacket.decodeInt();
                Set<MatrixCore> removeCores = new LinkedHashSet<>();
                int shards = 0;
                for (int i = 0; i < size; i++) {
                    int nodeId = inPacket.decodeInt();
                    core = getCoreByIndex(sortedMatrixCores, nodeId);
                    if (!isUsable(core) || core.isActive() || core.isLock()) {
                        continue;
                    }
                    if (removeCores.add(core)) {
                        shards += getExtractShards(core);
                    }
                }
                for (MatrixCore remove : removeCores) {
                    disassemble(remove);
                }
                gainNodeShards(chr, shards);
                chr.write(WvsContext.nodeShardResult(shards));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
            case CraftNode: {
                int nodeId = inPacket.decodeInt();
                int nCount = inPacket.decodeInt();
                VCoreData vCoreData = VCore.getCore(nodeId);
                int unitCost = getNodeShardsCost(nodeId);
                if (vCoreData == null || unitCost <= 0 || nCount <= 0 || nCount > MatrixConstants.SLOT_MAX) {
                    chr.dispose();
                    return;
                }
                long cost = (long) unitCost * nCount;
                if (chr.getAvatarData().getCharacterStat().getNodeShards() < cost) {
                    chr.chatPopup("Bạn không đủ Node Shards để chế tạo node này.");
                    chr.dispose();
                    return;
                }
                if (getUsableCoreCount(chr) + nCount > MatrixConstants.SLOT_MAX) {
                    chr.chatPopup(String.format("Kho node của bạn đã đầy (tối đa %d).", MatrixConstants.SLOT_MAX));
                    chr.dispose();
                    return;
                }
                int skillID1 = vCoreData.getConnectSkills().isEmpty() ? 0 : vCoreData.getConnectSkills().get(0);
                List<Integer> boostPool = null;
                if (vCoreData.getType() == VCore.BOOST) {
                    boostPool = getBoostSkillPool(vCoreData);
                    boostPool.remove((Integer) skillID1);
                    if (boostPool.size() < 2) {
                        chr.chatPopup("[Lỗi không xác định]\r\nKhông thể chế tạo node này.");
                        chr.dispose();
                        return;
                    }
                }
                List<MatrixCore> cores = new ArrayList<>(nCount);
                int skillID2 = 0, skillID3 = 0;
                for (int i = 0; i < nCount; i++) {
                    if (boostPool != null) {
                        // every crafted boost node rolls its own secondary skills
                        List<Integer> pool = new ArrayList<>(boostPool);
                        skillID2 = pool.remove(Randomizer.nextInt(pool.size()));
                        skillID3 = pool.remove(Randomizer.nextInt(pool.size()));
                    }
                    cores.add(new MatrixCore(chr.getId(), nodeId, skillID1, skillID2, skillID3));
                }
                MatrixCore.saveToSQL(cores);
                chr.getMatrixCore().addAll(cores);
                gainNodeShards(chr, (int) -cost);
                chr.write(WvsContext.nodeCraftResult(nodeId, 1, skillID1, skillID2, skillID3));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
            case CraftNodestone: {
                chr.getScriptManager().startScript(chr, 0, 0, "Craft_NodeStone", ScriptType.Npc);
                break;
            }
            case CraftCustomBoostNode: {
                int coreID = inPacket.decodeInt();
                int skillID2 = inPacket.decodeInt();
                int skillID3 = inPacket.decodeInt();
                VCoreData vCoreData = VCore.getCore(coreID);
                if (vCoreData == null || vCoreData.getType() != VCore.BOOST || vCoreData.getConnectSkills().isEmpty()) {
                    chr.dispose();
                    return;
                }
                int skillID1 = vCoreData.getConnectSkills().get(0);
                List<Integer> pool = getBoostSkillPool(vCoreData);
                if (skillID2 == skillID3 || skillID2 == skillID1 || skillID3 == skillID1
                        || !pool.contains(skillID2) || !pool.contains(skillID3)) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể chế tạo node này.");
                    chr.dispose();
                    return;
                }
                if (chr.getAvatarData().getCharacterStat().getNodeShards() < CRAFT_CUSTOM_BOOST_CORE_COST) {
                    chr.chatPopup("Bạn không đủ Node Shards để chế tạo node này.");
                    chr.dispose();
                    return;
                }
                if (getUsableCoreCount(chr) + 1 > MatrixConstants.SLOT_MAX) {
                    chr.chatPopup(String.format("Kho node của bạn đã đầy (tối đa %d).", MatrixConstants.SLOT_MAX));
                    chr.dispose();
                    return;
                }
                core = new MatrixCore(chr.getId(), coreID, skillID1, skillID2, skillID3);
                core.saveToSQL();
                chr.getMatrixCore().add(core);
                gainNodeShards(chr, -CRAFT_CUSTOM_BOOST_CORE_COST);
                chr.write(WvsContext.nodeCraftResult(coreID, 1, skillID1, skillID2, skillID3));
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
            case EnhanceSlot: {
                int slotPos = inPacket.decodeInt();
                if (isSlotAvailable(chr, slotPos) && chr.getAvailableMatrixPoints() > 0) {
                    slot = chr.getMatrixSlotByPosition(slotPos);
                    if (slot == null) {
                        chr.dispose();
                        return;
                    }
                    if (slot.getLevel() < MatrixConstants.EQUIP_SLOT_ENHANCE_MAX) {
                        slot.setLevel(slot.getLevel() + 1);
                        slot.saveToSQL();
                        core = chr.getMatrixCoreByPosition(slotPos);
                        if (core != null && core.isActive()) {
                            recalcMatrixSkills(chr, getCoreSkillIds(core));
                        }
                    }
                }
                chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
                break;
            }
            case ExpandSlot: {
                int slotPos = inPacket.decodeInt();
                inPacket.decodeInt(); // Always -1
                slot = chr.getMatrixSlotByPosition(slotPos);
                if (slot == null) {
                    chr.chatPopup("[Lỗi không xác định]\r\nKhông thể mở rộng vị trí này.");
                    chr.dispose();
                    return;
                }
                int nReqLevel = MatrixConstants.REQ_LV_BY_MATRIX_SLOT_POS[slotPos];
                int nLevelGap = nReqLevel - chr.getLevel();
                if (slot.isUnLock() || nLevelGap <= 0) {
                    chr.chatPopup("Vị trí này đã được mở.");
                    chr.dispose();
                    return;
                }
                if (nLevelGap > SLOT_EXPAND_MAX_LEVEL_GAP) {
                    chr.chatPopup(String.format("Bạn chỉ có thể mở trước vị trí yêu cầu tối đa %d cấp.", SLOT_EXPAND_MAX_LEVEL_GAP));
                    chr.dispose();
                    return;
                }
                // slots must be expanded in order
                for (int p = 0; p < slotPos; p++) {
                    if (!isSlotAvailable(chr, p)) {
                        chr.chatPopup("Bạn cần mở các vị trí phía trước trước.");
                        chr.dispose();
                        return;
                    }
                }
                int[] aSlotPrice = {0, 0, 0, 0, 25900000, 30800000, 36400000, 43400000, 51800000, 60900000, 72100000,
                        85400000, 101500000, 119700000, 142100000, 168000000, 198800000, 235200000, 278600000};
                double dSlotOneMultiplier = 1.0;
                double dSlotTwoMultiplier = 3.7029;
                switch (nLevelGap) {
                    case 1:
                        dSlotOneMultiplier = 1.0;
                        break;
                    case 2:
                        dSlotOneMultiplier = 1.3656;
                        break;
                    case 3:
                        dSlotOneMultiplier = 1.8042;
                        break;
                    case 4:
                        dSlotOneMultiplier = 2.3307;
                        break;
                    case 5:
                        dSlotOneMultiplier = 2.9624;
                        break;
                    case 6:
                        dSlotTwoMultiplier = 3.7029;
                        break;
                    case 7:
                        dSlotTwoMultiplier = 4.6285;
                        break;
                    case 8:
                        dSlotTwoMultiplier = 5.7857;
                        break;
                    case 9:
                        dSlotTwoMultiplier = 7.2321;
                        break;
                    case 10:
                        dSlotTwoMultiplier = 9.0401;
                        break;
                }
                // price index 4 = first expandable slot (the first slot that requires more than Lv.200)
                int priceIdx = Math.max(4, Math.min(aSlotPrice.length - 1, 4 + (slotPos - getFirstExpandableSlot())));
                long price = (long) (aSlotPrice[priceIdx] * (nLevelGap <= 5 ? dSlotOneMultiplier : dSlotTwoMultiplier));
                if (chr.getMoney() < price) {
                    chr.chatPopup("Bạn không đủ tiền meso để mở khoá vị trí này.");
                    chr.dispose();
                    return;
                }
                chr.deductMoney(price);
                slot.setUnLock(true);
                slot.saveToSQL();
                chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
                break;
            }
            case EnhanceReset: {
                if (chr.getMoney() < MatrixConstants.MATRIX_POINT_RESET_MESO) {
                    chr.chatPopup("Bạn không đủ tiền meso để tái thiết lập lại các vị trí.");
                    chr.dispose();
                    return;
                }
                Set<Integer> touched = new HashSet<>();
                for (int pos = 0; pos < MatrixConstants.MAX_NODE_SLOTS; pos++) {
                    MatrixSlot ms = chr.getMatrixSlotByPosition(pos);
                    if (ms != null && ms.getLevel() > 0) {
                        ms.setLevel(0);
                        ms.saveToSQL();
                        core = chr.getMatrixCoreByPosition(pos);
                        if (core != null && core.isActive()) {
                            touched.addAll(getCoreSkillIds(core));
                        }
                    }
                }
                recalcMatrixSkills(chr, touched);
                chr.deductMoney(MatrixConstants.MATRIX_POINT_RESET_MESO);
                chr.write(WvsContext.updateVMatrix(chr, false, 0, 0));
                break;
            }
            case Lock:
            case Unlock: {
                int slotPos = inPacket.decodeInt();
                core = getCoreByIndex(sortedMatrixCores, slotPos);
                if (isUsable(core)) {
                    core.setLock(type == MatrixUpdateType.Lock);
                    core.saveToSQL();
                }
                chr.write(WvsContext.updateVMatrix(chr, true, type.getVal(), 0));
                break;
            }
        }
        chr.dispose();
    }

    private static MatrixCore getCoreByIndex(List<MatrixCore> sortedMatrixCores, int index) {
        return index >= 0 && index < sortedMatrixCores.size() ? sortedMatrixCores.get(index) : null;
    }

    /**
     * A node is usable as long as it exists and was not disassembled/used as enhance material.
     * Disassembled nodes stay in the sorted list until relog so the client indexes stay valid.
     */
    private static boolean isUsable(MatrixCore core) {
        return core != null && core.getState() != MatrixStateType.DISASSEMBLED;
    }

    private static boolean isSlotAvailable(Char chr, int pos) {
        if (pos < 0 || pos >= MatrixConstants.MAX_NODE_SLOTS) {
            return false;
        }
        if (chr.getLevel() >= MatrixConstants.REQ_LV_BY_MATRIX_SLOT_POS[pos]) {
            return true;
        }
        MatrixSlot slot = chr.getMatrixSlotByPosition(pos);
        return slot != null && slot.isUnLock();
    }

    private static int getFirstOpenSlot(Char chr) {
        for (int pos = 0; pos < MatrixConstants.MAX_NODE_SLOTS; pos++) {
            if (isSlotAvailable(chr, pos) && chr.getMatrixCoreByPosition(pos) == null) {
                return pos;
            }
        }
        return -1;
    }

    private static int getFirstExpandableSlot() {
        int base = MatrixConstants.REQ_LV_BY_MATRIX_SLOT_POS[0];
        for (int pos = 0; pos < MatrixConstants.MAX_NODE_SLOTS; pos++) {
            if (MatrixConstants.REQ_LV_BY_MATRIX_SLOT_POS[pos] > base) {
                return pos;
            }
        }
        return MatrixConstants.MAX_NODE_SLOTS;
    }

    private static int getUsableCoreCount(Char chr) {
        int count = 0;
        for (MatrixCore core : chr.getMatrixCore()) {
            if (isUsable(core)) {
                count++;
            }
        }
        return count;
    }

    private static int getCoreMaxLevel(VCoreData data) {
        return Math.max(1, VCore.getMaxLevel(data.getType()));
    }

    private static List<Integer> getBoostSkillPool(VCoreData data) {
        if (data.getJobs().isEmpty()) {
            return new ArrayList<>();
        }
        try {
            return new ArrayList<>(VCore.getBoostSkillByJobID(Short.parseShort(data.getJobs().get(0))));
        } catch (NumberFormatException e) {
            return new ArrayList<>();
        }
    }

    /**
     * Returns an error message if the given node can't be equipped next to the currently equipped nodes.
     *
     * @param ignored a node that will be unequipped by this action (may be null)
     */
    private static String getActivationConflict(Char chr, MatrixCore core, VCoreData coreData, MatrixCore ignored) {
        for (MatrixCore existCore : chr.getMatrixCore()) {
            if (existCore == core || existCore == ignored || !existCore.isActive()) {
                continue;
            }
            VCoreData existData = VCore.getCore(existCore.getCoreID());
            if (existData == null) {
                continue;
            }
            if (coreData.getType() == VCore.BOOST) {
                // two boost nodes can't share the same main skill
                if (existData.getType() == VCore.BOOST && existCore.getSkillID1() != 0
                        && existCore.getSkillID1() == core.getSkillID1()) {
                    return String.format("Node này chứa kỹ năng %s mà bạn đã kích hoạt.", getSkillName(existCore.getSkillID1()));
                }
                continue;
            }
            if (coreData.getType() == VCore.SPECIAL && existData.getType() == VCore.SPECIAL
                    && countActiveSpecialNodes(chr, core, ignored) >= MatrixConstants.SPECIAL_SLOT_MAX) {
                return "Bạn đã gắn tối đa số lượng Special Node.";
            }
            if (existData.getType() == VCore.BOOST) {
                continue;
            }
            int[] existSkills = {existCore.getSkillID1(), existCore.getSkillID2(), existCore.getSkillID3()};
            for (int existSkill : existSkills) {
                if (existSkill != 0 && (existSkill == core.getSkillID1() || existSkill == core.getSkillID2()
                        || existSkill == core.getSkillID3())) {
                    return String.format("Node này chứa kỹ năng %s mà bạn đã kích hoạt.", getSkillName(existSkill));
                }
            }
            if (coreData.getType() == VCore.SPECIAL && existCore.getCoreID() == core.getCoreID()) {
                return "Bạn đã gắn node này rồi.";
            }
        }
        return null;
    }

    private static int countActiveSpecialNodes(Char chr, MatrixCore exclude, MatrixCore ignored) {
        int count = 0;
        for (MatrixCore c : chr.getMatrixCore()) {
            if (c == exclude || c == ignored || !c.isActive()) {
                continue;
            }
            VCoreData data = VCore.getCore(c.getCoreID());
            if (data != null && data.getType() == VCore.SPECIAL) {
                count++;
            }
        }
        return count;
    }

    private static String getSkillName(int skillID) {
        var skillString = StringData.getSkillStringById(skillID);
        return skillString != null ? skillString.getName() : String.valueOf(skillID);
    }

    /**
     * Enhances the given node with the given material nodes. Materials must be unequipped, unlocked, not disassembled,
     * different from the target and either the same node or an EXP node.
     *
     * @return the enhance result, or null if nothing was done
     */
    private static NodeEnhance enhanceCore(Char chr, List<MatrixCore> sortedMatrixCores, int nodeId, MatrixCore core,
                                           List<Integer> fodderIds) {
        VCoreData coreData = VCore.getCore(core.getCoreID());
        if (coreData == null || (coreData.getType() != VCore.SKILL && coreData.getType() != VCore.BOOST)) {
            return null;
        }
        Map<Integer, VCoreData.EnforceOption> enforceTable = VCore.getEnforceOption(coreData.getType());
        int maxLevel = getCoreMaxLevel(coreData);
        if (enforceTable == null || core.getSkillLevel() >= maxLevel) {
            return null;
        }
        Set<MatrixCore> removeCores = new LinkedHashSet<>();
        int exp = 0;
        for (int fodderId : fodderIds) {
            MatrixCore targetCore = getCoreByIndex(sortedMatrixCores, fodderId);
            if (!isUsable(targetCore) || targetCore == core || targetCore.isActive() || targetCore.isLock()
                    || removeCores.contains(targetCore)) {
                continue;
            }
            VCoreData targetData = VCore.getCore(targetCore.getCoreID());
            if (targetData == null) {
                continue;
            }
            boolean sameNode = targetCore.getCoreID() == core.getCoreID();
            boolean expNode = targetData.getType() == VCore.EXP;
            if (!sameNode && !expNode) {
                continue;
            }
            Map<Integer, VCoreData.EnforceOption> targetTable = VCore.getEnforceOption(targetData.getType());
            VCoreData.EnforceOption option = targetTable == null ? null : targetTable.get(targetCore.getSkillLevel());
            if (option == null) {
                continue;
            }
            exp += option.getEnforceExp();
            removeCores.add(targetCore);
        }
        if (removeCores.isEmpty()) {
            return null;
        }
        final int currentCoreLevel = core.getSkillLevel();
        core.setExperience(core.getExperience() + exp);
        while (core.getSkillLevel() < maxLevel) {
            VCoreData.EnforceOption option = enforceTable.get(core.getSkillLevel());
            if (option == null || option.getNextExp() <= 0 || core.getExperience() < option.getNextExp()) {
                break;
            }
            core.setExperience(core.getExperience() - option.getNextExp());
            core.setSkillLevel(core.getSkillLevel() + 1);
        }
        if (core.getSkillLevel() >= maxLevel) {
            core.setSkillLevel(maxLevel);
            core.setExperience(0);
        }
        core.setMaxLevel(maxLevel);
        for (MatrixCore remove : removeCores) {
            disassemble(remove);
        }
        core.saveToSQL();
        if (core.getSkillLevel() != currentCoreLevel && core.isActive()) {
            recalcMatrixSkills(chr, getCoreSkillIds(core));
        }
        var enhance = new NodeEnhance();
        enhance.pos = nodeId;
        enhance.expGained = exp;
        enhance.oldSlv = currentCoreLevel;
        enhance.newSlv = core.getSkillLevel();
        return enhance;
    }

    private static void disassemble(MatrixCore core) {
        core.setState(MatrixStateType.DISASSEMBLED);
        core.setSlot(-1);
        core.setLock(false);
        core.saveToSQL();
    }

    private static int getExtractShards(MatrixCore core) {
        VCoreData data = VCore.getCore(core.getCoreID());
        if (data == null) {
            return 0;
        }
        Map<Integer, VCoreData.EnforceOption> table = VCore.getEnforceOption(data.getType());
        VCoreData.EnforceOption option = table == null ? null : table.get(core.getSkillLevel());
        return option == null ? 0 : Math.max(0, option.getExtract());
    }

    /**
     * Returns the skill ids that are affected by the given node.
     */
    public static Set<Integer> getCoreSkillIds(MatrixCore core) {
        Set<Integer> skillIDs = new HashSet<>();
        VCoreData data = VCore.getCore(core.getCoreID());
        if (data != null && data.getType() == VCore.SPECIAL) {
            if (data.getOption() != null && data.getOption().getSkillID() > 0) {
                skillIDs.add(data.getOption().getSkillID());
            }
            return skillIDs;
        }
        for (int skillID : new int[]{core.getSkillID1(), core.getSkillID2(), core.getSkillID3()}) {
            if (skillID > 0) {
                skillIDs.add(skillID);
            }
        }
        return skillIDs;
    }

    /**
     * Recalculates the levels of all V Matrix skills from all equipped nodes.
     * Skill nodes give min(node level, 25) + slot enhancement (max 5).
     * Boost skills are the sum of all equipped boost nodes containing them, min(sum, 50) + slot enhancement (max 10).
     * Special nodes give their option skill at level 1.
     *
     * @param chr     the character
     * @param touched skill ids that changed and must be updated even if no equipped node contains them anymore
     *                (they will be set to level 0). May be null (e.g. on login).
     */
    public static void recalcMatrixSkills(Char chr, Collection<Integer> touched) {
        // skillID -> {node level sum, slot level sum, node type}
        Map<Integer, int[]> computed = new HashMap<>();
        for (MatrixCore core : chr.getMatrixCore()) {
            if (!core.isActive()) {
                continue;
            }
            VCoreData data = VCore.getCore(core.getCoreID());
            if (data == null || data.getType() == VCore.EXP) {
                continue;
            }
            MatrixSlot slot = chr.getMatrixSlotByPosition(core.getSlot());
            int slotLevel = slot != null ? Math.max(0, Math.min(slot.getLevel(), MatrixConstants.EQUIP_SLOT_ENHANCE_MAX)) : 0;
            int nodeLevel = data.getType() == VCore.SPECIAL ? 1 : Math.max(0, core.getSkillLevel());
            for (int skillID : getCoreSkillIds(core)) {
                int[] info = computed.computeIfAbsent(skillID, k -> new int[]{0, 0, data.getType()});
                info[0] += nodeLevel;
                info[1] += slotLevel;
                if (data.getType() == VCore.BOOST) {
                    info[2] = VCore.BOOST;
                }
            }
        }
        Set<Integer> targets = new HashSet<>(computed.keySet());
        if (touched != null) {
            targets.addAll(touched);
        }
        List<Skill> skills = new ArrayList<>();
        for (int skillID : targets) {
            if (skillID <= 0) {
                continue;
            }
            int level = 0;
            int masterLevel = 0;
            int[] info = computed.get(skillID);
            if (info != null) {
                switch (info[2]) {
                    case VCore.SPECIAL:
                        level = 1;
                        masterLevel = 1;
                        break;
                    case VCore.BOOST:
                        masterLevel = BOOST_NODE_LEVEL_MAX + BOOST_SLOT_BONUS_MAX;
                        level = Math.min(info[0], BOOST_NODE_LEVEL_MAX) + Math.min(info[1], BOOST_SLOT_BONUS_MAX);
                        break;
                    default:
                        masterLevel = SKILL_NODE_LEVEL_MAX + SKILL_SLOT_BONUS_MAX;
                        level = Math.min(info[0], SKILL_NODE_LEVEL_MAX) + Math.min(info[1], SKILL_SLOT_BONUS_MAX);
                        break;
                }
            }
            Skill current = chr.getSkill(skillID);
            if (current == null && level <= 0) {
                continue;
            }
            if (current != null && current.getCurrentLevel() == level && current.getMasterLevel() == masterLevel) {
                continue;
            }
            Skill skill = SkillData.getSkillDeepCopyById(skillID);
            if (skill == null) {
                continue; //Just for Sure.
            }
            skill.setCurrentLevel(level);
            skill.setMasterLevel(masterLevel);
            skills.add(skill);
        }
        if (!skills.isEmpty()) {
            chr.applySkillList(skills);
        }
    }

    /**
     * Recalculates the skills of the given node (e.g. after a level or slot level change).
     */
    public static void relocCoreSkill(Char chr, MatrixCore core) {
        recalcMatrixSkills(chr, getCoreSkillIds(core));
    }

    /**
     * Recalculates the skills of the given node after it was (de)activated.
     * Levels are always computed from all equipped nodes, so skills shared by several nodes stay correct.
     */
    public static void setNodeSkill(Char chr, MatrixCore core, MatrixUpdateType type) {
        recalcMatrixSkills(chr, getCoreSkillIds(core));
    }

    public static int getNodeShardsCost(int coreID) {
        VCoreData data = VCore.getCore(coreID);
        if (data == null) {
            return 0;
        }
        switch (data.getType()) {
            case VCore.SKILL:
                return MatrixConstants.CRAFT_SKILL_CORE_COST;
            case VCore.BOOST:
                return MatrixConstants.CRAFT_ENCHANT_CORE_COST;
            case VCore.SPECIAL:
                return MatrixConstants.CRAFT_SPECIAL_CORE_COST;
            default:
                return 0;
        }
    }

    public static void gainNodeShards(Char chr, int nodeShards) {
        long newValue = (long) chr.getAvatarData().getCharacterStat().getNodeShards() + nodeShards;
        int value = (int) Math.max(0, Math.min(newValue, Integer.MAX_VALUE));
        chr.getAvatarData().getCharacterStat().setNodeShards(value);
        chr.createQuestWithQRValue(MatrixConstants.MATRIX_SHARDS, "count=" + value);
    }
}