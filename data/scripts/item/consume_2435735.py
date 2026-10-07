sm.setSpeakerID(2140001)
sm.flipDialogue()
if sm.sendAskYesNo("Do you want to activate the Arcane Stone now?\r\n\r\n#b(If you click Yes, you will begin recording hunting EXP.)#k"):
    sm.createQuestWithQRValue(1471, "on=1;u=0;exp=0")
    sm.createQuestWithQRValue(1473, "itemID=" + str(parentID))
    sm.openUIWithOption(1128, parentID)
    sm.consumeItem(parentID)