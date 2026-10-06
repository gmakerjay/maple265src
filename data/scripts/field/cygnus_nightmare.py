# Hidden street : The Nightmare
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.setBoxChat()
sm.sendNext("This must be... oh! It's the queen!")
sm.forcedInput(2)
sm.sendDelay(100)
sm.sendNext("What is she staring at?")
sm.lockInGameUI(False,False)
#todo add wz scene for cygnus appearing in mirror
sm.warpInstanceOut(chr, 913031002, 0)
sm.startQuest(20893)


