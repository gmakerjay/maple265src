

import random

NPC = 1540460
ITEM_TRADE = 2432575
ITEM_REQ = 10

BLACK_KNIGHT = [
    2591297, #Beefy Black Knight Soul"
    2591298, #Swift Black Knight Soul" 
    2591299, #Clever Black Knight Soul" 
    2591300, #Fortuitous Black Knight Soul" 
    2591301, #Flashy Black Knight Soul" 
    2591302, #Potent Black Knight Soul" 
    2591303, #Radiant Black Knight Soul" 
    2591304, #Hearty Black Knight Soul" 
    2591305, #Magnificent Black Knight Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (BLACK_KNIGHT[len(BLACK_KNIGHT)-1],BLACK_KNIGHT[len(BLACK_KNIGHT)-1])
                chr.addItemToInventory(BLACK_KNIGHT[len(BLACK_KNIGHT)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(BLACK_KNIGHT[0],BLACK_KNIGHT[len(BLACK_KNIGHT)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(BLACK_KNIGHT)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (BLACK_KNIGHT[i],BLACK_KNIGHT[i])
    sm.sendNext(list_item)
            