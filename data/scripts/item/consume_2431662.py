

import random

NPC = 1540460
ITEM_TRADE = 2431662
ITEM_REQ = 10

VON_LEON = [
    2591065, #Beefy Von Leon Soul"
    2591066, #Swift Von Leon Soul"
    2591067, #Clever Von Leon Soul"
    2591068, #Fortuitous Von Leon Soul"
    2591069, #Flashy Von Leon Soul"
    2591070, #Potent Von Leon Soul"
    2591071, #Radiant Von Leon Soul"
    2591072, #Hearty Von Leon Soul"
    2591073, #Sharp Von Leon Soul"
    2591074, #Destructive Von Leon Soul"
    2591086, #Magnificent Von Leon Soul"
	]
PERCENT = random.randint(1,100)
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()

selection = sm.sendSay("You can trade required items for one of the following random items \r\n"
                            "#L0##bSoul Exchange.#l\r\n"
                            "#L1##bList Item.#l \r\n"
                            "#L2##kNever mind.#l\r\n")
if selection == 0:
    if not sm.hasItem(ITEM_TRADE,ITEM_REQ):
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
        sm.sendNext(req)
    elif sm.hasItem(ITEM_TRADE,ITEM_REQ):
        if sm.getEmptyInventorySlots(2)>= 1:
            if PERCENT == 100:
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (VON_LEON[len(VON_LEON)-1],VON_LEON[len(VON_LEON)-1])
                chr.addItemToInventory(VON_LEON[len(VON_LEON)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(VON_LEON[0],VON_LEON[len(VON_LEON)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(VON_LEON)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (VON_LEON[i],VON_LEON[i])
    sm.sendNext(list_item)
            