from net.swordie.ms.constants import JobConstants

itemID = 2435301
equip = [
	1004172, #Maple Saint Cap
	1052758, #Maple Saint Suit
	1102691, #Maple Saint Cape
	1012471, #Maple Saint Gum
	1122280, #Maple Saint Pendant
]
weapon = [
	1212095, #Maple Saint Shining Rod
	1222089, #Maple Saint Soul Shooter
	1232089, #Maple Saint Devil Sword
	1242095, #Maple Saint Chain Sword
	1252092, #Maple Saint Scepter
	1302304, #Maple Saint Sword
	1312179, #Maple Saint Axe
	1322230, #Maple Saint Mace
	1332254, #Maple Saint Cutter
	1362115, #Maple Saint Cane
	1372201, #Maple Saint Wand
	1382239, #Maple Saint Staff
	1402229, #Maple Saint Two-Handed Sword
	1412158, #Maple Saint Two-Handed Axe
	1422165, #Maple Saint Maul
	1432194, #Maple Saint Spear
	1442248, #Maple Saint Polearm
	1452232, #Maple Saint Longbow
	1462219, #Maple Saint Crossbow
	1472241, #Maple Saint Stinger
	1482196, #Maple Saint Grip
	1492205, #Maple Saint Shooter
	1522118, #Maple Saint Twin Angels
	1532124, #Maple Saint Cannon
	1542107, #Maple Saint Katana
	1552109, #Maple Saint Fan
	1582007, #Titan Arms
	1262007, #Daemon Psy-limiter
	1272036, #Maple Saint Chain
	1282035, #Maple Saint Lucent Gauntlet
	1592007, #Ephesus Ancient Bow
	1292007, #Peaceful Ritual Fan
	1213007, #Pride
]

katara = 1342094 #Maple Saint Katara

claimItem = []
sm.setSpeakerID(9000193)

dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k? \r\n\r\n#fs14##e#rChoose wisely! You won't get a second chance.#k#n" % (itemID)
if sm.sendAskAccept(dialog):
    dialog = "Select the weapon you'd like to receive.\r\n\r\nYou can only claim each gift #ronce per character#k, so think carefully about what item you'd like to get it.\r\n\r\n"
    if katara != 0 and JobConstants.isDualBlade(chr.getJob()):
        dialog += "You are #rDual Blade#k, so you just need to #eselect the dagger and the #r#z%s##k will be added for you#n.\r\n\r\n" % (katara)
    dialog += "#e#z%s# Weapon List#n \r\n\r\n" % (itemID)
    for i in range(len(weapon)):
        dialog += "#L%s# #i%s#\t#z%s#\r\n" % (i, weapon[i], weapon[i])
    selection = sm.sendNext(dialog)

    claimItem.append(weapon[selection])
    if katara != 0 and JobConstants.isDualBlade(chr.getJob()):
        claimItem.append(katara)
    for i in range(len(equip)):
        claimItem.append(equip[i])

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