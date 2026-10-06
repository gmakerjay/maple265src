# ParentID: 913032000
# ObjectID: 0
# Character field ID when accessed: 913032000
MIHILE = 1104306
HAWKEYE = 1104310
CYGNUS = 1104304
NEINHEART = 1104305
ECKHART = 1104309
IRENA = 1104308
OZ = 1104307


sm.lockInGameUI(True)
sm.removeEscapeButton()
#TODO show effect Damien warp


sm.showFieldEffect("Map/Effect.img/cygnusReturns/demian",2000)
sm.sendDelay(2000)
sm.lockInGameUI(False)
sm.lockInGameUI(True,False)
sm.setSpeakerID(HAWKEYE)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("Is that the culprit? Do we pursue, Neinheart?")

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("No. Our first priority is the safety of Ereve!")

sm.setSpeakerID(OZ)
sm.setBoxChat()
sm.sendNext("How...how could this happen to our home? Our beautiful home...")

sm.setSpeakerID(CYGNUS)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("I have a bad feeling about this. Do you think Shinsoo is safe?")

sm.moveCamera(False ,500, 557,88)
sm.sendDelay(1000)
sm.playVideoByScript("cygnusReturns.avi")
sm.moveCamera(False ,500, 0,0)
sm.sendDelay(1000)
sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warpInstanceOut(chr, 130090000,0)
#sm.completeQuest(20951)

sm.removeNpc(MIHILE)
sm.removeNpc(HAWKEYE)
sm.removeNpc(CYGNUS)
sm.removeNpc(NEINHEART)
sm.removeNpc(ECKHART)
sm.removeNpc(IRENA)