Jinx = 9201431

sm.setSpeakerID(Jinx)
sm.sendNext("I don't know what I can do about the Butcher...\r\n#v3800851#")
if sm.sendAskYesNo("I never thought the demons would put up this kind of a fight... I mean, is this something you think you can handle?"):
    sm.sendNext("You'd better be careful, He has a way of regenerating his health. Might be a tall order to do on your own.")
    sm.setPlayerAsSpeaker()
    sm.sendSay("I think I know how you feel.")
    sm.setSpeakerID(Jinx)
    sm.sendSay("I think I'll ask the other warriors around here, too. Ha!")
    sm.sendSay("Ha ha ha!")
    sm.startQuest(parentID)