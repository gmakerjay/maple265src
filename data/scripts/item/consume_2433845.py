

import random

NPC = 1540460
ITEM_TRADE = 2433845
ITEM_REQ = 10

RED_TIGER = [
    2591476, #Beefy Red Tiger Soul"
    2591477, #Swift Red Tiger Soul"
    2591478, #Clever Red Tiger Soul"
    2591479, #Fortuitous Red Tiger Soul"
    2591480, #Flashy Red Tiger Soul"
    2591481, #Potent Red Tiger Soul"
    2591482, #Radiant Red Tiger Soul"
    2591483, #Hearty Red Tiger Soul"
    2591485, #Magnificent Red Tiger Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (RED_TIGER[len(RED_TIGER)-1],RED_TIGER[len(RED_TIGER)-1])
                chr.addItemToInventory(RED_TIGER[len(RED_TIGER)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(RED_TIGER[0],RED_TIGER[len(RED_TIGER)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(RED_TIGER)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (RED_TIGER[i],RED_TIGER[i])
    sm.sendNext(list_item)
            