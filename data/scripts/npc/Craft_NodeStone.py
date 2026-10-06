#NPC ID: 1540945
#NPC NAME: Archelle

from net.swordie.ms.handlers.ui import MatrixHandler

ARCHELLE_ID = 1540945
NODE_STONE_REQ = 35
NODE_STONE_HAVE = chr.getAvatarData().getCharacterStat().getNodeShards()
NODE_STONE_ID = 2435719
NODE_CAN_CRAFT = NODE_STONE_HAVE // NODE_STONE_REQ

dialogue = "Would you like to use Node Shards to craft Nodestones?\r\n#bNode Shards required per Nodestone: " + str(NODE_STONE_REQ) + "\r\nCurrent Node Shards: " + str(NODE_STONE_HAVE) + "\r\nTotal Nodestones you can craft: "
dialogue += str(NODE_CAN_CRAFT)

sm.setSpeakerID(ARCHELLE_ID)
result = sm.sendAskNumber(dialogue, 0, 1, NODE_CAN_CRAFT)

cost = result * NODE_STONE_REQ

if NODE_STONE_HAVE < cost:
    sm.sendSayOkay("You need at least 35 Node Shards to craft a Nodestone. Try disassembling unused nodes to obtain more shards.")
else:
    if not sm.canHold(NODE_STONE_ID, result):
        sm.sendSayOkay("Please make sure you have enough free space in your Use inventory.")
    else:
        MatrixHandler.gainNodeShards(chr, -cost)
        sm.giveItem(NODE_STONE_ID, result)
