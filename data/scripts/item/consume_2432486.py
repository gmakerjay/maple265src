# ParentID: 2432486
# Character field ID when accessed: 211042300
# ObjectID: 0
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1112257,1,"day",30)
    sm.consumeItem(2432486)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()