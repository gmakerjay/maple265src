from net.swordie.ms.constants import EventConstants

sm.setSpeakerID(9201269)
sm.flipDialogue()
if EventConstants.RED_LEAF_HIGH_EVENT:
    if chr.getParty() is None:
        if sm.checkAttempt(EventConstants.RED_LEAF_HIGH_RECORD, 4):
            if sm.hasItem(4033766):
                sm.consumeItem(4033766)
                sm.addAttempt(EventConstants.RED_LEAF_HIGH_RECORD, 4)
                sm.warpInstanceIn(chr, 744000021, False)
                sm.setInstanceTime(1500, 744000020)
            else:
                sm.sendSayOkay("You need 1 x #i4033766# #z4033766# to enter inside!")
        else:
            response = sm.sendAskYesNo("You have run out of attempts to participate today.\r\nYou can buy 4 additional attempts today for 50,000 donation points.")
            if response == 1:
                if chr.getUser().getDonationPoints() >= 50000 and sm.checkAttempt(EventConstants.RED_LEAF_HIGH_EXTRA_SLOT, 1):
                    chr.getUser().deductDonationPoints(50000)
                    sm.addAttempt(EventConstants.RED_LEAF_HIGH_EXTRA_SLOT, 1)
                    sm.deleteQuest(EventConstants.RED_LEAF_HIGH_RECORD)
                    sm.sendSayOkay("You have spent 50,000 donation points to get 4 more attempts today.")
                else:
                    sm.sendSayOkay("You have already purchased 4 additional attempts today or do not have 50,000 donation points. Come back tomorrow.")
            else:
                sm.sendSayOkay("Come back tomorrow.")
    else:
        sm.sendSayOkay("This event cannot be entered with party members. Please leave your party to continue.")