# 914000500
ATHENA = 1209007
sm.lockInGameUI(True, False)
sm.setSpeakerID(ATHENA)
sm.removeEscapeButton()
sm.setBoxChat() 
if sm.sendAskYesNo("You made it back safely! What about the child?! Did you bring the child with you?!"):
    sm.completeQuest(parentID)
    sm.sendNext("Oh, what a relief. I'm so glad...")

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.setPlayerAsSpeaker()
    sm.sendSay("Hurry and board the ship! We don't have much time!")

    sm.setSpeakerID(ATHENA)
    sm.removeEscapeButton()
    sm.setBoxChat() 
    sm.sendSay("We don't have any time to waste. The Black Mage's forces are getting closer and closer! We're doomed if we don't leave right this moment!")

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.setPlayerAsSpeaker()
    sm.sendSay("Leave, now!")

    sm.setSpeakerID(ATHENA)
    sm.removeEscapeButton()
    sm.setBoxChat() 
    sm.sendSay("Aran, please! I know you want to stay and fight the Black Mage, but it's too late! Leave it to the others and come to Victoria Island with us! ")

    sm.setBoxChat()
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.setPlayerAsSpeaker()
    sm.sendSay("No, I can't!")
    sm.sendSay("Athena Pierce, why don't you leave for Victoria Island first? I promise I'll come for you later. I'll be alright. I must fight the Black Mage with the other heroes!")

    sm.lockInGameUI(True, False)
    sm.showFade(500)
    sm.warp(914090010, 0)
else:
    sm.sendNext("What about the child? Please give me the child.")
    sm.lockInGameUI(False, False)
    #sm.dispose()
