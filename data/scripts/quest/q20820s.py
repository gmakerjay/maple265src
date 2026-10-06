# Start of The City of Ereve
KIMU = 1102004
sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.setSpeakerID(KIMU)
sm.flipSpeaker()
sm.setBoxChat()
sm.sendNext("Welcome to Ereve! This is the safest and most peaceful place in all of Maple World. "
"Empress Cygnus keeps it nice all the time!\r\n"
"You're #b#h0##k, right? Here to join the #p1064023# Knights. I'm your guide, #p" + str(KIMU) + "#. All the Noblesses in town come to me first!")

sm.sendSay("You need to get over to the Knight's Orientation right away. They're getting started already. Follow me, okay?")

sm.completeQuestNoRewards(parentID)
sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warp(130030100) # Knight Orientation Area
