from net.swordie.ms.constants import JobConstants

itemID = 2435302
weapon = [
    1212101, #Utgard Shining Rod
    1213014, #Utgard Restraint
    1222095, #Utgard Dragon Soul
    1232095, #Utgard Desperado
    1242102, #Utgard Energy Chain
    1252086, #Utgard Shining Stick
    1262011, #Utgard Psy-limiter
    1272013, #Utgard Chain
    1282013, #Utgard Lucent Gauntlet
    1292014, #Utgard Giant Ritual Fan
    1302315, #Utgard Saber
    1312185, #Utgard Axe
    1322236, #Utgard Hair
    1332260, #Utgard Dagger
    1362121, #Utgard Cane
    1372207, #Utgard Wand
    1382245, #Utgard Staff
    1402236, #Utgard Two-handed Sword
    1412164, #Utgard Two-handed Axe
    1422171, #Utgard Two-handed Hammer
    1432200, #Utgard Spear
    1442254, #Utgard Hellslayer
    1452238, #Utgard Bow
    1462225, #Utgard Crossbow
    1472247, #Utgard Guards
    1482202, #Utgard Claw
    1492212, #Utgard Pistol
    1522124, #Utgard Dual Bowguns
    1532130, #Utgard Siege Gun
    1552102, #Utgard Fan
    1582011, #Utgard Hrimthurs
    1592016, #Utgard Ancient Bow
    1542101, #Utgard Katana
]

katara = 1342100, #Utgard Katara

claimItem = []
sm.setSpeakerID(9000193)

dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k? \r\n\r\n#fs14##e#rChoose wisely! You won't get a second chance.#k#n" % (itemID)
if sm.sendAskAccept(dialog):
    dialog = "Select the weapon you'd like to receive.\r\n\r\nYou can only claim each gift #ronce per character#k, so think carefully about what item you'd like to get it.\r\n\r\n"
    if katara != 0 and JobConstants.isDualBlade(chr.getJob()):
        dialog += "You are #rDual Blade#k, so you just need to #eselect the dagger and the #r#z%s##k will be added for you#n.\r\n\r\n" % (katara)
    dialog += "#e#z%s# Item List#n \r\n\r\n" % (itemID)
    for i in range(len(weapon)):
        dialog += "#L%s# #i%s#\t#z%s#\r\n" % (i, weapon[i], weapon[i])
    selection = sm.sendNext(dialog)

    claimItem.append(weapon[selection])
    if katara != 0 and JobConstants.isDualBlade(chr.getJob()):
        claimItem.append(katara)

    dialog = "You selected #b#z%s##k as your reward. Would you like to claim your gift as #r#h0##k\r\n\r\n" % (weapon[selection])
    dialog += "#e#z%s# Item List#n \r\n\r\n" % (itemID)
    for i in range(len(claimItem)):
        dialog += "#i%s#\t#z%s#\r\n" % (claimItem[i], claimItem[i])
    if sm.sendAskAccept(dialog):
        if sm.getEmptyInventorySlots(1)>= len(claimItem):
            sm.consumeItem(itemID)
            for item in claimItem:
                sm.giveItem(item)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")