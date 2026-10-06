
import random

NPC = 1540460
ITEM_TRADE = 2431752
ITEM_REQ = 10
EPHENIA = [
    2591187, #Beefy Ephenia Soul"
    2591188, #Swift Ephenia Soul"
    2591189, #Clever Ephenia Soul"
    2591190, #Fortuitous Ephenia Soul"
    2591191, #Hearty Ephenia Soul"
    2591192, #Ample Ephenia Soul"
    2591193, #Flashy Ephenia Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(EPHENIA[0],EPHENIA[len(EPHENIA)-1])
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
    for i in range(len(EPHENIA)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (EPHENIA[i],EPHENIA[i])
    sm.sendNext(list_item)
            