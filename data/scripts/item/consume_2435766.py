if sm.canHold(5450000):
    sm.giveItem(5450000, 1, "day", 1)
    sm.consumeItem(2435766)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")