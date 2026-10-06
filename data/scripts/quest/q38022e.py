MOONBEAM = 3002103
sm.setSpeakerID(2007)
sm.setBoxChat()
if sm.sendAskYesNo("Would you like to skip the tutorial cutscenes?"):
    sm.createQuestWithQRValue(37999, "SKIP_38022")

if sm.getQRValue(37999) != "SKIP_38022":
    sm.lockInGameUI(True, False)
    sm.forcedInput(0)

    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("Are you okay? Are you hurt?")

    sm.setSpeakerID(MOONBEAM)
    sm.setBoxChat()
    sm.sendSay("Ooh, my whole body aches! Here, and here, and here!")

    sm.setPlayerBoxChat()
    sm.sendSay("You... don't have a scratch on you.")

    sm.setSpeakerID(MOONBEAM)
    sm.setBoxChat()
    sm.sendSay("I... I must be bleeding internally! Oh, the foxmanity! I need to get back to town for treatment! Thanks for nothing, you big jerk!")

sm.completeQuest(38020)
sm.completeQuest(parentID)

if sm.getQRValue(37999) != "SKIP_38022":
    sm.setPlayerBoxChat()
    sm.sendNext("...Did I say something wrong again? I wish she'd tell me what I did wrong. I'm glad she's okay, at least.")

sm.lockInGameUI(False,False)
sm.showFade(500)
sm.warp(410000000, 2)
