# Suspicious Alchemist

sel = sm.sendNext("Hello! What can I do for you?#b\r\n#L0##v4009374# #z4009374# #ex10#n for a #v2101317# #z2101317##l\r\n#L1##v4009374# #z4009374# #ex5#n for a #v2210189# #z2210189##l\r\n#L2##v4009373# #z4009373# #ex10#n for a #v2210188# #z2210188##l#k")

if sel == 0:
    if sm.hasItem(4009374, 10):
        if sm.canHold(2101317):
            sm.consumeItem(4009374, 10)
            sm.giveItem(2101317)
        else:
            sm.sendSayOkay("Please make room in your USE Inventory.")
    else:
        sm.sendSayOkay("Eh? I don't think you have enough #b#t4009374##k. Please check again!")
elif sel == 1:
    if sm.hasItem(4009374, 5):
        if sm.canHold(2210189):
            sm.consumeItem(4009374, 5)
            sm.giveItem(2210189)
        else:
            sm.sendSayOkay("Please make room in your USE Inventory.")
    else:
        sm.sendSayOkay("Eh? I don't think you have enough #b#t4009374##k. Please check again!")
elif sel == 2:
    if sm.hasItem(4009373, 10):
        if sm.canHold(2210188):
            sm.consumeItem(4009373, 10)
            sm.giveItem(2210188)
        else:
            sm.sendSayOkay("Please make room in your USE Inventory.")
    else:
        sm.sendSayOkay("Eh? I don't think you have enough #b#t4009373##k. Please check again!")