ITEM = 2434587
ITEM_REQ = 15
FAFNIR = [
    1212063, #Fafnir Mana Cradle
    1222058, #Fafnir Angelic Shooter
    1232057, #Fafnir Death Bringer
    1242060, #Fafnir Split Edge
    1242061, #Fafnir Split Edge
    1252015, #Fafnir Scepter
    1262016, #Fafnir Psy-limiter
    1302275, #Fafnir Mistilteinn
    1312153, #Fafnir Twin Cleaver
    1322203, #Fafnir Guardian Hammer
    1332225, #Fafnir Damascus
    1342082, #Fafnir Rapid Edge
    1362090, #Fafnir Claire Ciel
    1372177, #Fafnir Mana Taker
    1382208, #Fafnir Mana Crown
    1402196, #Fafnir Penitent Tears
    1412135, #Fafnir Battle Cleaver
    1422140, #Fafnir Lightning Striker
    1432167, #Fafnir Brionak
    1442223, #Fafnir Moon Glaive
    1452205, #Fafnir Wind Chaser
    1462193, #Fafnir Windwing Shooter
    1472214, #Fafnir Risk Holder
    1482168, #Fafnir Perry Talon
    1492179, #Fafnir Zeliska
    1522094, #Fafnir Dual Windwing
    1532098, #Fafnir Lost Cannon
    1542063, #Fafnir Raven Ring
    1552063, #Fafnir Indigo Flash
    1582016, #Fafnir Big Mountain
    1213016, #Fafnir Mercy
    1213016, #Fafnir Mercy
    1213016, #Fafnir Mercy
    1213016, #Fafnir Mercy
    1213016, #Fafnir Mercy
    1592040, #Fafnir Ancient Bow
    1282015, #Fafnir Lucent Gauntlet
    1292016, #Fafnir Dragon Ritual Fan
    1272015 #Fafnir Chain
]
sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.flipDialogue()

dialog = "You can get a #bLv. 150 Fafnir Weapon#k with #b15 #z%s# #i%s#\r\n" % (ITEM,ITEM)
for i in range(len(FAFNIR)):
    dialog += "#L%d##b#e #i%s#\t#z%s##n#k\r\n" % (i, FAFNIR[i], FAFNIR[i])
dialog += "#L99##kNever mind."
selection = sm.sendNext(dialog)
if selection != 99:
    if not sm.hasItem(ITEM,ITEM_REQ):    
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM,ITEM)
        sm.sendNext(req)
    elif sm.hasItem(ITEM,ITEM_REQ):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveItem(FAFNIR[selection], 1)
            sm.consumeItem(ITEM,ITEM_REQ)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")