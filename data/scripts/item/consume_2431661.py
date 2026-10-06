

import random

NPC = 1540460
ITEM_TRADE = 2431661
ITEM_REQ = 10
PINK_BEAN = [
    2591055, #Beefy Pink Bean Soul"
    2591056, #Swift Pink Bean Soul"
    2591057, #Clever Pink Bean Soul"
    2591058, #Fortuitous Pink Bean Soul"
    2591059, #Flashy Pink Bean Soul"
    2591060, #Potent Pink Bean Soul"
    2591061, #Radiant Pink Bean Soul"
    2591062, #Hearty Pink Bean Soul"
    2591063, #Sharp Pink Bean Soul"
    2591064, #Destructive Pink Bean Soul"
    2591087, #Magnificent Pink Bean Soul"
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
                Magnificent = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (PINK_BEAN[len(PINK_BEAN)-1],PINK_BEAN[len(PINK_BEAN)-1])
                chr.addItemToInventory(PINK_BEAN[len(PINK_BEAN)-1],1)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Magnificent)
            else:
                OTHER = random.randint(PINK_BEAN[0],PINK_BEAN[len(PINK_BEAN)-2])
                Other = "#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i%s#\t#b#e#z%s##n#k \r\n" % (OTHER,OTHER)
                chr.addItemToInventory(OTHER,1,"day",90)
                sm.consumeItem(ITEM_TRADE,ITEM_REQ)
                sm.sendNext(Other)
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(PINK_BEAN)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (PINK_BEAN[i],PINK_BEAN[i])
    sm.sendNext(list_item)
            