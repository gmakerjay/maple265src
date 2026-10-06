NPC = 9010000
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5)>= 1:
    chr.addItemToInventory(5062009,10,"day",7)
    sm.consumeItem(2630756)
else:
    sm.sendSayOkay("Please make more space in your CASH inventory.")