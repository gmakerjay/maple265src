# Arcane Symbol: Lachelein Coupon
COUPON_ID = 2635511
SYMBOL_ID = 1712003
SPEAKER_ID = 3003209 # Gray Mask

totalCoupons = sm.getQuantityOfItem(COUPON_ID)
emptySlots = sm.getEmptyInventorySlots(1) # Equip inventory

if totalCoupons <= 0:
    sm.dispose()
elif emptySlots < 1:
    sm.setSpeakerID(SPEAKER_ID)
    sm.sendSayOkay("Please make sure you have at least 1 empty slot in your #bEQUIP#k inventory.")
else:
    sm.setSpeakerID(SPEAKER_ID)
    if totalCoupons == 1:
        if sm.sendAskYesNo("Would you like to use #b#i" + str(COUPON_ID) + "# #t" + str(COUPON_ID) + "##k to receive #b#i" + str(SYMBOL_ID) + "# #t" + str(SYMBOL_ID) + "##k?"):
            if sm.getEmptyInventorySlots(1) >= 1 and sm.getQuantityOfItem(COUPON_ID) >= 1:
                sm.consumeItem(COUPON_ID, 1)
                sm.giveSymbol(SYMBOL_ID, 1)
                sm.sendSayOkay("You have received 1 #b#i" + str(SYMBOL_ID) + "# #t" + str(SYMBOL_ID) + "##k!")
            else:
                sm.sendSayOkay("Please make sure you have enough empty slots in your #bEQUIP#k inventory.")
    else:
        maxQty = min(totalCoupons, emptySlots)
        quantity = sm.sendAskNumber("How many #b#i" + str(SYMBOL_ID) + "# #t" + str(SYMBOL_ID) + "##k would you like to receive?\r\n(Available Coupons: " + str(totalCoupons) + ", Free Equip Slots: " + str(emptySlots) + ")", 1, 1, maxQty)
        if quantity is not None and 1 <= quantity <= totalCoupons:
            if sm.getEmptyInventorySlots(1) >= quantity and sm.getQuantityOfItem(COUPON_ID) >= quantity:
                sm.consumeItem(COUPON_ID, quantity)
                remaining = quantity
                while remaining > 0:
                    batch = min(remaining, 20)
                    sm.giveSymbol(SYMBOL_ID, batch)
                    remaining -= batch
                sm.sendSayOkay("You have successfully received #b#i" + str(SYMBOL_ID) + "# #t" + str(SYMBOL_ID) + "##k x " + str(quantity) + "!")
            else:
                sm.sendSayOkay("You do not have enough empty slots in your #bEQUIP#k inventory.")
