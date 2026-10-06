ITEM = 2434584
ITEM_REQ = 5
EAGLE_TOP = [
    1042254, #Eagle Eye Warrior Armor
    1042255, #Eagle Eye Dunwitch Robe
    1042256, #Eagle Eye Ranger Cowl
    1042257, #Eagle Eye Assassin Shirt
    1042258, #Eagle Eye Wanderer Coat
]

sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.flipDialogue()

dialog = "You can get a #bLv. 150 Eagle Eye Top#k with #b%s #z%s# #i%s#\r\n" % (ITEM_REQ,ITEM,ITEM)
for i in range(len(EAGLE_TOP)):
    dialog += "#L%d##b#e #i%s#\t#z%s##n#k\r\n" % (i,EAGLE_TOP[i],EAGLE_TOP[i])
dialog += "#L99##kNever mind."
selection = sm.sendNext(dialog)
if selection != 99:
    if not sm.hasItem(ITEM,ITEM_REQ):    
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM,ITEM)
        sm.sendNext(req)
    elif sm.hasItem(ITEM,ITEM_REQ):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveItem(EAGLE_TOP[selection], 1)
            sm.consumeItem(ITEM,ITEM_REQ)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")