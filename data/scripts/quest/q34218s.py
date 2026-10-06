if sm.canHold(1712002):
    sm.startQuest(parentID)
    sm.warpInstanceIn(chr, 450002201)
else:
    sm.sendSayOkay("Please have extra 1 slot of your EQUIP inventory.")