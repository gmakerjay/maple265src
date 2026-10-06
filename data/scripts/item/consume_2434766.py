if sm.canHold(5450007):
    sm.giveItem(5450007, 1, "day", 7)
    sm.consumeItem(2434766)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")