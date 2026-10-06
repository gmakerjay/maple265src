from net.swordie.ms.constants import JobConstants

itemID = 2430447
equips = [
     1003864, #Pearl Maple Hat
     1052613, #Pearl Maple Suit
     1102563, #Pearl Maple Cape
     1012377, #Pearl Maple Gum
     1122253, #Pearl Maple Pendant
     1132229, #Pearl Maple Buckle
]
weapon = [
    1212067, #Pearl Maple Rod
    1222062, #Pearl Maple Soul Shooter
    1232061, #Pearl Maple Devil Sword
    1242066, #Pearl Maple Chain Sword
    1252065, #Pearl Maple Scepter
    1302278, #Pearl Maple Sword
    1312156, #Pearl Maple Axe
    1322206, #Pearl Maple Mace
    1332228, #Pearl Maple Cutter
    1362093, #Pearl Maple Cane
    1372180, #Pearl Maple Wand
    1382212, #Pearl Maple Staff
    1402200, #Pearl Maple Two-handed Sword
    1412138, #Pearl Maple Two-handed Axe
    1422143, #Pearl Maple Maul
    1432170, #Pearl Maple Spear
    1442226, #Pearl Maple Polearm
    1452208, #Pearl Maple Longbow
    1462196, #Pearl Maple Crossbow
    1472217, #Pearl Maple Steer
    1482171, #Pearl Maple Grip
    1492182, #Pearl Maple Shooter
    1522097, #Pearl Maple Twin Angels
    1532101, #Pearl Maple Cannon
    1542069, #Pearl Maple Katana
    1552069, #Pearl Maple Fan
    1262001, #Trial Psy-limiter  
    1582001, #Hand Crusher
    1272001, #De Venus
    1282001, #Matis Lucent Gauntlet
    1592001, #Assur Ancient Bow
    1292001, #White Ritual Fan
    1213001, #Honor
]

katara = 0

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
    for i in range(len(equips)):
        claimItem.append(equips[i])

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