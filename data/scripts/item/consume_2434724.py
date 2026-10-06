# Bronze MVP Package:

NPC = 2007
LIST_ITEM = [
    [5390026, 10],
    [3700344, 1],
    [2023544, 10],
    [2023558, 10],
    [2434784, 20],
    [2023544, 5],
    [1202236, 1]
]
sm.setSpeakerID(NPC)
if sm.getEmptyInventorySlots(5) >= 1 and sm.getEmptyInventorySlots(3) >= 1 and sm.getEmptyInventorySlots(2) >= 4 and sm.getEmptyInventorySlots(1) >= 3:
    dialog = "Congratulations on achieving Bronze MVP!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n"
    for i in range(len(LIST_ITEM)):
        dialog += "#b #e" + str(i + 1) + ". #z%s# x%s #n #k\r\n" % (LIST_ITEM[i][0], LIST_ITEM[i][1])
    if sm.sendAskAccept(dialog):
        for i in LIST_ITEM:
            chr.addStackableWithSlotMaxItemToInventory(i[0], i[1], i[1], "month", 1)
        sm.consumeItem(2434724)

else:
    sm.sendSayOkay("Please make more space in your inventory.")