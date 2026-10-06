# Tutorial skipper snippet
def skip_tutorial():
	CLAUDIN = 1540452

	quests_to_complete = [
		23000, # Spill It, Headmaster!
		23001, # Request from a Kindergarten Teacher
		23002, # Request from a Police Officer
		23003, # Request from a Doctor
		23004, # Request from a Streetsweeper
		23005, # Request from a Mascot
		23010, # Mysterious Invitation
	]

	map_to_warp = 310010000 # Secret Plaza

	sm.setSpeakerID(CLAUDIN)
	sm.removeEscapeButton()
	sm.lockInGameUI(True,False)
        sm.setBoxChat()
	if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Battle Mage","Wild Hunter","Mechanic","Blaster"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                sm.showFade(100)
                sm.levelUntil(10)
                sm.jobAdvance(3200)
                sm.resetAP(False, 3200)
                sm.giveItem(1142242)
                sm.giveItem(1382000, 1)
                sm.completeQuestNoRewards(23011)
            if selection == 1:
                sm.showFade(100)
                sm.levelUntil(10)
                sm.jobAdvance(3300)
                sm.resetAP(False, 3300)
                sm.giveItem(1142242)
                sm.giveItem(1462092, 1)
                sm.giveSkill(30001061)  # Capture
                sm.giveSkill(30001062)  # Call of the Hunter
                sm.giveItem(2061000, 2000)
                sm.completeQuestNoRewards(23012)
                sm.completeQuestNoRewards(23015)
            if selection == 2:
                sm.showFade(100)
                sm.levelUntil(10)
                sm.jobAdvance(3500)
                sm.resetAP(False, 3500)
                sm.giveItem(1142242)
                sm.giveItem(1492000)
                sm.giveItem(2330000, 1600)
                sm.completeQuestNoRewards(23013)
                sm.completeQuestNoRewards(23016)
            if selection == 3:
                sm.showFade(100)
                sm.levelUntil(10)
                sm.jobAdvance(3700)
                sm.giveItem(1142242)
                sm.resetAP(False, 3700)
                sm.giveItem(1582000)
                sm.giveAndEquip(1353400)
                sm.completeQuestNoRewards(23160)
            for quest in quests_to_complete:
		sm.completeQuestNoRewards(quest)
		
            sm.warpInstanceOut(chr, map_to_warp)
		
	sm.lockInGameUI(False,False)
	#sm.dispose()

skip_tutorial()