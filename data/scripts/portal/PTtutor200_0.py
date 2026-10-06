GUARD1 = 9300498
GUARD2 = 9300507
sm.lockInGameUI(True,False)
if sm.hasQuest(25000):
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("This portal leads straight into Ereve. The place is going to be positively crawling with knights. Sounds like just my kind of place.")
    sm.startQuest(25003)
    sm.warpInstanceIn(chr, 915000300, 1)
sm.lockInGameUI(False,False)  