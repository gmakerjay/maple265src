Solus = 9201430

sm.setSpeakerID(Solus)
sm.sendNext("The demon I'm after is known as Atila, supposedly of an ancient tribe.\r\n#v3800850#")
if sm.sendAskYesNo("He commands the shock troops of the demons in Blackgate.\r\nEliminate him and stall their advances."):
    sm.sendNext("Good. Whoever finds them first will eliminate them.")
    sm.sendSay("#v3800855#\r\nDo not let them blind you!")
    sm.startQuest(parentID)