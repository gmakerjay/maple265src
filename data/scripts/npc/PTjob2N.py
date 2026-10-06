# Phantom 2nd job adv
sm.lockInGameUI(True,False)
if not sm.hasQuest(25103):
    sm.removeEscapeButton()
    sm.setPlayerBoxChat()
    sm.sendNext("Let's see... 'A History of Ribbon Pigs' first edition... that's not it. 'The Great Mushroom Uprising'... why did I even steal this? Ah, there we are! I'll be back to my old self in no time!")
    sm.sendSay("Judgment Draw was in here as well? Lucky me! I believe that one will show up in the... Beginner Skill window?")
    sm.giveItem(1142376)
    
    sm.completeQuest(25100)
    sm.startQuest(25101)
    sm.completeQuest(25101)
    
    sm.startQuestNoCheck(25103)
    sm.jobAdvance(2410)
    sm.showEffect("Effect/BasicEff.img/JobChangedPhantom", 0, 0, 0, -2, -2, False, 0)
    sm.addMaxHP(300)
    sm.addMaxMP(150)

    sm.lockInGameUI(False,False)
else:
    sm.chat("You are not 1st job Phantom.")
    sm.lockInGameUI(False,False)
