from time import sleep
JAY = 1531001
sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_08", 100)
sm.showClearStageExpWindow(600)
sleep(2)
sm.warpInstanceOut(chr, 331001000)
sm.playExclSoundWithDownBGM("Bgm43.img/Kinesis Theme I", 100)
sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("Good job. Come upstairs.")

