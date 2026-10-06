# q25711s - Kaiser 3rd job advancement

if chr.getJob() == 6110:
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(6111)
        sm.completeQuestNoRewards(25711)
        sm.giveItem(1142486)
        sm.giveAndEquip(1352502)
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
else:
    sm.sendSayOkay("You're currently not a second job Kaiser.")
