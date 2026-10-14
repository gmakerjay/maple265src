# [Arcana] Farewell, City of Nightmares
# Quest 34450 (Start)

sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1:
        for qid in range(34450, 34479):
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        sm.completeQuestNoRewards(39034)
        sm.giveSymbol(1712004, 1, 34478)
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Arcana prequests and received your #b#i1712004# #z1712004##k!")
        sm.warp(450005000)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
else:
    sm.startQuest(34450)
    sm.sendNext("The red fog created by Lucid has not yet dissipated. It looks like it will be some time before the city is completely free.")
    sm.sendNext("...What is that weird flapping sound?")
    sm.sendNext("You should follow the sound down the Lachelein canal.")
