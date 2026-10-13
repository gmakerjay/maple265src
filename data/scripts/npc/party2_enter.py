from net.swordie.ms.enums import UIType
from net.swordie.ms.enums.social.Party import PartyQuestType

sel = sm.sendNext("#e<Party Quest: Dimensional Crack>#n\r\nYou can't climb any further from here, because of many secret dangers. Do you want to venture forth to clear this quest? If so, talk to me.\r\n\r\n#b#L0#I want to do a party quest.#l\r\n#L1#I want a party.#l\r\n#L2#I want Broken Glasses.#l\r\n#L3#I want some information.#l\r\n#L4#How many more runs do I have today?#l#k")

if sel == 0:
    if sm.getFieldID() != 221023300 and sm.getFieldID() != 922010000:
        sm.sendNext("If you're up for the challenge, I'll bring you to the top of the tower.")
        sm.warp(221023300)
    else:
        chr.startPartyQuest(PartyQuestType.LUDIBRIUM, 0)
elif sel == 1:
    sm.openUI(UIType.UI_PARTY_INVITATION)
elif sel == 2:
    if sm.hasItem(1022073):
        sm.sendSayOkay("You already have the Broken Glasses!")
    elif sm.canHold(1022073):
        sm.giveItem(1022073)
        sm.sendSayOkay("Here is your #v1022073# #b#t1022073##k! Wear them proudly.")
    else:
        sm.sendSayOkay("Please make sure you have enough space in your EQUIP inventory.")
elif sel == 3:
    sm.sendSayOkay("A Dimensional Crack has appeared in #b#m220000000##k! We desperately need brave adventurers who can defeat the monsters pouring through. You can challenge solo or with friends via LAN!\r\n#e- Level#n: 70 or above #r(Recommended Level: 70 - 255)#k\r\n#e- Time Limit#n: 20 minutes\r\n#e- Players#n: 1 - 6 (Solo or Party)\r\n#e- Reward#n: #v1022073# #t1022073#, Various Use, Etc, and Equip items")
elif sel == 4:
    sm.sendSayOkay("You can attempt the Party Quest 5 more time(s) today.")