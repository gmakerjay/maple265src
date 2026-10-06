# q25712s - Kaiser 4th job advancement

if sm.getEmptyInventorySlots(1)>= 1:
    sm.jobAdvance(6112)
    sm.completeQuestNoRewards(25712)
    sm.giveItem(1142487)
    sm.giveAndEquip(1352503)
else:
    sm.sendSayOkay("#ePlease make more space in your EQUIP inventory.")
