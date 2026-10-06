sm.setSpeakerID(3003105)
sel = sm.sendNext("Hello! What can I do for you?\r\n\r\n#b#L0#I would like to exchange #v4001878# #z4001878# #ex9#n and #v4001879# #z4001879# #ex1#n for a #v4310218# #z4310218##l")
if sel == 0:
    if sm.hasItem(4001878, 9) and sm.hasItem(4001879):
        if sm.canHold(4310218):
            sm.consumeItem(4001878, 9)
            sm.consumeItem(4001879)
            sm.giveItem(4310218)
        else:
            sm.sendSayOkay("Please make room in your Etc Inventory.")
    else:
        sm.sendSayOkay("Eh? I don't think you have enough #b#t4001878##k and #b#t4001879##k. Please check again!")