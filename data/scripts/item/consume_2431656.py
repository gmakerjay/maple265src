
import random

NPC = 1540460
ITEM_TRADE = 2431656
ITEM_REQ = 10
PRISON_GUARD_ANI = [
    2591017, #Beefy Prison Guard Ani Soul"
    2591018, #Swift Prison Guard Ani Soul"
    2591019, #Clever Prison Guard Ani Soul"
    2591020, #Fortuitous Prison Guard Ani Soul"
    2591021, #Hearty Prison Guard Ani Soul"
    2591022, #Ample Prison Guard Ani Soul"
    2591023, #Flashy Prison Guard Ani Soul"
]
sm.setSpeakerID(NPC)
sm.flipBoxChat()
sm.setBoxChat()
OTHER = random.randint(PRISON_GUARD_ANI[0],PRISON_GUARD_ANI[len(PRISON_GUARD_ANI)-1])
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
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your USE inventory.")
            #sm.dispose()
elif selection == 1:
    sm.resetParam()
    list_item = "The Item will cost you #r%s #i%s# #b#e#z%s##n#k\r\n" % (ITEM_REQ,ITEM_TRADE,ITEM_TRADE)
    for i in range(len(PRISON_GUARD_ANI)):
        list_item += "#i%s#\t#b#e#z%s##n#k \r\n" % (PRISON_GUARD_ANI[i],PRISON_GUARD_ANI[i])
    sm.sendNext(list_item)
            