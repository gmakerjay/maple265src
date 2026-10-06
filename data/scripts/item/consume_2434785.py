# ParentID: 2434785
# ObjectID: 0
# Character field ID when accessed: 100000000
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5)>= 1:
    chr.addItemToInventory(5390027,3,"day",7)
    sm.consumeItem(2434785)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your CASH inventory.")
    #sm.dispose()