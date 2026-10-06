

import random

NPC = 1540460
ITEM_TRADE = 2433844
ITEM_REQ = 10

GOLD_DRAGON = [
    2591468, #Beefy Gold Dragon Soul"
    2591469, #Swift Gold Dragon Soul"
    2591470, #Clever Gold Dragon Soul"
    2591471, #Fortuitous Gold Dragon Soul"
    2591472, #Flashy Gold Dragon Soul"
    2591473, #Potent Gold Dragon Soul"
    2591474, #Radiant Gold Dragon Soul"
    2591475, #Hearty Gold Dragon Soul"
    2591484, #Magnificent Gold Dragon Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (GOLD_DRAGON[len(GOLD_DRAGON)-1],GOLD_DRAGON[len(GOLD_DRAGON)-1])
                chr.addItemToInventory(GOLD_DRAGON[len(GOLD_DRAGON)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(GOLD_DRAGON[0],GOLD_DRAGON[len(GOLD_DRAGON)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(GOLD_DRAGON)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (GOLD_DRAGON[i],GOLD_DRAGON[i])
    sm.sendNext(list_item)
            