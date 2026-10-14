# [Chu Chu Island] Welcome to Chu Chu Island
# Quest 34200 (Start)

from net.swordie.ms.constants import JobConstants

sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1:
        for qid in range(34200, 34219):
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        sm.completeQuestNoRewards(39013)
        sm.giveSymbol(1712002, 1, 34218)
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Chu Chu Island prequests and received your #b#i1712002# #z1712002##k!")
        sm.warp(450002000)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
else:
    if sm.getFieldID() == 450002201:
        sm.startQuest(34200)
        sm.completeQuest(34200)
        sm.warpInstanceOut(chr, 450002000)
    else:
        if JobConstants.isDemonAvenger(chr.getJob()):
            sm.warpInstanceIn(chr, 450002201)
        else:
            sm.warpInstanceIn(chr, 450002200)
