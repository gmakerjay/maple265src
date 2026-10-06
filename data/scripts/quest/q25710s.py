# q25710s - Kaiser 2nd job advancement

if chr.getJob() == 6100:
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(6110)
        sm.completeQuest(25710)
        sm.giveItem(1142485)
        sm.giveAndEquip(1352501)
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
else:
    sm.sendSayOkay("You're currently not a first job Kaiser.")
