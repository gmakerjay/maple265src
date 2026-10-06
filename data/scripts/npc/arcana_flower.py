if not sm.hasQuestCompleted(34459):
    sm.setSpeakerID(3003337)
    sm.flipDialogue()
    sm.sendNext("If nothing is done, all will wither and die. Me, you, everyone.\r\niiiiiiiiiiiiii. Pessimistic Spirit.")
    sm.addQRValue(34459, "flower=1")