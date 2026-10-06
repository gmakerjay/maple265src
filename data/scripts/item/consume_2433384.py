NPC = 9010000
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5)>= 1:
    chr.addItemToInventory(5062009,1,"day",90)
    sm.consumeItem(2433384)
else:
    sm.sendSayOkay("Please make more space in your CASH inventory.")