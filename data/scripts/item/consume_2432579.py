

import random

NPC = 1540460
ITEM_TRADE = 2432579
ITEM_REQ = 10

BAD_BRAWLER = [
    2591333, #Beefy Bad Brawler Soul"
    2591334, #Swift Bad Brawler Soul" 
    2591335, #Clever Bad Brawler Soul" 
    2591336, #Fortuitous Bad Brawler Soul" 
    2591337, #Flashy Bad Brawler Soul" 
    2591338, #Potent Bad Brawler Soul" 
    2591339, #Radiant Bad Brawler Soul" 
    2591340, #Hearty Bad Brawler Soul" 
    2591341, #Magnificent Bad Brawler Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (BAD_BRAWLER[len(BAD_BRAWLER)-1],BAD_BRAWLER[len(BAD_BRAWLER)-1])
                chr.addItemToInventory(BAD_BRAWLER[len(BAD_BRAWLER)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(BAD_BRAWLER[0],BAD_BRAWLER[len(BAD_BRAWLER)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(BAD_BRAWLER)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (BAD_BRAWLER[i],BAD_BRAWLER[i])
    sm.sendNext(list_item)
            