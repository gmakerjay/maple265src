# Character field ID when accessed: 211042300
# ObjectID: 0
# ParentID: 2432209
NPC = 2007
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(1)>= 1:
    chr.addItemToInventory(1112142,1,"day",30)
    sm.consumeItem(2432209)
    #sm.dispose()
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    #sm.dispose()