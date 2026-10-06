NPC = 9010000
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1053187,1,"day",30)
    sm.consumeItem(2436947)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")