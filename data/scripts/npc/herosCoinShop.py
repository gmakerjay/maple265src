sm.sendNext("This event has ended.")
# from net.swordie.ms.constants import EventConstants
# from java.lang import System
# #from datetime import datetime
# import datetime

# #9001128
# carrot_coin = 4310113

# maplecoin_feast_items = [
# 	[4000436, 200], #200 Moss Snail Shell
# 	[4000286, 200], #200 Straw Doll
# 	[4000643,  50], #50 Mutant Mushroom Cap
# 	[4000833, 150], #150 Cursed Slate
# 	[4000017,  20], #20 Pig’s Head
# 	[4009363,  20], #20 Prime Beef
# 	[4009364,  20],	#20 Fresh Milk
# ]

# far_a_way_items = [
# 	[4000132, 200], #200 Ghost Pirate Key
# 	[4000046, 200], #200 Taurospear Horn
# 	[4000015, 200], #200 Horny Mushroom Cap
# 	[4009373, 200], #200 Tattered Jiangshi Talisman
# 	# [4009374, 100], #100 Diabolic Jiangshi Talisman
# ]

# maplecoin_kills_mobs = [
# 	[8147000, 200], #200 Mantis
# 	[8147001, 200], #200 Blood Mantis
# 	[8190000, 200], #200 Jr. Newtie
# 	[6300000, 200], #200 Yeti
# 	[6400000, 200], #200 Dark Yeti
# ]

# def getDayFromLong(value):
# 	return int(datetime.datetime.fromtimestamp(value / 1000).strftime('%d'))

# def isEnoughItems(items):
# 	result = True
# 	for item in items:
# 		if not sm.hasItem(item[0], item[1]):
# 			result = False
# 			break
# 	return result

# def isEnoughTime(quest):
# 	currentDay = getDayFromLong(System.currentTimeMillis())
# 	#System.out.println("Current Day: " + str(currentDay))
# 	qrValue = sm.getQRValue(quest)
# 	if qrValue == "Quest is Null":
# 		return 1
# 	else:
# 		oldDay = getDayFromLong(long(sm.getQRValueByKey(quest, "time")))
# 		#System.out.println("Old Day: " + str(oldDay))
# 		if oldDay != currentDay:
# 			return 2
# 		else:
# 			return 0

# def getMinuteLeft():
# 	day = datetime.datetime.fromtimestamp(System.currentTimeMillis() / 1000)
# 	today_hour = int(day.strftime("%H"))
# 	today_minute = int(day.strftime("%M"))
# 	return 1440 - (today_hour * 60 + today_minute)

# def isEnoughMobs(mobs, currentMobKill):
# 	result = True
# 	index = 0
# 	for mob in mobs:
# 		if mob[1] > currentMobKill[index]:
# 			result = False
# 			break;
# 		index = index + 1	
# 	return result				

# def consumeItems(items):
# 	for item in items:
# 		sm.consumeItem(item[0], item[1])

# def onMapleCoinFeastQuest():
# 	if not sm.hasQuestCompleted(300401051):
# 		dialog = "#ePlease collect these items and give them to me!#n\r\n\r\n"
# 		for item in maplecoin_feast_items:
# 			dialog += "\t#e- #z%s# #b(#c%s#/%s)#k#n\r\n" % (item[0], item[0], item[1])	
# 		dialog += "\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n\t#e#i%s# #z%s# x 200.#n" % (carrot_coin, carrot_coin)	
# 		if sm.sendAskAccept(dialog):
# 			if sm.getEmptyInventorySlots(4) >= 1:
# 				if isEnoughItems(maplecoin_feast_items):
# 					consumeItems(maplecoin_feast_items)
# 					sm.giveItem(carrot_coin, 200)
# 					sm.completeQuestNoRewards(300401051)
# 				else:
# 					sm.sendNext("You do not have enough requirements to complete!")
# 			else:
# 				sm.sendSayOkay("Please make more space in your Etc inventory.")			
# 	else:
# 		sm.sendSayOkay("You have completed this quest!")

# def onMapleCoinKillsQuest():
# 	if sm.hasQuestCompleted(300401052):
# 		if isEnoughTime(300401052) == 2:
# 			sm.deleteQuest(300401052)
# 		else:
# 			timeLeft = getMinuteLeft()
# 			sm.sendNext("You completed this quest today, come back tomorrow\r\nTime Left: " + str(timeLeft) + " minutes.")
# 	qrValue = sm.getQRValue(300401052)
# 	#chr.chatMessage(qrValue)
# 	if qrValue == "Quest is Null":
# 		sm.createQuestWithQRValue(300401052, "time=" + str(System.currentTimeMillis()) + ";8147000=0;8147001=0;8190000=0;6300000=0;6400000=0;")
# 		chr.saveToSQL()
# 	if not sm.hasQuestCompleted(300401052):
# 		currentProcess = [
# 			int(sm.getQRValueByKey(300401052, "8147000")),
# 			int(sm.getQRValueByKey(300401052, "8147001")),
#  			int(sm.getQRValueByKey(300401052, "8190000")),
# 			int(sm.getQRValueByKey(300401052, "6300000")),
# 			int(sm.getQRValueByKey(300401052, "6400000")),
# 		]

# 		dialog = "#eLet's kill the monsters on this list#n\r\n\r\n"
# 		index = 0
# 		for mob in maplecoin_kills_mobs:
# 			dialog += "\t#e- #o%s# (%s/%s)#k#n\r\n" % (mob[0], currentProcess[index], mob[1])
# 			index = index + 1
# 		dialog += "\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n\t#e#i%s# #z%s# x 150.#n" % (carrot_coin, carrot_coin)
# 		if sm.sendAskAccept(dialog):
# 			if isEnoughMobs(maplecoin_kills_mobs, currentProcess):
# 				if sm.getEmptyInventorySlots(4) >= 1:
# 					sm.giveItem(carrot_coin, 150)
# 					sm.completeQuestNoRewards(300401052)
# 				else:
# 					sm.sendSayOkay("Please make more space in your Etc inventory.")		
# 			else:
# 				sm.sendNext("Come back when you kill enough monsters!")		

# def onFarAWayQuest():
# 	result = isEnoughTime(300401053)
# 	if result != 0:
# 		dialog = "#ePlease collect these items and give them to me!#n\r\n\r\n"
# 		for item in far_a_way_items:
# 			dialog += "\t#e- #z%s# #b(#c%s#/%s)#k#n\r\n" % (item[0], item[0], item[1])	
# 		dialog += "\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n\t#e#i%s# #z%s# x 150.#n" % (carrot_coin, carrot_coin)	
# 		if sm.sendAskAccept(dialog):
# 			if sm.getEmptyInventorySlots(4) >= 1:
# 				if isEnoughItems(far_a_way_items):
# 					consumeItems(far_a_way_items)
# 					sm.giveItem(carrot_coin, 150)
# 					if result == 1:
# 						sm.createQuestWithQRValue(300401053, "time=" + str(System.currentTimeMillis()) + ";")
# 					elif result == 2:
# 						sm.createQuestWithQRValue(300401053, "time=" + str(System.currentTimeMillis()))
# 					chr.saveToSQL()
# 				else:
# 					sm.sendNext("You do not have enough requirements to complete!")
# 			else:
# 				sm.sendSayOkay("Please make more space in your Etc inventory.")		
# 	else:
# 		timeLeft = getMinuteLeft()
# 		sm.sendNext("You completed this quest today, come back tomorrow\r\nTime Left: " + str(timeLeft) + " minutes.")	

# def onLetsJumpQuest():
# 	#280020000
# 	result = isEnoughTime(300401054)
# 	if result != 0:
# 		if sm.sendAskAccept("I'll put you on the jump challenge map. Are you ready?"):
# 			if result == 1:
# 				sm.createQuestWithQRValue(300401054, "time=" + str(System.currentTimeMillis()) + ";")
# 			elif result == 2:
# 				sm.createQuestWithQRValue(300401054, "time=" + str(System.currentTimeMillis()))
# 			sm.warp(280020000)
# 			chr.saveToSQL()
# 		else:
# 			sm.sendNext("Maybe next time.")
# 	else:
# 		timeLeft = getMinuteLeft()
# 		sm.sendNext("You completed this quest today, come back tomorrow\r\nTime Left: " + str(timeLeft) + " minutes.")		

# if chr.getUser().getAccountType().getVal() != 5:
# 	selection = sm.sendNext("Hello, here are the quests you can get today!\r\n" + 
# 				"#L0# #eMapleCoin Feast.#n#l\r\n" + 
# 				"#L1# #e[Daily] - MapleCoin Kills.#n#l\r\n" + 
# 				"#L2# #e[Daily] - Far a way.#n#l\r\n" + 
# 				"#L3# #e[Daily] - Let's Jump.#n#l\r\n")
# 	if selection == 0: #1 Time Quest
# 		onMapleCoinFeastQuest()
# 	elif selection == 1:
# 		if not sm.hasQuestCompleted(300401051):
# 			sm.sendNext("You need to complete the MapleCoin Feast quest first.")
# 		else:
# 			onMapleCoinKillsQuest()	
# 	elif selection == 2:
# 		if not sm.hasQuestCompleted(300401051):
# 			sm.sendNext("You need to complete the MapleCoin Feast quest first.")
# 		else:
# 			onFarAWayQuest()
# 	elif selection == 3:
# 		if not sm.hasQuestCompleted(300401051):
# 			sm.sendNext("You need to complete the MapleCoin Feast quest first.")
# 		else:		
# 			onLetsJumpQuest()			
# #sm.dispose()