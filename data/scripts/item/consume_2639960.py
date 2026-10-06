# Sacred Symbol: Arcus Lv. 5 Coupon
SYMBOL = 1713001
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.canHold(SYMBOL):
    sm.consumeItem(parentID)
    sm.giveSymbol(SYMBOL, 1, 0, 5)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")