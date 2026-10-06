# ObjectID: 0
# ParentID: 2434253
# Character field ID when accessed: 401051100
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 2:
    chr.addItemToInventory(1112254,1,"day",30)
    chr.addItemToInventory(1112143,1,"day",30)
    sm.consumeItem(2434253)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()