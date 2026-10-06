from net.swordie.ms.enums import UIType

sel = sm.sendNext("#e<Party Quest: Resurrection of the Holbin King>#n\r\nWelcome, #b#h0##k. What brings you here?\r\n\r\n#b#L0#I want to go stop the resurrection of Rex the Hoblin King.#l\r\n#L1#I would like an explanation.#l\r\n#L2#I want to receive an item.#l\r\n#L3#I want to see how many attempts I still have for today.#l#k")

if sel == 0:
    if sm.getFieldID != 921120000:
        sm.sendNext("We should speak in a more private setting. Follow me.")
        sm.warp(921120000)
    else:
        sm.sendSayOkay("There's a party member who's below Lv.170. We aren't going to daycare here! Go train some more!")
elif sel == 1:
    sm.sendSayOkay("#bShammos#k has a premonition that #rRex#k, an evil hunter from El Nath will be released from his seal and bring terror onto El Nath, and asks that you escort him there to ensure the safety of the sea.\r\n#e- Level#n: 170 or above #r(Recommended Level: 170 - 189)#k\r\n#e- Players#n: 2 - 6\r\n#e- Time Limit#n: 20 minutes\r\n#e- Reward#n:\r\n#v1032102# #b#t1032102##k\r\n#v1032103# #b#t1032103##k\r\n#v1032104# #b#t1032104##k#k")
elif sel == 2:
    sm.sendNext("Which item do you want?\r\n#b#L0#1. #v1032102# #t1032102##l\r\n#b#L1#1. #v1032103# #t1032103##l\r\n#b#L2#1. #v1032104# #t1032104##l\r\n#b#L3#1. #v1902048# #t1902048##l#k")
    sm.sendNext("You need #b5 #t4001530##k items to receive #b#t1032103##k. You get the things from Rex, and we'll deal.")
elif sel == 3:
    sm.sendSayOkay("You can do this quest 5 more time(s) today.")