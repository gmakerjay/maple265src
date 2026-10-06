
import random

NPC = 1540460
ITEM_TRADE = 2431657
ITEM_REQ = 10
DRAGON_RIDER = [
    2591024, #Beefy Dragon Rider's Soul"
    2591025, #Swift Dragon Rider's Soul"
    2591026, #Clever Dragon Rider's Soul"
    2591027, #Fortuitous Dragon Rider's Soul"
    2591028, #Hearty Dragon Rider's Soul"
    2591029, #Ample Dragon Rider's Soul"
    2591030, #Flashy Dragon Rider's Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(DRAGON_RIDER[0],DRAGON_RIDER[len(DRAGON_RIDER)-1])
selection = sm.sendSay("You can trade required items for one of the following random items \r\n"
                            "#L0##bSoul Exchange.#l\r\n"
                            "#L1##bList Item.#l \r\n"
                            "#L2##kNever mind.#l\r\n")
if selection == 0:
    if not sm.hasItem(ITEM_TRADE,ITEM_REQ):
        req = "You need at least #r%s #i%s# #b#e#z%s##n#k" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
        sm.sendNext(req)
        #sm.dispose()
    elif sm.hasItem(ITEM_TRADE,ITEM_REQ):
        if sm.getEmptyInventorySlots(2)>= 1:
            Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
            chr.addItemToInventory(OTHER,1,"day",90)
            sm.consumeItem(ITEM_TRADE,ITEM_REQ)
            sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(DRAGON_RIDER)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (DRAGON_RIDER[i],DRAGON_RIDER[i])
    sm.sendNext(list_item)
            