# Diamond MVP Package:

NPC = 2007
# Rewards:
LIST_ITEM = [
    [5121060, 10],
    [5390029, 20],
    [2023544, 5],
    [2023558, 10],
    [2434787, 30],
    [2434790, 20],
    [2434710, 1],
    [2022531, 15],
    [3014011, 1],
    [3700347, 1],
    [1142914, 1],
    [1115014, 1],
    [1115102, 1],
    [1102872, 1],
    [1202236, 1],
    [5062024, 5]
]
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5) >= 4 and sm.getEmptyInventorySlots(3) >= 2 and sm.getEmptyInventorySlots(2) >= 6 and sm.getEmptyInventorySlots(1) >= 4:
    dialog = "Congratulations on achieving Diamond MVP!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
    dialog += "#b #e1. 1,000,000,000 mesos #n #k\r\n"
    dialog += "#b #e2. #z5680047# (5 day) x1 #n #k\r\n"
    for i in range(len(LIST_ITEM)):
        dialog += "#b #e" + str(i + 3) + ". #z%s# x%s #n #k\r\n" % (LIST_ITEM[i][0], LIST_ITEM[i][1])
    if sm.sendAskAccept(dialog):
        sm.consumeItem(2434727)
        for i in LIST_ITEM:
            chr.addStackableWithSlotMaxItemToInventory(i[0], i[1], i[1], "month", 1)
        chr.addItemToInventory(5680047, 1, "day", 5)
        chr.sendRewardToChar(0, 0, 1000000000, "Diamond MVP maintenance reward.", 30)
        chr.sendPacketRewards()

else:
    sm.sendSayOkay("Please make more space in your inventory.")