
import random

NPC = 1540460
ITEM_TRADE = 2433591
ITEM_REQ = 10

CRIMSON_QUEEN = [
    2591401, #Beefy Crimson Queen Soul"
    2591402, #Swift Crimson Queen Soul"
    2591403, #Clever Crimson Queen Soul"
    2591404, #Fortuitous Crimson Queen Soul"
    2591405, #Flashy Crimson Queen Soul"
    2591406, #Potent Crimson Queen Soul"
    2591407, #Radiant Crimson Queen Soul"
    2591408, #Hearty Crimson Queen Soul"
    2591409, #Magnificent Crimson Queen Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (CRIMSON_QUEEN[len(CRIMSON_QUEEN)-1],CRIMSON_QUEEN[len(CRIMSON_QUEEN)-1])
                chr.addItemToInventory(CRIMSON_QUEEN[len(CRIMSON_QUEEN)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(CRIMSON_QUEEN[0],CRIMSON_QUEEN[len(CRIMSON_QUEEN)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(CRIMSON_QUEEN)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (CRIMSON_QUEEN[i],CRIMSON_QUEEN[i])
    sm.sendNext(list_item)
            