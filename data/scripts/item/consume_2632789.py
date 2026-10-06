# Eternal Flame Ring Coupon
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(1) >= 1:
    sm.consumeItem(parentID)
    chr.addItemToInventory(1114324,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")