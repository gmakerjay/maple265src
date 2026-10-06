# Gold MVP Package:

NPC = 2007
LIST_ITEM = [
    [5121059, 5],
    [5390028, 15],
    [3700346, 1],
    [2023544, 5],
    [2023558, 5],
    [2434786, 25],
    [2434789, 15],
    [2022531, 10],
    [1115013, 1],
    [1115101, 1],
    [1102872, 1],
    [1142913, 1],
    [1202236, 1],
]
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5) >= 3 and sm.getEmptyInventorySlots(3) >= 1 and sm.getEmptyInventorySlots(2) >= 5 and sm.getEmptyInventorySlots(1) >= 5:
    dialog = "Congratulations on achieving Gold MVP!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
    dialog += "#b #e1. 500,000,000 mesos #n #k\r\n"
    dialog += "#b #e2. #z5680047# (2 day) x1 #n #k\r\n"
    for i in range(len(LIST_ITEM)):
        dialog += "#b #e" + str(i + 3) + ". #z%s# x%s #n #k\r\n" % (LIST_ITEM[i][0], LIST_ITEM[i][1])
    if sm.sendAskAccept(dialog):
        sm.consumeItem(2434726)
        for i in LIST_ITEM:
            chr.addStackableWithSlotMaxItemToInventory(i[0], i[1], i[1], "month", 1)
        chr.addItemToInventory(5680047, 1, "day", 2)
        chr.sendRewardToChar(0, 0, 500000000, "Gold MVP maintenance reward.", 30)
        chr.sendPacketRewards()

else:
    sm.sendSayOkay("Please make more space in your SETUP inventory.")