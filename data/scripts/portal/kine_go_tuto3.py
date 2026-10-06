KINESIS = 1531000
JAY = 1531001

sm.setSpeakerID(KINESIS)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("Jay, it's boring to walk around slowly. Can I run now?")

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("Okay. Let me upgrade your data, so you can use #bTriple Jump#k and #battack skills#k in the last phase.")
sm.lockInGameUI(True, False)
sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_04", 100)
sm.showClearStageExpWindow(600)
sm.setJob(14200)
sm.showFade(500)
sm.invokeAfterDelay(2000, "warp", 331001130)
sm.lockInGameUI(False, False)
