# ParentID: 101050000
# ObjectID: 0
# Character field ID when accessed: 101050000
if sm.hasQuestCompleted(24004):
    sm.removeEscapeButton()
    sm.lockInGameUI(True, False)
    sm.forcedInput(1)
    sm.sendDelay(2000)
    sm.forcedInput(0)

    sm.setPlayerBoxChat()
    sm.sendSay("Elders!!")
    sm.forcedInput(2)
    sm.sendDelay(2000)
    sm.forcedInput(0)

    sm.setPlayerBoxChat()
    sm.sendSay("Children...!!")

    sm.forcedInput(1)
    sm.sendDelay(1000)
    sm.forcedInput(0)

    sm.setPlayerBoxChat()
    sm.sendSay("Everyone is still trapped in the ice...")
    sm.startQuest(24006)
    sm.lockInGameUI(False, False)