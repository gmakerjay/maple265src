# Burning Flame Wings Coupon
WINGS = 1103893
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.canHold(WINGS):
    sm.consumeItem(parentID)
    chr.addItemToInventory(WINGS,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi DECORATION để nhận thưởng.")