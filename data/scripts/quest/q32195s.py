# [Riena Strait] A Warrior's Pride

LIRIN = 1510009

sm.setSpeakerID(LIRIN)
if sm.sendAskYesNo("Tôi đã nghe về những việc làm của bạn. Bạn đã làm được một số điều tuyệt vời ở đây, phải không?"):
    sm.sendNext("Vậy bạn đã tìm ra điều gì?\r\n\r\nNhững con Chim cánh cụt, Malamutes, và Hải cẩu đã có mối quan hệ không tốt. Tôi mừng vì thấy họ đã hòa giải được lúc này, nhưng mặt khác tôi nghĩ vụ việc đã có thể được ngăn chặn nếu ngay từ đầu họ có sự đoàn kết như thế này.")
    sm.sendSay("Không nhất thiết mọi người phải có cùng một tấm lòng và suy nghĩ. Nhưng khi có một kẻ thù chung, điều cần thiết là mọi người phải hợp sức lại. Xin hãy luôn nhớ điều này, với tư cách là một phần của Thế giới Maple.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i1142629# #b#t1142629##k\r\n")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)