
import random

NPC = 1540460
ITEM_TRADE = 2435369
ITEM_REQ = 10
DAMIEN_SOUL = [
    2591573, #Beefy Damien Soul"
    2591574, #Swift Damien Soul"
    2591575, #Clever Damien Soul"
    2591576, #Fortuitous Damien Soul"
    2591577, #Flashy Damien Soul"
    2591578, #Potent Damien Soul"
    2591579, #Radiant Damien Soul"
    2591580, #Hearty Damien Soul"
    2591581, #Magnificent Damien Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(DAMIEN_SOUL[0],DAMIEN_SOUL[len(DAMIEN_SOUL)-1])
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
    for i in range(len(DAMIEN_SOUL)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (DAMIEN_SOUL[i],DAMIEN_SOUL[i])
    sm.sendNext(list_item)
            