

import random

NPC = 1540460
ITEM_TRADE = 2431896
ITEM_REQ = 10

HILLA = [
    2591225, #Beefy Hilla Soul"
    2591226, #Swift Hilla Soul" 
    2591227, #Clever Hilla Soul" 
    2591228, #Fortuitous Hilla Soul" 
    2591229, #Flashy Hilla Soul" 
    2591230, #Potent Hilla Soul" 
    2591231, #Radiant Hilla Soul" 
    2591232, #Hearty Hilla Soul" 
    2591233, #Magnificent Hilla Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (HILLA[len(HILLA)-1],HILLA[len(HILLA)-1])
                chr.addItemToInventory(HILLA[len(HILLA)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(HILLA[0],HILLA[len(HILLA)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(HILLA)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (HILLA[i],HILLA[i])
    sm.sendNext(list_item)
            