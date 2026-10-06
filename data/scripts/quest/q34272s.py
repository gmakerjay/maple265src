# Start [Morass] The Swamp Remains

JEAN = 3003406

if sm.getEmptyInventorySlots(1) >= 1:
	sm.setPlayerBoxChat()
	sm.sendNext("Trueffet didn't disappear like we expected. The morass is still intact.")
	sm.setNpcBoxChat(JEAN)
	sm.sendNext("#face13# Yes, you've done well, but it seems I still have more to do. This won't be easy.")
	sm.setPlayerBoxChat()
	sm.sendNext("Why?")
	sm.setNpcBoxChat(JEAN)
	sm.sendNext("#face13# I can't easily follow the #rBlack Mage#k using this body.")
	sm.setPlayerBoxChat()
	sm.sendNext("What?!")
	sm.setNpcBoxChat(JEAN)
	sm.sendNext("#face13# I didn't expect to take on a human form.")
	sm.sendNext("#face13# I'll return to the morass and find a solution.\r\nI took on this new appearance there, so there must be a way to revert to my previous form.")
	sm.sendNext("#face13# Once I've done that, I can continue my efforts to stop the Black Mage.\r\nThank you for all that you've done. If I ever require your assistance again, I will find you.")
	sm.setPlayerBoxChat()
	sm.sendNext("So that's it for now. At least we discovered what happened with Tana, Arkarium, and king Hekaton all those years ago. But what happened to Shey?")
	sm.sendNext("Ah, the journal is glowing again. Maybe the last entry has appeared.")
	sm.setNpcBoxChat(JEAN)
	sm.sendNext("#face0# Find me if you lose that journal.\r\nI can make another inside the morass.")
	sm.startQuest(34272)
	sm.completeQuest(34272)
	sm.startQuest(34243)
	sm.completeQuest(34243)
	sm.setQRValueByKey(34271, "36", "h0")
	sm.giveSymbol(1712005, 1, 34272)
else:
	sm.setSpeakerID(JEAN)
	sm.setBoxChat()
	sm.sendSayOkay("#face0# Please make more space in your EQUIP inventory.")