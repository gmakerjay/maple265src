# ObjectID: 0
# ParentID: 2434792
# Character field ID when accessed: 100000000
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(2)>= 1:
    chr.addItemToInventory(2001584,30)
    sm.consumeItem(2434792)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your USE inventory.")
    #sm.dispose()