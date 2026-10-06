from java.lang import System
from net.swordie.ms.enums import UIType
from net.swordie.ms.enums import MatrixStateType
from net.swordie.ms.loaders.Etc.VCore import VCore
from net.swordie.ms.handlers.ui import MatrixHandler
from net.swordie.ms.connection.packet import WvsContext
from net.swordie.ms.connection.packet.WvsContext import matrixSPWResult

def getCoresByType(type):
    if type == 0:
        return filter(lambda core: VCore.isSkillNode(core.getCoreID()), chr.getInactiveMatrixCore())
    elif type == 1:
        return filter(lambda core: VCore.isBoostNode(core.getCoreID()), chr.getInactiveMatrixCore())
    else:
        return filter(lambda core: VCore.isSpecialNode(core.getCoreID()), chr.getInactiveMatrixCore())

def getCoresInRange(min, max, cores):
    return filter(lambda core: (cores.index(core) >= min and cores.index(core) <= max), cores)

def getNodeShards(cores):
    nodeShards = 0
    for core in cores:
        nodeShards += VCore.getEnforceOption(VCore.getCore(core.getCoreID()).getType()).get(core.getSkillLevel()).getExtract()
    return nodeShards

def disassembleNodes(cores, nodeShards):
    for core in cores:
        core.setState(MatrixStateType.DISASSEMBLED)
    MatrixHandler.gainNodeShards(chr, nodeShards)
    chr.write(WvsContext.nodeShardResult(nodeShards))
    chr.chatMessage("You've gained " + str(nodeShards) + " Node Shards.")
    chr.refreshAndSendMatrixPacket()

def disassembleSkillNodes():
    cores = getCoresByType(0)
    if len(cores) == 0:
        sm.sendNext("You don't have any Node.")
    else:
        dialog = "Please select what first node of range you want to disassemble.\r\n"
        i = 0
        for core in cores:
            dialog += "#L%s# #e#s%s# #q%s# (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getSkillID1(), core.getSkillID1(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        first_index = sm.sendNext(dialog)

        cores_2 = getCoresInRange(first_index, len(cores), cores)
        dialog = "Please select what second node of range you want to disassemble.\r\n"
        i = 0
        for core in cores_2:
            dialog += "#L%s# #e#s%s# #q%s# (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getSkillID1(), core.getSkillID1(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        selection = sm.sendNext(dialog)
        second_index = cores.index(cores_2[selection])

        last_cores = getCoresInRange(first_index, second_index, cores)
        nodeShards = getNodeShards(last_cores)
        dialog = "Here is the list of nodes that will be disassemble.\r\n#e#bTotal Node Shards: " + str(nodeShards) + "#k#n\r\n\r\n"
        for core in last_cores:
            dialog += "#e#s%s# #q%s# (Level: %s/%s, Exp: %s) #n\r\n" % (core.getSkillID1(), core.getSkillID1(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
        if sm.sendAskYesNo(dialog):
            disassembleNodes(last_cores, nodeShards)

def disassembleBoostNodes():
    cores = getCoresByType(1)
    if len(cores) == 0:
        sm.sendNext("You don't have any Node.")
    else:
        dialog = "Please select what first node of range you want to disassemble.\r\n"
        i = 0
        for core in cores:
            dialog += "#L%s# #e#s%s# #s%s# #s%s# (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getSkillID1(), core.getSkillID2(), core.getSkillID3(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        first_index = sm.sendNext(dialog)

        cores_2 = getCoresInRange(first_index, len(cores), cores)
        dialog = "Please select what second node of range you want to disassemble.\r\n"
        i = 0
        for core in cores_2:
            dialog += "#L%s# #e#s%s# #s%s# #s%s# (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getSkillID1(), core.getSkillID2(), core.getSkillID3(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        selection = sm.sendNext(dialog)
        second_index = cores.index(cores_2[selection])

        last_cores = getCoresInRange(first_index, second_index, cores)
        nodeShards = getNodeShards(last_cores)
        dialog = "Here is the list of nodes that will be disassemble.\r\n#e#bTotal Node Shards: " + str(nodeShards) + "#k#n\r\n\r\n"
        for core in last_cores:
            dialog += "#e#s%s# #s%s# #s%s# (Level: %s/%s, Exp: %s) #n\r\n" % (core.getSkillID1(), core.getSkillID2(), core.getSkillID3(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
        if sm.sendAskYesNo(dialog):
            disassembleNodes(last_cores, nodeShards)

def disassembleSpecialNodes():
    cores = getCoresByType(2)
    if len(cores) == 0:
        sm.sendNext("You don't have any Node.")
    else:
        dialog = "Please select what first node of range you want to disassemble.\r\n"
        i = 0
        for core in cores:
            dialog += "#L%s# #e #fEtc/VCore.img/CoreData/%s/icon# %s (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getCoreID(), VCore.getCore(core.getCoreID()).getName(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        first_index = sm.sendNext(dialog)

        cores_2 = getCoresInRange(first_index, len(cores), cores)
        dialog = "Please select what second node of range you want to disassemble.\r\n"
        i = 0
        for core in cores_2:
            dialog += "#L%s# #e #fEtc/VCore.img/CoreData/%s/icon# %s (Level: %s/%s, Exp: %s) #n#l\r\n" % (i, core.getCoreID(), VCore.getCore(core.getCoreID()).getName(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
            i += 1
        selection = sm.sendNext(dialog)
        second_index = cores.index(cores_2[selection])

        last_cores = getCoresInRange(first_index, second_index, cores)
        nodeShards = getNodeShards(last_cores)
        dialog = "Here is the list of nodes that will be disassemble.\r\n#e#bTotal Node Shards: " + str(nodeShards) + "#k#n\r\n\r\n"
        for core in last_cores:
            dialog += "#e #fEtc/VCore.img/CoreData/%s/icon# %s (Level: %s/%s, Exp: %s) #n\r\n" % (core.getCoreID(), VCore.getCore(core.getCoreID()).getName(), core.getSkillLevel(), core.getMaxLevel(), core.getExperience())
        if sm.sendAskYesNo(dialog):
            disassembleNodes(last_cores, nodeShards)

value = "count=" + str(chr.getAvatarData().getCharacterStat().getNodeShards())
selection = sm.sendSay("What is it that you want to do?\r\n" +
                       "#L0##b I want to upgrade or make Node.#k#l\r\n" +
                       "#L1##b I want to open multiple Nodestones.#k#l\r\n" +
                       "#L2##b I want to Disassemble Nodes.#k#l\r\n")
if selection == 0:
    sm.createQuestWithQRValue(1477, value)
    chr.write(matrixSPWResult(True))
elif selection == 1:
    item_quantityA = sm.getQuantityOfItem(2435902)
    item_quantityB = sm.getQuantityOfItem(2435719)
    selection_quantity = sm.sendAskNumber("How many Nodestones you want to open? Maximum: 99.\r\n", item_quantityA + item_quantityB, 1, item_quantityA + item_quantityB)
    if selection_quantity >= 1:
        if selection_quantity > item_quantityA and item_quantityA > 0:
            selection_quantity_left = selection_quantity - item_quantityA
            sm.openNodeWithCustomValue(2435902, item_quantityA)
            sm.openNodeWithCustomValue(2435719, selection_quantity_left)
        elif selection_quantity <= item_quantityA and item_quantityA > 0:
            sm.openNodeWithCustomValue(2435902, selection_quantity)
        elif selection_quantity > item_quantityA and item_quantityA == 0 and item_quantityB > 0:
            sm.openNodeWithCustomValue(2435719, selection_quantity)
        chr.refreshAndSendMatrixPacket()
        chr.dispose()

elif selection == 2:
    type_node_selection = sm.sendNext("Please choose Node type you want to disassemble?\r\n#b" +
                                      "#L0##e Skill Nodes.#n#l\r\n" +
                                      "#L1##e Boost Nodes.#n#l\r\n" +
                                      "#L2##e Special Nodes.#n#l\r\n#k")
    if type_node_selection == 0:
        disassembleSkillNodes()
    elif type_node_selection == 1:
        disassembleBoostNodes()
    elif type_node_selection == 2:
        disassembleSpecialNodes()
