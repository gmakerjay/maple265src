# Union Claim Coins
from net.swordie.ms.constants import QuestConstants

if not chr.hasQuest(QuestConstants.UNION_COIN):
    sm.updateAvailableUnionCoin(0)

amount = int(chr.getQRValueByKey(QuestConstants.UNION_COIN, "coin"))

sm.setSpeakerID(9010106)
if amount > 0:
    if sm.canHold(4310229, amount):
        sm.addUnionCoin(amount)
        sm.updateAvailableUnionCoin(0)
        sm.giveItem(4310229, amount)
        sm.sendNext("It looks like you've collected #b#i4310229:# #t4310229##k x #b" + str(amount) + "#k. Impressive work!")
    else:
        sm.sendNext("Please check if you have enough free slots in your ETC inventory.")
else:
    sm.sendNext("You don't have any #bLegion Coins#k to collect right now. Complete the #b[Legion] Weekly Dragon Extermination#k quest and come back.")
