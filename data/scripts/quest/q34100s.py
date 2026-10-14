# [Vanishing Journey] Amnesiac Temple Keeper Kao
# Quest 34100 (Start)
# Kao (3003131)

KAO = 3003131

sm.setSpeakerID(KAO)
sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1:
        for qid in range(34100, 34121):
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        sm.completeQuestNoRewards(34128)
        sm.completeQuestNoRewards(34162)
        sm.completeQuestNoRewards(28857)
        sm.giveSymbol(1712001, 1, 34120)
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Vanishing Journey prequests and received your #b#i1712001# #z1712001##k!")
        sm.warp(450001000)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
else:
    sm.startQuest(34100)
    sm.sendNext("The resentment of the townspeople... Their cold attitude... The quiet town... It wasn't like that in the beginning.")
    sm.sendNext("They were delicate beings that lived at peace with their few remaining memories...")
    sm.sendNext("It's all my fault. I ruined everything.")
