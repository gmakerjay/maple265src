

import random

NPC = 1540460
ITEM_TRADE = 2432576
ITEM_REQ = 10

MAD_MAGE = [
    2591306, #Beefy Mad Mage Soul"
    2591307, #Swift Mad Mage Soul" 
    2591308, #Clever Mad Mage Soul" 
    2591309, #Fortuitous Mad Mage Soul" 
    2591310, #Flashy Mad Mage Soul" 
    2591311, #Potent Mad Mage Soul" 
    2591312, #Radiant Mad Mage Soul" 
    2591313, #Hearty Mad Mage Soul" 
    2591314, #Magnificent Mad Mage Soul"       
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (MAD_MAGE[len(MAD_MAGE)-1],MAD_MAGE[len(MAD_MAGE)-1])
                chr.addItemToInventory(MAD_MAGE[len(MAD_MAGE)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(MAD_MAGE[0],MAD_MAGE[len(MAD_MAGE)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(MAD_MAGE)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (MAD_MAGE[i],MAD_MAGE[i])
    sm.sendNext(list_item)
    #sm.dispose()
            