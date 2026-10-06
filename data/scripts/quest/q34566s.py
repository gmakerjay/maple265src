OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Okay, let's go ahead and launch this thing. I want to find Shubert and Melange before things get any weirder than they already are. I found a good turtle-free spot for us, so are you read to roll?\r\n#b(Accept to be moved right away)#k"):
    sm.startQuest(34566)
    sm.createQuestWithQRValue(34560, "41=h0;42=h0;43=h0")
    sm.warp(450007040)