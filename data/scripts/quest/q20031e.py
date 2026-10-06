# Manual Labor

sm.removeEscapeButton()
# Constants
LIMBERT = 1106002

sm.setSpeakerID(LIMBERT)
sm.setBoxChat()
selection1 = sm.sendNext("What took you so long?! You better not have been rooting through my things!\r\n#b\r\n#L0#I wasn't, but I found this letter up there by the potion box... It's from some guy named Chromile.#l")

if selection1 == 0:
    sm.sendNext("What?! Who told you you could touch that?!")

sm.giveItem(2001500, 10)
sm.giveItem(2001503, 10)
sm.completeQuestNoRewards(20031)
sm.addLevel(2)
sm.lockInGameUI(True,False)
sm.localEmotion(4, 2000, False)
sm.sendDelay(2000)

sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("Another great day with the old man...")

sm.sendSay("Huh? What's that?")

sm.showBalloonMsg("Effect/Direction7.img/effect/tuto/soul/0", 4000)
sm.sendDelay(5000)

sm.sendNext("It was like... a small shining light...")

sm.warpInstanceIn(chr, 913070002, 0)