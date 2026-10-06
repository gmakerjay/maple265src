from net.swordie.ms.constants import QuestConstants
from datetime import datetime

coins = 10
now = datetime.now()
if sm.getEmptyInventorySlots(4) >= 1:
    sm.sendSayOkay("'Awesome! Your #bLegion#k is pretty tough! Here is #b#i4310229:# #t4310229# x10#k as your reward."
                   "\r\nCheck in tomorrow for more training missions!\r\n\r\nI'll go ahead and update your #bWeekly "
                   "Cumulative Legion Coin Ranking#k!\r\n#bThis Week's Cumulative Coins#k#e: " + str(coins) + "#n")
    sm.completeQuestNoRewards(QuestConstants.UNION_FIRST_QUEST)
    sm.giveItem(4310229, coins)
    sm.addUnionCoin(coins)
    sm.setQRValueByKey(QuestConstants.UNION_QUEST, "q1", "1") # LegionQuest
    sm.setQRValueByKey(QuestConstants.UNION_QUEST, "q1Date", str(now.strftime("%y/%m/%d"))) # LegionQuest
else:
    sm.sendSayOkay("You lack the required ETC inventory space to use this item")