

import random

NPC = 1540460
ITEM_TRADE = 2432578
ITEM_REQ = 10

VICIOUS_HUNTER = [
    2591324, #Beefy Vicious Hunter Soul"
    2591325, #Swift Vicious Hunter Soul" 
    2591326, #Clever Vicious Hunter Soul" 
    2591327, #Fortuitous Vicious Hunter Soul" 
    2591328, #Flashy Vicious Hunter Soul" 
    2591329, #Potent Vicious Hunter Soul" 
    2591330, #Radiant Vicious Hunter Soul" 
    2591331, #Hearty Vicious Hunter Soul" 
    2591332, #Magnificent Vicious Hunter Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (VICIOUS_HUNTER[len(VICIOUS_HUNTER)-1],VICIOUS_HUNTER[len(VICIOUS_HUNTER)-1])
                chr.addItemToInventory(VICIOUS_HUNTER[len(VICIOUS_HUNTER)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(VICIOUS_HUNTER[0],VICIOUS_HUNTER[len(VICIOUS_HUNTER)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(VICIOUS_HUNTER)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (VICIOUS_HUNTER[i],VICIOUS_HUNTER[i])
    sm.sendNext(list_item)
            