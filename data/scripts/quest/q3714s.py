dialogue = "After defeating Horntail, I was able to acquire Nine Spirit's Egg. I better take it to Nine Spirit's nest and see what happens."
sm.setPlayerAsSpeaker()
if sm.sendAskYesNo("After defeating Horntail, I was able to acquire Nine Spirit's Egg. I better take it to Nine Spirit's nest and see what happens."):
    if not sm.canHold(2041200, 1):
        sm.sendSayOkay("Please make more space in your inventory.")
    else:
        if sm.hasQuestCompleted(3714):
            sm.deleteQuest(3714)
        sm.startQuest(3714)