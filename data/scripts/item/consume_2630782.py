ITEM = 2630782
ITEM_REQ = 1
ARCANE = [
    1212120, # Arcane Umbra Shining Rod
    1213018, # Arcane
    1222113, # Arcane
    1212120, # Arcane
    1232113, # Arcane
    1242121, # Arcane
    1252098, # Arcane
    1262039, # Arcane
    1272017, # Arcane
    1272017, # Arcane
    1282017, # Arcane
    1292018, # Arcane
    1302343, # Arcane
    1312203, # Arcane
    1322255, # Arcane
    1332279, # Arcane
    1342104, # Arcane
    1362140, # Arcane
    1372228, # Arcane
    1382265, # Arcane
    1402259, # Arcane
    1412181, # Arcane
    1422189, # Arcane
    1432218, # Arcane
    1442274, # Arcane
    1452257, # Arcane
    1462243, # Arcane
    1462243, # Arcane
    1472265, # Arcane
    1482221, # Arcane
    1482234, # Arcane
    1492235, # Arcane
    1522143, # Arcane
    1532150, # Arcane
    1542117, # Arcane
    1552119, # Arcane
    1582023, # Arcane
    1592020, # Arcane
]
sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.flipDialogue()

dialog = "Please choose your Arcane weapon:\r\n"
for i in range(len(ARCANE)):
    dialog += "#L%d##b#e #i%s#\t#z%s##n#k\r\n" % (i, ARCANE[i], ARCANE[i])
dialog += "#L99##kNever mind."
selection = sm.sendNext(dialog)
if selection != 99:
    if not sm.hasItem(ITEM,ITEM_REQ):
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM,ITEM)
        sm.sendNext(req)
        #sm.dispose()
    elif sm.hasItem(ITEM,ITEM_REQ):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveItem(ARCANE[selection], 1)
            sm.consumeItem(ITEM,ITEM_REQ)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")
            #sm.dispose()