# ObjectID: 0
# Character field ID when accessed: 401051100
# ParentID: 2434193
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1112160,1,"day",30)
    sm.consumeItem(2434193)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()