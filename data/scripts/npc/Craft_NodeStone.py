#NPC ID: 1540945
#NPC NAME: Archelle

from net.swordie.ms.handlers.ui import MatrixHandler

ARCHELLE_ID = 1540945
NODE_STONE_REQ = 35
NODE_STONE_HAVE = chr.getAvatarData().getCharacterStat().getNodeShards()
NODE_STONE_ID = 2435719
NODE_CAN_CRAFT = NODE_STONE_HAVE // NODE_STONE_REQ

dialogue = "Bạn có muốn dùng Mảnh Node để chế tạo Nodestone không?\r\n#bSố Mảnh Node cần để chế tạo Nodestone: " + str(NODE_STONE_REQ) + "\r\nMảnh Node hiện có: " + str(NODE_STONE_HAVE) + "\r\nTổng số Nodestone bạn có thể chế tạo: "
dialogue += str(NODE_CAN_CRAFT)

sm.setSpeakerID(ARCHELLE_ID)
result = sm.sendAskNumber(dialogue, 0, 1, NODE_CAN_CRAFT)

cost = result * NODE_STONE_REQ

if NODE_STONE_HAVE < cost:
    sm.sendSayOkay("Bạn cần 35 Mảnh Node để tạo Nodestone. Hãy thử phân rã các core không cần thiết để thu thập thêm Mảnh Node")
else:
    if not sm.canHold(NODE_STONE_ID, result):
        sm.sendSayOkay("Vui lòng chừa thêm chỗ trống trong túi Use")
    else:
        MatrixHandler.gainNodeShards(chr, -cost)
        sm.giveItem(NODE_STONE_ID, result)
