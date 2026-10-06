sm.setSpeakerID(3003110)
if sm.sendAskYesNo("(The oarsman gestures for you to board the boat.)"):
    sm.setPlayerAsSpeaker()
    sm.sendNext("#b(Use the portal next to you to get on the boat.)#k")
    sm.startQuest(34107)
    sm.completeQuest(34107)