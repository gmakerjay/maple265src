from net.swordie.ms.constants import JobConstants

itemID = 2431394
equips = [
    #Warrior
    [
        1004422, #AbsoLab Knight Helm
        1052882, #AbsoLab Knight Suit
        1073030, #AbsoLab Knight Shoes
        1082636, #AbsoLab Knight Gloves
        1102775, #AbsoLab Knight Cape
        1152174, #AbsoLab Knight Shoulder
    ] ,
    #Mage
    [
        1004423, #AbsoLab Mage Crown
        1052887, #AbsoLab Mage Suit
        1073032, #AbsoLab Mage Shoes
        1082637, #AbsoLab Mage Gloves
        1102794, #AbsoLab Mage Cape
        1152176, #AbsoLab Mage Shoulder
    ],
    #Archer
    [
        1004424, #AbsoLab Archer Hood
        1052888, #AbsoLab Archer Suit
        1073033, #AbsoLab Archer Shoes
        1082638, #AbsoLab Archer Gloves
        1102795, #AbsoLab Archer Cape
        1152177, #AbsoLab Archer Shoulder
    ],
    #Thief
    [
        1004425, #AbsoLab Bandit Cap
        1052889, #AbsoLab Bandit Suit
        1073034, #AbsoLab Bandit Shoes
        1082639, #AbsoLab Bandit Gloves
        1102796, #AbsoLab Bandit Cape
        1152178, #AbsoLab Thief Shoulder
    ],
    #Pirate
    [
        1004426, #AbsoLab Pirate Fedora
        1052890, #AbsoLab Pirate Suit
        1073035, #AbsoLab Pirate Shoes
        1082640, #AbsoLab Pirate Gloves
        1102797, #AbsoLab Pirate Cape
        1152179, #AbsoLab Pirate Shoulder
    ]
]

weapon = [
    1212115, #AbsoLab Shining Rod
    1222109, #AbsoLab Soul Shooter
    1232109, #AbsoLab Desperado
    1242116, #AbsoLab Whip Blade
    1252093, #AbsoLab Scepter
    1262017, #AbsoLab Psy-limiter
    1302333, #AbsoLab Saber
    1312199, #AbsoLab Axe
    1322250, #AbsoLab Bit Hammer
    1332274, #AbsoLab Blade Lord
    1362135, #AbsoLab Forked Cane
    1372222, #AbsoLab Spellsong Wand
    1382259, #AbsoLab Spellsong Staff
    1402251, #AbsoLab Broad Saber
    1412177, #AbsoLab Broad Axe
    1422184, #AbsoLab Broad Hammer
    1432214, #AbsoLab Piercing Spear
    1442268, #AbsoLab Hellslayer
    1452252, #AbsoLab Sureshot Bow
    1462239, #AbsoLab Crossbow
    1472261, #AbsoLab Revenge Guard
    1482216, #Absolute Labs Blast Knuckle
    1492231, #AbsoLab Point Gun
    1522138, #AbsoLab Dual Bowguns
    1532144, #AbsoLab Blast Cannon
    1542108, #AbsoLab Katana
    1552110, #AbsoLab Summoner
    1582017, #AbsoLab Pile God
    1272016, #AbsoLab Chain
    1282016, #AbsoLab Lucent Gauntlet
    1292017, #AbsoLab Monster Ritual Fan
    1592019, #AbsoLab Ancient Bow
    1213017, #AbsoLab Bladecaster
    2048915, #AbsoLab Lucky Item Scroll
]

katara = 1342101 #AbsoLab Katara
claimItem = []
sm.setSpeakerID(9000193)

dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k? \r\n\r\n#fs14##e#rChoose wisely! You won't get a second chance.#k#n" % (itemID)
if sm.sendAskAccept(dialog):
    dialog = "Select the set you'd like to receive.\r\n\r\nYou can only claim each gift #ronce per character#k, so think carefully about what item you'd like to get it.\r\n\r\n"
    dialog += "#e#z%s# Set List#n \r\n\r\n" % (itemID)
    dialog += "#L0##b#e %s#n#k\r\n" % ("Warrior Set")
    dialog += "#L1##b#e %s#n#k\r\n" % ("Magician Set")
    dialog += "#L2##b#e %s#n#k\r\n" % ("Bowman Set")
    dialog += "#L3##b#e %s#n#k\r\n" % ("Thief Set")
    dialog += "#L4##b#e %s#n#k\r\n" % ("Pirate Set")
    selection = sm.sendNext(dialog)
    for item in equips[selection]:
        claimItem.append(item)

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
