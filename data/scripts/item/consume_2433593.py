

import random

NPC = 1540460
ITEM_TRADE = 2433593
ITEM_REQ = 10

LOTUS = [
    2591419, #Beefy Lotus Soul"
    2591420, #Swift Lotus Soul"
    2591421, #Clever Lotus Soul"
    2591422, #Fortuitous Lotus Soul"
    2591423, #Flashy Lotus Soul"
    2591424, #Potent Lotus Soul"
    2591425, #Radiant Lotus Soul"
    2591426, #Hearty Lotus Soul"
    2591427, #Magnificent Lotus Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (LOTUS[len(LOTUS)-1],LOTUS[len(LOTUS)-1])
                chr.addItemToInventory(LOTUS[len(LOTUS)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(LOTUS[0],LOTUS[len(LOTUS)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(LOTUS)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (LOTUS[i],LOTUS[i])
    sm.sendNext(list_item)
            