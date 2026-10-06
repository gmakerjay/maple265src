NPC = 1540451

JOB = ["Dawn Warrior","Blaze Wizard","Wind Archer","Night Walker","Thunder Breaker"]
quests_to_complete = [ 20820, 20821, 20822, 20823, 20824, 20825, 20826, 20827, 20828, 20829, 20830, 20831, 20832, 20833, 20834, 20835, 20836, 20837, 20838, 20839 ]
item_need_add = []

sm.setSpeakerID(NPC)
sm.removeEscapeButton()
sm.setBoxChat()
sm.lockInGameUI(True,False)
if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
    dialog = "#eChoose the Best Job for You.\r\n"
    for i in range(len(JOB)):
        dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
    selection = sm.sendNext(dialog)

    jobID = 0
    mapID = 130000000

    quests_to_complete.append(20860)
    if selection == 0:
        quests_to_complete.append(20861)
        item_need_add.extend([[1402001, 1], [1142066, 1]])
        jobID = 1100
    elif selection == 1:
        quests_to_complete.append(20862)
        item_need_add.extend([[1382000, 1], [1142066, 1]])
        jobID = 1200
    elif selection == 2:
        quests_to_complete.append(20863)
        item_need_add.extend([[1452002, 1], [1142066, 1], [2060000, 1000]])
        jobID = 1300
    elif selection == 3:
        quests_to_complete.append(20864)
        item_need_add.extend([[1472000, 1], [1142066, 1], [2070000, 500]])
        jobID = 1400
    elif selection == 4:
        quests_to_complete.append(20865)
        item_need_add.extend([[1482000, 1], [1142066, 1]])
        jobID = 1500
    sm.lockInGameUI(False,False)
    for quest in quests_to_complete:
        sm.completeQuestNoRewards(quest)
    for item in item_need_add:
        sm.giveItem(item[0], item[1])
    sm.levelUntil(10)
    sm.jobAdvance(jobID)
    sm.warp(mapID)
    sm.resetAP(False, jobID)
    sm.addSP(1, False)
else:
    sm.lockInGameUI(False, False)
    sm.showEffect("Effect/OnUserEff.img/guideEffect/cygnusTutorial/0", 0, 0)
    sm.invokeAfterDelay(5000, "showEffect", "Effect/OnUserEff.img/guideEffect/cygnusTutorial/1", 0, 0)
