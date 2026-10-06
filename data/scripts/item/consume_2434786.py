# ParentID: 2434786
# Character field ID when accessed: 211042300
# ObjectID: 0
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5)>= 1:
    chr.addItemToInventory(5390028,4,"day",7)
    sm.consumeItem(2434786)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your CASH inventory.")
    #sm.dispose()