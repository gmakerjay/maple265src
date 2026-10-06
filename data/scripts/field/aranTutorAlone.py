# Tutorial skipper snippet
def skip_tutorial():
	COMBAT_STEP = 20001295
	MAPLE_ADMINISTARTOR = 2007

	quests_to_complete = [
		21000, # Find the Missing Kid 1
		21001, # Find the Missing Kid 2
		21010, # The Return of the Hero
		21011, # The Missing Weapon
		21012, # Abilities Lost
		21014, # Lilin's Account
		21015, # Basic Fitness Training 1
		21016, # Basic Fitness Training 2
		21017, # Basic Fitness Training 3
		21018, # Basic Fitness Test
		21100, # The Five Heroes
                21101,
	]

	map_to_warp = 140000000 # Rien
	target_level = 10
        sm.lockInGameUI(True, False)
        sm.removeEscapeButton()
	sm.setSpeakerID(1540802)
        sm.setBoxChat()
	
	

	if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and instantly arrive at #m" + str(map_to_warp) + "#?"):
		if sm.getChr().getLevel() < target_level:
			sm.addLevel(target_level - sm.getChr().getLevel())

		for quest in quests_to_complete:
			sm.completeQuestNoRewards(quest)
		sm.showFade(1)
		sm.giveSkill(COMBAT_STEP, 1, 1)
		sm.warp(map_to_warp)
                sm.giveItem(1142129)
                sm.jobAdvance(2100)
                sm.resetAP(False, 2100)

	sm.createQuestWithQRValue(21019, "noskip")
	sm.lockInGameUI(False, False)
	#sm.dispose()

if sm.getQRValue(21019) != "noskip":
	skip_tutorial()