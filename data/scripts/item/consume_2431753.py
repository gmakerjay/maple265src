

import random

NPC = 1540460
ITEM_TRADE = 2431753
ITEM_REQ = 10

ARKARIUM = [
    2591194, #Beefy Arkarium Soul"
    2591195, #Swift Arkarium Soul" 
    2591196, #Clever Arkarium Soul" 
    2591197, #Fortuitous Arkarium Soul" 
    2591198, #Flashy Arkarium Soul" 
    2591199, #Potent Arkarium Soul" 
    2591200, #Radiant Arkarium Soul" 
    2591201, #Hearty Arkarium Soul" 
    2591202, #Magnificent Arkarium Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (ARKARIUM[len(ARKARIUM)-1],ARKARIUM[len(ARKARIUM)-1])
                chr.addItemToInventory(ARKARIUM[len(ARKARIUM)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(ARKARIUM[0],ARKARIUM[len(ARKARIUM)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(ARKARIUM)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (ARKARIUM[i],ARKARIUM[i])
    sm.sendNext(list_item)
            