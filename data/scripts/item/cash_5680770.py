empltySlot = sm.getEmptyInventorySlots(1)
iMax = sm.getQuantityOfItem(5680770)

sm.setSpeakerID(3003462)
sel = sm.sendNext("Please select the Arcane Symbol you want:\r\n#b#L0# #i1712001# #z1712001# #l\r\n#L1# #i1712002# #z1712002# #l\r\n#L2# #i1712003# #z1712003# #l\r\n#L3# #i1712004# #z1712004# #l\r\n#L4# #i1712005# #z1712005# #l\r\n#L5# #i1712006# #z1712006# #l\r\n#k")
symbolID = sel + 1712001

if iMax >= empltySlot:
    quantity = sm.sendAskNumber("How many #b#v" + str(symbolID) + "# #t" + str(symbolID) + "#(s)#k do you wish to open? Max: " + str(empltySlot), 1, 1, empltySlot)
    if sm.canHold(symbolID, quantity):
        sm.giveSymbol(symbolID, quantity)
        sm.consumeItem(5680770, quantity)
    else:
        sm.sendSayOkay("Please check your EQUIP inventory.")
elif iMax < empltySlot:
    quantity = sm.sendAskNumber("How many #b#v" + str(symbolID) + "# #t" + str(symbolID) + "#(s)#k do you wish to open? Max: " + str(iMax), 1, 1, iMax)
    if sm.canHold(symbolID, quantity):
        sm.giveSymbol(symbolID, quantity)
        sm.consumeItem(5680770, quantity)
    else:
        sm.sendSayOkay("Please check your EQUIP inventory.")