
import random

NPC = 1540460
ITEM_TRADE = 2431964
ITEM_REQ = 10
MAGNUS_SOUL = [
    2591272, #Beefy Magnus Soul"
    2591273, #Swift Magnus Soul"
    2591274, #Clever Magnus Soul"
    2591275, #Fortuitous Magnus Soul"
    2591276, #Flashy Magnus Soul"
    2591277, #Potent Magnus Soul"
    2591278, #Radiant Magnus Soul"
    2591279, #Hearty Magnus Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(MAGNUS_SOUL[0],MAGNUS_SOUL[len(MAGNUS_SOUL)-1])
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
    for i in range(len(MAGNUS_SOUL)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (MAGNUS_SOUL[i],MAGNUS_SOUL[i])
    sm.sendNext(list_item)
            