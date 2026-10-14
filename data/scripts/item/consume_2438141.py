# Arcane Symbol Selector Coupon
COUPON_ID = 2438141
PER_COUPON = 1
SPEAKER_ID = 9010000 # Maple Administrator

totalCoupons = sm.getQuantityOfItem(COUPON_ID)
emptySlots = sm.getEmptyInventorySlots(1) # Equip inventory

if totalCoupons <= 0:
    sm.dispose()
elif emptySlots < PER_COUPON:
    sm.setSpeakerID(SPEAKER_ID)
    sm.sendSayOkay("Please make sure you have at least " + str(PER_COUPON) + " empty slot(s) in your #bEQUIP#k inventory.")
else:
    sm.setSpeakerID(SPEAKER_ID)
    text = "Please select the #bArcane Symbol#k you wish to receive:\r\n\r\n"
    text += "#b#L0# #i1712001# #z1712001##l\r\n"
    text += "#L1# #i1712002# #z1712002##l\r\n"
    text += "#L2# #i1712003# #z1712003##l\r\n"
    text += "#L3# #i1712004# #z1712004##l\r\n"
    text += "#L4# #i1712005# #z1712005##l\r\n"
    text += "#L5# #i1712006# #z1712006##l#k\r\n"

    sel = sm.sendNext(text)
    if sel is not None and 0 <= sel <= 5:
        symbolID = 1712001 + sel
        maxCoupons = min(totalCoupons, emptySlots // PER_COUPON)
        if maxCoupons < 1:
            sm.sendSayOkay("You do not have enough space in your #bEQUIP#k inventory.")
        elif totalCoupons == 1 or maxCoupons == 1:
            symbolsToGive = PER_COUPON
            if sm.sendAskYesNo("Would you like to use 1 coupon to receive #b#i" + str(symbolID) + "# #t" + str(symbolID) + "# x " + str(symbolsToGive) + "#k?"):
                if sm.getEmptyInventorySlots(1) >= symbolsToGive and sm.getQuantityOfItem(COUPON_ID) >= 1:
                    sm.consumeItem(COUPON_ID, 1)
                    remaining = symbolsToGive
                    while remaining > 0:
                        batch = min(remaining, 20)
                        sm.giveSymbol(symbolID, batch)
                        remaining -= batch
                    sm.sendSayOkay("You have successfully received #b#i" + str(symbolID) + "# #t" + str(symbolID) + "##k x " + str(symbolsToGive) + "!")
                else:
                    sm.sendSayOkay("Please check your inventory space.")
        else:
            couponsToUse = sm.sendAskNumber("How many coupons would you like to use?\r\n(Each coupon grants " + str(PER_COUPON) + " symbols. Available Coupons: " + str(totalCoupons) + ", Free Equip Slots: " + str(emptySlots) + ")", 1, 1, maxCoupons)
            if couponsToUse is not None and 1 <= couponsToUse <= maxCoupons:
                symbolsToGive = couponsToUse * PER_COUPON
                if sm.getEmptyInventorySlots(1) >= symbolsToGive and sm.getQuantityOfItem(COUPON_ID) >= couponsToUse:
                    sm.consumeItem(COUPON_ID, couponsToUse)
                    remaining = symbolsToGive
                    while remaining > 0:
                        batch = min(remaining, 20)
                        sm.giveSymbol(symbolID, batch)
                        remaining -= batch
                    sm.sendSayOkay("You have successfully received #b#i" + str(symbolID) + "# #t" + str(symbolID) + "##k x " + str(symbolsToGive) + "!")
                else:
                    sm.sendSayOkay("You do not have enough empty slots in your #bEQUIP#k inventory.")
