

import random

NPC = 1540460
ITEM_TRADE = 2432577
ITEM_REQ = 10

RAMPANT_CYBORG = [
    2591315, #Beefy Rampant Cyborg Soul"
    2591316, #Swift Rampant Cyborg Soul" 
    2591317, #Clever Rampant Cyborg Soul" 
    2591318, #Fortuitous Rampant Cyborg Soul" 
    2591319, #Flashy Rampant Cyborg Soul" 
    2591320, #Potent Rampant Cyborg Soul" 
    2591321, #Radiant Rampant Cyborg Soul" 
    2591322, #Hearty Rampant Cyborg Soul" 
    2591323, #Magnificent Rampant Cyborg Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (RAMPANT_CYBORG[len(RAMPANT_CYBORG)-1],RAMPANT_CYBORG[len(RAMPANT_CYBORG)-1])
                chr.addItemToInventory(RAMPANT_CYBORG[len(RAMPANT_CYBORG)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(RAMPANT_CYBORG[0],RAMPANT_CYBORG[len(RAMPANT_CYBORG)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(RAMPANT_CYBORG)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (RAMPANT_CYBORG[i],RAMPANT_CYBORG[i])
    sm.sendNext(list_item)
            