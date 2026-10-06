stage = chr.getField().getId() - 744000020
if sm.getInstance() is not None and sm.getInstance().hasProperty("SengoClear" + str(stage)):
    if sm.canHold(4310075):
        sm.giveItem(4310075)
        sm.giveExpNoAffectedByExpRate(459991 * stage)
        sm.warpNoReturn(chr.getFieldID() + 1, 0)
    else:
        sm.sendSayOkay("Please make room in your Etc Inventory.")
else:
    sm.chat("Please eliminate all monsters and talk to Oda Nobunaga before moving to the next stage!")
