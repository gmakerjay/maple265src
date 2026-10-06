Boiler = 9201435

sm.setSpeakerID(Boiler)
sm.sendNext("The demon I'm after is called Khan, the leadeer of an ancient tribe.\r\n#v3800854#")
if sm.sendAskYesNo("He is aided in battle by his Infernal Riders... Are you up for the Challenge?"):
    sm.sendNext("#v3800857#\r\nHe can seal the skills of h is enemies, so make your attacks count.")
    sm.sendSay("Eliminate Khan when you find an opening.")
    sm.startQuest(parentID)