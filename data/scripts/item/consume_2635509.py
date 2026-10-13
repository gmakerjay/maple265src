# Arcane Symbol Selector Coupon
COUPON_ID = 2635509
emptySlot = sm.getEmptyInventorySlots(1) # Equip inventory
totalCoupons = sm.getQuantityOfItem(COUPON_ID)

if totalCoupons <= 0:
    sm.dispose()
elif emptySlot < 1:
    sm.sendSayOkay("Please make sure you have at least 1 empty slot in your #bEQUIP#k inventory.")
else:
    sm.setSpeakerID(3003104) # Rona
    text = "Please select the #bArcane Symbol#k you wish to receive:\r\n\r\n"
    text += "#b#L0# #i1712001# #z1712001##l\r\n"
    text += "#L1# #i1712002# #z1712002##l\r\n"
    text += "#L2# #i1712003# #z1712003##l\r\n"
    text += "#L3# #i1712004# #z1712004##l\r\n"
    text += "#L4# #i1712005# #z1712005##l\r\n"
    text += "#L5# #i1712006# #z1712006##l#k\r\n"
    
    sel = sm.sendNext(text)
    if 0 <= sel <= 5:
        symbolID = 1712001 + sel
        maxQty = min(totalCoupons, emptySlot)
        quantity = sm.sendAskNumber("How many #b#i" + str(symbolID) + "# #z" + str(symbolID) + "##k would you like to receive?\r\n(Available Coupons: " + str(totalCoupons) + ", Free Equip Slots: " + str(emptySlot) + ")", 1, 1, maxQty)
        if quantity > 0 and quantity <= totalCoupons:
            if sm.getEmptyInventorySlots(1) >= quantity:
                sm.consumeItem(COUPON_ID, quantity)
                sm.giveSymbol(symbolID, quantity)
                sm.sendSayOkay("You have successfully received #b#i" + str(symbolID) + "# #z" + str(symbolID) + "##k x " + str(quantity) + "!")
            else:
                sm.sendSayOkay("You do not have enough empty slots in your #bEQUIP#k inventory.")
