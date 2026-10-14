# [Morass] The Flow
# Quest 34249 (Start)

FLYING_FISH = 3003409

sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1:
        for qid in range(34249, 34273):
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        sm.completeQuestNoRewards(34243)
        sm.completeQuestNoRewards(34275)
        sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h0;28=h0;29=h0;30=h0;31=h0;32=h0;33=h1;36=h0;53=h0;54=h0")
        sm.giveSymbol(1712005, 1, 34272)
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Morass prequests and received your #b#i1712005# #z1712005##k!")
        sm.warp(450006130)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
else:
    sm.setPlayerBoxChat()
    sm.sendNext("Flying Fish! You're back!")
    sm.setNpcBoxChat(FLYING_FISH)
    sm.sendNext("#face0#Bloop!")
    sm.setPlayerBoxChat()
    sm.sendNext("We did it! The forest is rebalanced, and the Arcane River's flow is back to normal!")
    if sm.sendAskYesNo("Time to Ride the Flying Fish to the next area!\r\n#b(You will move automatically when you accept.)#k"):    
        sm.lockUI()
        sm.hideUser(True)
        sm.blind(1, 255, 0, 0)
        sm.sendDelay(1000)
        sm.removeEscapeButton()
        sm.setPlayerBoxChat()
        sm.sendNext("Huh?")
        sm.sendNext("#b(Is the flying fish... sinking?!)#k")
        sm.sendNext("Uh oh! Ahhhhh!")
        sm.sendDelay(1000)
        sm.OnOffLayer_On(1000, "0", 0, 0, 0, "Map/Effect3.img/morass/noSpine/fish", 4, 1, -1, 0)
        sm.spineScreen(False, False, True, 0, "Map/Effect3.img/morass/spine/bubble/skeleton", "animation", None)
        sm.sendDelay(3000)
        sm.OnOffLayer_Off(1000, "0", 0)
        sm.unlockUI()
        sm.hideUser(False)
        sm.startQuest(34249)
        sm.blind(0, 0, 0, 1000)
        sm.warpInstanceIn(chr, 450006000, False)
