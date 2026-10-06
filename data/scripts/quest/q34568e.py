OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0#I think this thing's ready to go. Let's take it somewhere a little more secure so nothing can inerrupt us.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Are you ready to roll?\r\n#b(Accept to be moved right away.)#k"):
    #sm.warpInstanceIn(????) #cutscene
    sm.completeQuest(34568)