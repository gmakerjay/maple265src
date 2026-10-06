# 931000012
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2159006)
sm.setBoxChat()
sm.sendNext("Whew, something must have distracted them. Now's your chance. GO!")

sm.setPlayerBoxChat()
sm.sendSay("But if I flee, you'll be left here alone...")

sm.setSpeakerID(2159006)
sm.setBoxChat()
sm.sendSay("Forget about me. You can't help me. Doctor Gelimer would realize right away if I'm missing, and then he'd summon the Black Wings to look for us. No, forget me and save yourself. Please!")

sm.setPlayerBoxChat()
sm.sendSay("I can't just leave you here! And you shouldn't give up hope so easily!")

sm.setSpeakerID(2159006)
sm.setBoxChat()
sm.sendSay("But it IS hopeless. I'm stuck in here. But thank you for caring. It's been a long time since anyone's been kind to me. But now, hurry! You must go!")
if not sm.sendAskYesNo("#b(Vita closes her eyes like she's given up. What should you do? How about trying to break open the vat?)#k"):
    sm.sendNext("#b(You tried to hit the vat with all your might, but your hand slipped!)#k")
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)

sm.giveExp(60)
sm.showFade(500)
sm.warp(931000013, 0)