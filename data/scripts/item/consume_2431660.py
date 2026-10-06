# 2431710 - Zakum - consume_2431710

import random

NPC = 1540460
ITEM_TRADE = 2431660
ITEM_REQ = 10

BALROG = [
    2591045, #Beefy Balrog Soul"
    2591046, #Swift Balrog Soul"
    2591047, #Clever Balrog Soul"
    2591048, #Fortuitous Balrog Soul"
    2591049, #Flashy Balrog Soul"
    2591050, #Powerful Balrog Soul"
    2591051, #Radiant Lotus Soul"
    2591052, #Hearty Balrog Soul"
    2591053, #Sharp Balrog Soul"
    2591054, #Destructive Balrog Soul"
    2591085, #Magnificent Balrog Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (BALROG[len(BALROG)-1],BALROG[len(BALROG)-1])
                chr.addItemToInventory(BALROG[len(BALROG)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(BALROG[0],BALROG[len(BALROG)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(BALROG)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (BALROG[i],BALROG[i])
    sm.sendNext(list_item)
            