sm.setSpeakerID(9131002)
if sm.sendAskYesNo("Do you wish to leave?"):
    if chr.getFieldID() == 744000041:
        if instance is not None and instance.hasProperty("SengoClear" + str(stage)):
            if sm.canHold(4310075):
                sm.giveItem(4310075, 4)
                sm.giveExpNoAffectedByExpRate(11959766)
                sm.warpInstanceOut(chr, 744000020)
            else:
                sm.sendSayOkay("Please make room in your Etc Inventory.")
        else:
            sm.chat("Please eliminate all monsters and talk to Oda Nobunaga before moving to exit!")
    else:
        sm.warpInstanceOut(chr, 744000020)
