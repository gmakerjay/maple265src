Thorn = 9201434

sm.setSpeakerID(Thorn)
sm.sendNext("Our prey is no ordinary demon. Asura was once a god.\r\n#v3800853#")
if sm.sendAskYesNo("But she fell to corruption, and is now a force to be reckoned with. Are you willing to challenge her?"):
    sm.sendNext("Find Asura in Blackgate... and destroy her.")
    sm.startQuest(parentID)