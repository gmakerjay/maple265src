sm.lockInGameUI(True, False)
sm.removeEscapeButton()
ELEX = 2151000
MASTERWORK_CHARGES = 1353403
sm.removeEscapeButton()

sm.setSpeakerID(ELEX)
sm.setBoxChat()
sm.sendNext("Welcome, #h0#. You're quite the hero. Look around at this beautiful town. It's worth fighting for... worth dying for... don't you think?")

sm.setPlayerBoxChat()
sm.sendSay("Are you feeling better?")

sm.setSpeakerID(ELEX)
sm.setBoxChat()
sm.sendSay("Yes. #p1540418#'s skills are second to none. I'm completely back to my old self. There is still one problem though...")

sm.setPlayerBoxChat()
sm.sendSay("What?! Are the Black Wings planning something?")

sm.setSpeakerID(ELEX)
sm.setBoxChat()
if sm.sendAskYesNo("No, the problem is... you! You've become too strong. I'm supposed to be your teacher but you've accomplished something I couldn't do. So I want to give you a more difficult mission! You game?"):
    if not sm.canHold(MASTERWORK_CHARGES):
        sm.sendSayOkay("Please make space in your equipment inventory.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
    else:
        sm.startQuest(parentID)
        sm.completeQuest(parentID)
        sm.jobAdvance(3712)
        sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
        sm.giveItem(MASTERWORK_CHARGES)
        sm.sendNext("I've also given you some skills that I know of but haven't mastered yet. I have a hunch that you'll be able to master them. After all, you're like the Resistance's hero now.")
        sm.sendSay("Could this be my last lesson with you? Nah, can't be. You may be stronger, but I'm still smarter. I'm sure there's plenty more you can learn from me. So I'll see you at your next lesson...whenever that is...")
        sm.sendPrev("I look forward to seeing what you accomplish.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()