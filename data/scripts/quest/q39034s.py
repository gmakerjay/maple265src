# [Daily Quest] The Tree Spirits' Request - Start
TREE_SPIRITS = 3003322

sm.setSpeakerID(TREE_SPIRITS)
if chr.getInstance() is None:
    if chr.getField().getId() != 450005000:
        sm.warp(450005000)
    else:
        sm.sendNext("La la la~ The spirits of Arcana are delighted by your return, #h0#.")
        if sm.sendAskYesNo("Would you be willing to help protect the peace of our forest each day?"):
            sm.startQuest(39034)
            sm.completeQuest(39034)
            sm.sendSayOkay("Thank you so much! Speak to me again whenever you are ready to take on today's tasks.")
        else:
            sm.sendSayOkay("Please come back whenever you are ready to help us.")
else:
    sm.flipDialogue()
    sm.sendSayOkay("Unable to move to Arcana...")
