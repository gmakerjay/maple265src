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
        sm.sendNext("Có vẻ như bạn đã thu thập được #b#i4310229:# #t4310229##k x #b"+str(amount)+"#k. Thật ấn tượng!")
    else:
        sm.sendNext("Hãy kiểm tra xem túi ETC của bạn có đủ ô chứa không?")
else:
    sm.sendNext("Bạn không có #bLegion Coin#k nào để thu thập. Hãy thực hiện nhiệm vụ #b[Legion] Weekly Dragon Extermination#k rồi quay lại nhé.")
