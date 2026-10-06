

import random

NPC = 1540460
ITEM_TRADE = 2431711
ITEM_REQ = 10

CYGNUS = [
    2591075, #Beefy Cygnus Soul"
    2591076, #Swift Cygnus Soul"
    2591077, #Clever Cygnus Soul"
    2591078, #Fortuitous Cygnus Soul"
    2591079, #Flashy Cygnus Soul"
    2591080, #Potent Cygnus Soul"
    2591081, #Radiant Cygnus Soul"
    2591082, #Hearty Cygnus Soul"
    2591088, #Magnificent Cygnus Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (CYGNUS[len(CYGNUS)-1],CYGNUS[len(CYGNUS)-1])
                chr.addItemToInventory(CYGNUS[len(CYGNUS)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(CYGNUS[0],CYGNUS[len(CYGNUS)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(CYGNUS)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (CYGNUS[i],CYGNUS[i])
    sm.sendNext(list_item)
            