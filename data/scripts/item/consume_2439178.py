# Mysterious Cryptic Chest
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(5) >= 1:
    sm.consumeItem(parentID)
    chr.addItemToInventory(5000054,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi CASH để nhận thưởng.")