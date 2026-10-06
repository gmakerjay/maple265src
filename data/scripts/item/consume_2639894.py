# Beyond Burning Title Coupon
TITLE = 3700807
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.canHold(TITLE):
    sm.consumeItem(parentID)
    chr.addItemToInventory(TITLE,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi SETUP để nhận thưởng.")