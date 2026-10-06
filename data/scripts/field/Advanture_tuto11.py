# Maple Road : Maple Tree Hill (4000011)  Map for Explorer Tutorial

UNK_NPC = 10300  # NPC name - "???"
EXPLORER = 2470018

JOB = ["Warrior","Magician","Archer","Thief","Pirate"]
quests_to_complete = [32202, 32203, 32204, 32205, 32206, 32207, 32208, 32209, 32210, 32211, 32212, 32213, 32214, 32215]
item_need_add = []

if not sm.hasQuest(32202) or not sm.hasQuestCompleted(32203):
    sm.setSpeakerID(EXPLORER)
    sm.removeEscapeButton()
    sm.lockInGameUI(True,False)
    sm.setBoxChat()
    if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):

        jobID = 0
        mapID = 0
        item_need_add.append([1142107, 1])
        quests_to_complete.append(1400)

        dialog = "#eChoose the Best Job for You.\r\n"
        for i in range(len(JOB)):
            dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
        selection = sm.sendNext(dialog)

        if selection == 0:
            jobID = 100
            mapID = 102000000
            quests_to_complete.append(1401)
            item_need_add.append([1302182, 1])

        elif selection == 1:
            jobID = 200
            mapID = 101000000
            quests_to_complete.append(1402)
            item_need_add.append([1372043, 1])

        elif selection == 2:
            jobID = 300
            mapID = 100000000
            quests_to_complete.append(1403)
            item_need_add.extend([[1452051, 1], [2060000, 500], [2061000, 500]])

        elif selection == 3:
            jobID = 400
            mapID = 103000000
            quests_to_complete.append(1404)
            item_need_add.extend([[2070000, 500], [1332063, 1], [1472061, 1]])

        elif selection == 4:
            jobID = 500
            mapID = 120000000
            quests_to_complete.append(1405)
            item_need_add.extend([[1492014, 1], [1482014, 1], [2330006, 500]])

        sm.lockInGameUI(False,False)
        for quest in quests_to_complete:
            sm.completeQuestNoRewards(quest)
        for item in item_need_add:
            sm.giveItem(item[0], item[1])
        sm.levelUntil(10)
        sm.jobAdvance(jobID)
        sm.warp(mapID)
        sm.resetAP(False, jobID)
        #sm.dispose()
    else:
        sm.showFieldEffect("maplemap/enter/10000", 0)
        sm.sendDelay(1000)

        sm.spawnNpc(UNK_NPC, -240, 220)
        sm.showNpcSpecialActionByTemplateId(UNK_NPC, "summon", 0)
        sm.showEffect("Effect/Direction12.img/effect/tuto/BalloonMsg1/1", 900, 0, -120, 0, sm.getNpcObjectIdByTemplateId(UNK_NPC), False, 0)
        sm.sendDelay(1800)

        sm.moveNpcByTemplateId(UNK_NPC, False, 1000, 100)
        sm.moveCamera(False, 200, 200, 200)

        # The delay is for letting the Npc move
        sm.sendDelay(3000)

        sm.moveCamera(True, 0, 0, 0)

        sm.sendDelay(900)

        sm.setSpeakerID(0)
        sm.setSpeakerType(3)

        sm.setPlayerBoxChat()
        sm.sendNext("Who was that girl? Why did she run away when she saw me?")
        sm.sendNext("Maybe I'll follow her..")

        sm.removeNpc(UNK_NPC)
        sm.completeQuestNoRewards(32202)
        sm.lockInGameUI(False,False)
        #sm.dispose()