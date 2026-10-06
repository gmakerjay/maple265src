# Silver MVP Package:

NPC = 2007
LIST_ITEM = [
    [5121058, 5],
    [5390027, 12],
    [3700345, 1],
    [2023544, 5],
    [2023558, 5],
    [2434785, 20],
    [2434788, 12],
    [2022531, 10],
    [1115012, 1],
    [1115100, 1],
    [1202236, 1]
]
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5) >= 2 and sm.getEmptyInventorySlots(3) >= 1 and sm.getEmptyInventorySlots(2) >= 5 and sm.getEmptyInventorySlots(1) >= 3:
    dialog = "Congratulations on achieving Silver MVP!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
    dialog += "#b #e1. 100,000,000 mesos #n #k\r\n"
    for i in range(len(LIST_ITEM)):
        dialog += "#b #e" + str(i + 2) + ". #z%s# x%s #n #k\r\n" % (LIST_ITEM[i][0], LIST_ITEM[i][1])
    if sm.sendAskAccept(dialog):
        for i in LIST_ITEM:
            chr.addStackableWithSlotMaxItemToInventory(i[0], i[1], i[1], "month", 1)
        chr.sendRewardToChar(0, 0, 100000000, "Silver MVP maintenance reward.", 30)
        sm.consumeItem(2434725)

else:
    sm.sendSayOkay("Please make more space in your inventory.")