from net.swordie.ms.enums import UIType

sel = sm.sendNext("#e<Party Quest: Dimensional Crack>#n\r\nYou can't climb any further from here, because of many secret dangers. Do you want to combine your powers with other party members to clear this quest? If so, have #byour party leader#k talk to me.\r\n\r\n#b#L0#I want to do a party quest.#l\r\n#L1#I want a party.#l\r\n#L2#I want a Broken Glasses.#l\r\n#L3#I want some answers.#l\r\n#L4#How many more runs do i have today?#l#k")

if sel == 0:
    if sm.getFieldID != 221023300:
        sm.sendNext("If you're up for the challenge, I'll bring you to the top of the tower.")
        sm.warp(221023300)
    else:
        if sm.sendAskYesNo("You cannot participate in the quest because you do not have at least 3 party members. If you're having trouble finding party members, try using Party Search."):
            sm.openUI(UIType.UI_PARTY_INVITATION)
elif sel == 1:
    sm.openUI(UIType.UI_PARTY_INVITATION)
elif sel == 2:
    sm.sendNext("I am offering 1 #v1022073# #b#t1022073##k for every 5 times you help me. If you help me #b5 more times, you can receive #t1022073##k.")
elif sel == 3:
    sm.sendSayOkay("A Dimensional Crack has appeared in #b#m220000000##k! We desperately need brave adventures who can defeat the monsters pouring through. Please, party with some dependable allies to save #m220000000#! You must pass though several stages by defeating monsters and solving quizzes, and ultimately defeat #r#m9500343##k.\r\n#e- Level#n: 120 or above #r(Recommended Level: 120 - 139)#k\r\n#e- Time Limit#n: 20 minutes\r\n#e- Players#n: 3 - 6\r\n#e- Reward#n: #v1022073# #t1022073# #b(obtained every 5 time(s) you participate)#k, Various Use, Etc, and Equip items")
elif sel == 4:
    sm.sendSayOkay("You can attempt the Party Quest 5 more time(s) today.")