# [Legion] Weekly Dragon Extermination
from net.swordie.ms.util import FileTime

sm.setSpeakerID(9010106)
sm.flipDialogue()
sm.sendNext("Chào!\r\n#bLegion#k của bạn thế nào?\r\nChứng kiến Legion của các bạn ngày càng lớn mạnh khiến tôi vô cùng tự hào.")
if sm.sendAskYesNo("Nếu bạn đánh bại #b100 Dragon Whelps#k bảo vệ #rHuge Dragon#k, và #r20 Golden Wyverns#k, tôi sẽ tặng bạn #b#i4310229:##t4310229# x200#k làm phần thưởng.\r\nBạn nghĩ sao?\r\n\r\n#r*Nhiệm vụ này chỉ có thể hoàn thành một lần mỗi tuần,\r\nvà sẽ được thiết lập lại sau #e#rsáng thứ năm#n.#k."):
    sm.createQuestWithQRValue(parentID, "startDate="+ str(FileTime.currentTime().toYYMMDD()))
    sm.startQuest(parentID)
    sm.flipDialogue()
    sm.sendSayOkay("À, bạn thích thử thách đấy, đúng như dự đoán!\r\nBạn có thể săn #rDragon Whelps#k và #rGolden Wyverns#k trong #rDragon's Domain#k, có thể đến được bằng cách bắt đầu một #bLegion Raid#k. Hãy đến gặp tôi ở thị trấn khi bạn hoàn thành nhiệm vụ hàng tuần nhé.\r\nChúc may mắn!")
else:
    sm.flipDialogue()
    sm.sendNext("Hãy đến thăm tôi bất cứ khi nào bạn sẵn sàng cho #b[Legion] Weekly Dragon Extermination#k.")
