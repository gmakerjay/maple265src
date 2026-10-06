
import random

NPC = 1540460
ITEM_TRADE = 2435031
ITEM_REQ = 10
PINK_MONG = [
    2591528, #Beefy Ping Mong Soul"
    2591529, #Swift Ping Mong Soul"
    2591530, #Clever Ping Mong Soul"
    2591531, #Fortuitous Ping Mong Soul"
    2591532, #Hearty Pink Mong Soul"
    2591533, #Ample Pink Mong Soul"
    2591534, #Flashy Pink Mong Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(PINK_MONG[0],PINK_MONG[len(PINK_MONG)-1])
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
            Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
            chr.addItemToInventory(OTHER,1,"day",90)
            sm.consumeItem(ITEM_TRADE,ITEM_REQ)
            sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(PINK_MONG)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (PINK_MONG[i],PINK_MONG[i])
    sm.sendNext(list_item)
            