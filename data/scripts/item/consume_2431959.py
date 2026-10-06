if sm.canHold(5450003):
    sm.giveItem(5450003, 1, "day", 1)
    sm.consumeItem(2431959)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")