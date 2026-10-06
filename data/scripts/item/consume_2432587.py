# ParentID: 2432587
# ObjectID: 0
# Character field ID when accessed: 401051100
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1112151,1,"day",30)
    sm.consumeItem(2432587)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()