# Character field ID when accessed: 211042300
# ObjectID: 0
# ParentID: 2431948
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1112252,1,"day",30)
    sm.consumeItem(2431948)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()