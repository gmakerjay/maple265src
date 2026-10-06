

import random

NPC = 1540460
ITEM_TRADE = 2433592
ITEM_REQ = 10

VELLUM = [
    2591410, #Beefy Vellum Soul"
    2591411, #Swift Vellum Soul"
    2591412, #Clever Vellum Soul"
    2591413, #Fortuitous Vellum Soul"
    2591414, #Flashy Vellum Soul"
    2591415, #Potent Vellum Soul"
    2591416, #Radiant Vellum Soul"
    2591417, #Hearty Vellum Soul"
    2591418, #Magnificent Vellum Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (VELLUM[len(VELLUM)-1],VELLUM[len(VELLUM)-1])
                chr.addItemToInventory(VELLUM[len(VELLUM)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(VELLUM[0],VELLUM[len(VELLUM)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(VELLUM)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (VELLUM[i],VELLUM[i])
    sm.sendNext(list_item)
            