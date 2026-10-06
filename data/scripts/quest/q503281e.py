# [Legion] Weekly Dragon Extermination
from net.swordie.ms.util import FileTime

sm.setSpeakerID(9010106)
sm.flipDialogue()
sm.sendNext("Chúc mừng bạn đã hoàn thành nhiệm vụ #b[Legion] Weekly Dragon Extermination#k và nhận #b#i4310229:##t4310229# x200#k.\r\n\r\n#eLưu ý: Bạn có thể không cần làm nhiệm vụ này môi tuần và nhận thẳng phần thưởng vào tuần trước đó trong #bClaim Coins#k.")
if sm.canHold(4310229, 200):
    sm.giveItem(4310229, 200)
    sm.addUnionCoin(200)
    sm.completeQuest(parentID)
    sm.createQuestWithQRValue(parentID, "startDate="+ str(FileTime.currentTime().toYYMMDD()))
else:
    sm.sendSayOkay("Kiểm tra xem túi ETC còn ô chứa không?")