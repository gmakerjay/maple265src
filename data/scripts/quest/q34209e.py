Pibik = 3003153

sm.setSpeakerID(Pibik)
sm.flipDialogue()
sm.sendNext("But it's not a real sandwich without multiple types of meat!")

sm.flipDialogue()
sm.sendSay("Now! Bring me more meat to complete the #b" + str(sm.getQRValue(34207)) + " Sandwich#k and to #bfill my belly#k")

sm.setPlayerAsSpeaker()
sm.sendSay("Why are we making the sandwich that #bYOU want to eat#k? Have you forgotten this is all for #bMuto#k?")

sm.completeQuest(34209)