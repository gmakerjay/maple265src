sm.setSpeakerID(3003536)
sel = sm.sendNext("Hello! What can I do for you?\r\n\r\n#b#L0#I would like to exchange #v4001889# #z4001889# #ex9#n and #v4001890# #z4001890# #ex1#n for a #v4310249# #z4310249##l")
if sel == 0:
    if sm.hasItem(4001889, 9) and sm.hasItem(4001890):
        if sm.canHold(4310249):
            sm.consumeItem(4001889, 9)
            sm.consumeItem(4001890)
            sm.giveItem(4310249)
        else:
            sm.sendSayOkay("Please make room in your Etc Inventory.")
    else:
        sm.sendSayOkay("Eh? I don't think you have enough #b#t4001878##k and #b#t4001879##k. Please check again!")