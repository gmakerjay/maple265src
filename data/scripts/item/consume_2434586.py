ITEM = 2434586
ITEM_REQ = 5
ROYAL_HAT = [
    1003797, #Royal Warrior Helm
    1003798, #Royal Dunwitch Hat
    1003799, #Royal Ranger Beret
    1003800, #Royal Assassin Hood
    1003801, #Royal Wanderer Hat
]
sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.flipDialogue()

dialog = "You can get a #bLv. 150 Royal Hat#k with #b%s #z%s# #i%s#\r\n" % (ITEM_REQ,ITEM,ITEM)
for i in range(len(ROYAL_HAT)):
    dialog += "#L%d##b#e #i%s#\t#z%s##n#k\r\n" % (i, ROYAL_HAT[i], ROYAL_HAT[i])
dialog += "#L99##kNever mind."
selection = sm.sendNext(dialog)
if selection != 99:
    if not sm.hasItem(ITEM,ITEM_REQ):    
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ, ITEM, ITEM)
        sm.sendNext(req)
    elif sm.hasItem(ITEM,ITEM_REQ):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveItem(ROYAL_HAT[selection], 1)
            sm.consumeItem(ITEM,ITEM_REQ)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")