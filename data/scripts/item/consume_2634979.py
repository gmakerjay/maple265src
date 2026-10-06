# Eternal Flame Title Coupon
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(3) >= 1:
    sm.consumeItem(parentID)
    chr.addItemToInventory(3700713,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi SETUP để nhận thưởng.")