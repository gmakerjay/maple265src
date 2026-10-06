
import random

NPC = 1540460
ITEM_TRADE = 2431659
ITEM_REQ = 10
MU_GONG = [
    2591038, #Beefy Mu Gong Soul"
    2591039, #Swift Mu Gong Soul"
    2591040, #Clever Mu Gong Soul"
    2591041, #Fortuitous Mu Gong Soul"
    2591042, #Hearty Mu Gong Soul"
    2591043, #Ample Mu Gong Soul"
    2591044, #Flashy Mu Gong Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(MU_GONG[0],MU_GONG[len(MU_GONG)-1])
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
    for i in range(len(MU_GONG)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (MU_GONG[i],MU_GONG[i])
    sm.sendNext(list_item)
            