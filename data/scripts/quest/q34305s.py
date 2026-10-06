Protective_Mask = 3003201

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendNext("I heard you need to go further down the river. If we succeed in freeing ourselves from this city of dreams, your wish will be a possibility.")

sm.flipDialogue()
if sm.sendAskYesNo("Will you aid us?"):
    sm.flipDialogue()
    sm.sendNext("Thank you. Gray Mask can tell you more.")
    sm.startQuest(parentID)