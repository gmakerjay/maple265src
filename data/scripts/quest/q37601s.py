# 37601 - [Reverse City] What Washed Up
LEGATO = 3003111
sm.setSpeakerID(LEGATO)
if sm.sendAskYesNo("Would you like to skip the #b#eReverse City#n#k storyline quests and unlock the bonus Vanishing Journey daily rewards immediately?\r\n\r\n#b(Select Yes to complete all Reverse City quests and receive 20x #i1712001# #z1712001#.)#k"):
    if sm.getEmptyInventorySlots(2) >= 1:
        for q in range(37600, 37621):
            sm.completeQuestNoRewards(q)
        sm.giveItem(2635509, 20)
        sm.sendSayOkay("All #bReverse City#k quests have been completed! You received #b#i2635509# #z2635509# x 20#k in your USE inventory.")
    else:
        sm.sendSayOkay("Please make at least 1 empty slot in your USE inventory.")
else:
    if sm.sendAskAccept("It seems #bLegato#k in #rNameless Town#k has something to say about an item that washed up on the river."):
        sm.startQuest(37601)
        sm.completeQuest(37601)
