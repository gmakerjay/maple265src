# 37701 - [Yum Yum] A Message From Chu Chu Village
SPEAKER = 3004726
sm.setSpeakerID(SPEAKER)
if sm.sendAskYesNo("Would you like to skip the #b#eYum Yum Island#n#k storyline quests and unlock the bonus Chu Chu Island daily rewards immediately?\r\n\r\n#b(Select Yes to complete all Yum Yum Island quests and receive 20x #i1712002# #z1712002#.)#k"):
    if sm.getEmptyInventorySlots(2) >= 1:
        for q in range(37700, 37728):
            sm.completeQuestNoRewards(q)
        sm.giveItem(2635510, 20)
        sm.sendSayOkay("All #bYum Yum Island#k quests have been completed! You received #b#i2635510# #z2635510# x 20#k in your USE inventory.")
    else:
        sm.sendSayOkay("Please make at least 1 empty slot in your USE inventory.")
else:
    if sm.sendAskAccept("A message arrived from Chief Lyon of Chu Chu Village. It seems like he has a favor to ask of you."):
        sm.startQuest(37701)
