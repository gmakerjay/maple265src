import random
#
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.startQuest(38075)
position = random.randrange(8)
nextPositionX = 936 + (position + 1) * 175
sm.spawnReactor(2119007, nextPositionX, 30)
for x in range(8):
    if x != position:
        sm.spawnReactor(2119008, 936 + (x + 1)*175, 30)
sm.sendNext("I think I'm at the right place, but why are there so many boxes? I suppose I need to break them one at a time.")
sm.chatScript("Use normal attacks to break the wooden boxes.")
sm.lockInGameUI(False, False)