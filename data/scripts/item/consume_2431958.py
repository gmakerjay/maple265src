# Character field ID when accessed: 240010500
# ObjectID: 0
# ParentID: 2431958
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5)>= 1:
    chr.addItemToInventory(5040004,1,"day",7)
    sm.consumeItem(2431958)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your CASH inventory.")
    #sm.dispose()