# ObjectID: 0
# ParentID: 2434760
# Character field ID when accessed: 100000000
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(3)>= 1:
    chr.addItemToInventory(3700344,1,"day",30)
    sm.consumeItem(2434760)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your SETUP inventory.")
    #sm.dispose()