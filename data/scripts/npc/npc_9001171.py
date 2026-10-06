from net.swordie.ms.constants import WzConstants
from net.swordie.ms.constants import FieldConstants
from net.swordie.ms.constants import QuestConstants

def intro():
    sm.sendNext("Hello, alien customer! Welcome to #bPlanet Glacious#k the coldest planet in all of Maple Galaxy!")
    sm.sendSay("The #bSub-Zero Hunt#k was designed with the #blast technology#k in mind to provide our customers with the #bideal hunting experience#k!")
    sm.sendSay("We're very proud of our #badvanced facitilies#k here at the #bSub-Zero Hunt#k!\r\n\r\nWhat makes us so special is that you don't need to choose between efficiency and your friends anymore! You can enjoy hunting on one map in with #bup to 10#k other customers!")
    sm.sendSay("That sounds really crowded, doesn't it? #b10 people on one map?#k\r\n\r\nWell fear not, because our exclusive tech makes #bmonsters appear individually for each customer#k. Never worry about anyone stealing your prey ever again!")
    sm.sendSay("The #bSub-Zero Hunt#k also offers better returns on your efforts than anywhere else!\r\n\r\nNot only do the monsters of the #bSub-Zero Hunt#k give #bplenty of EXP#k, they also provided #b120% Bonus Sub-Zero Hunt EXP#k")
    sm.sendSay("The monsters are all summoned based on the #bcustomer's level#k. If you don't like the monsters that were summoned, you can #bchoose your own#k within your level range!")
    sm.sendSay("This right here is the #bpremium service#k that the #bSub-Zero Hunt#k is renowned for!\r\n\r\nAnd the #bSub-Zero Hunt#k doesn't rush it's customers with a #rtime limit#k! You can summon #b3,000#k monsters and take all the time you want hunting them.")
    sm.sendSay("You can even #bchat with other customers#k  while hunting, since there's no time limit! Also, the #bremaining monsters#k never disappear, so you can come and go as you please without losing out at all.")
    sm.sendSay("All of these services can be yours for a simple one-time payment of #b30 Galaxy Stars#k\r\n\r\nYou won't find a deal like that anywhere else!")
    if chr.getDailyCoin().getCoin() >= 30 and sm.canHold(4001884) and not sm.hasItem(4001884) and chr.getLevel() >= 100:
        sm.sendSayOkay("Here, I'll give you a #bSub-Zero Hunt Trial Pass#k so you can get a taste for yourself. I can only give #bone of these per world#k though, so if you already got it here you're out of luck. If you like it, be sure to come back!\r\n\r\n" + WzConstants.ICON_OBTAINED + "\r\n#b#i4001884# #z4001884#x1#k")
        sm.decPoint(QuestConstants.STARDUST_POINT, 30)
        sm.giveItem(4001884)
    else:
        sm.sendSayOkay("Hmm looks like you don't have a Galaxy Coin or your ETC inventory is full or You already have #i4001884# #z4001884#.")


sm.setSpeakerID(9001171)
if not sm.hasItem(4001884):
    intro()
else:
    sel = sm.sendNext("Welcome to the greatest hunting ground in the entire Maple Galaxy! Welcome... to the #bSub-Zero Hunt!\r\n\r\n#L0# Let me into the Sub-Zero Hunt!#l\r\n#L1#Tell me about the Sub-Zero Hunt.#l#k")
    if sel == 0:
        if chr.getParty() is None:
            sm.warp(FieldConstants.SUB_ZERO_HUNT)
        else:
            sm.sendSayOkay("Please leave your party before going in")
    else:
        intro()

