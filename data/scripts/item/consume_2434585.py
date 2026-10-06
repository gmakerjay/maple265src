ITEM = 2434585
ITEM_REQ = 5
TRIXTER_BOTTOM = [
    1062165, #Trixter Warrior Pants
    1062166, #Trixter Dunwitch Pants
    1062167, #Trixter Ranger Pants
    1062168, #Trixter Assassin Pants
    1062169, #Trixter Wanderer Pants
]

sm.removeEscapeButton()
sm.setPlayerAsSpeaker()
sm.flipDialogue()

dialog = "You can get a #bLv. 150 Trixter Bottom#k with #b%s #z%s# #i%s#\r\n" % (ITEM_REQ,ITEM,ITEM)
for i in range(len(TRIXTER_BOTTOM)):
    dialog += "#L%d##b#e #i%s#\t#z%s##n#k\r\n" % (i,TRIXTER_BOTTOM[i],TRIXTER_BOTTOM[i])
dialog += "#L99##kNever mind."
selection = sm.sendNext(dialog)
if selection != 99:
    if not sm.hasItem(ITEM,ITEM_REQ):    
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM,ITEM)
        sm.sendNext(req)
    elif sm.hasItem(ITEM,ITEM_REQ):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveItem(TRIXTER_BOTTOM[selection], 1)
            sm.consumeItem(ITEM,ITEM_REQ)
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")