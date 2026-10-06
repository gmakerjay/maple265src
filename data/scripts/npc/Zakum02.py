# npc at the end of the second Zakum JQ map

# sm.sendSayOkay("Yeah okay whatever, you made it. Stop disturbing me, I'm busy.")
# sm.warp(211042300, 2)
carrot_coin = 4310113
if sm.getEmptyInventorySlots(4) >= 1:
	sm.giveItem(carrot_coin, 250)
	sm.warp(211042300, 2)
else:
	sm.sendNext("Please make more space in your Etc inventory.")