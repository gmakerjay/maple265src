
import random

NPC = 1540460
ITEM_TRADE = 2431895
ITEM_REQ = 10
PIANUS = [
    2591218, #Beefy Pianus Soul"
    2591219, #Swift Pianus Soul"
    2591220, #Clever Pianus Soul"
    2591221, #Fortuitous Pianus Soul"
    2591222, #Hearty Pianus Soul"
    2591223, #Ample Pianus Soul"
    2591224, #Flashy Pianus Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(PIANUS[0],PIANUS[len(PIANUS)-1])
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
    for i in range(len(PIANUS)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (PIANUS[i],PIANUS[i])
    sm.sendNext(list_item)
            