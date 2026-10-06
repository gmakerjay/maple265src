# [Daily Quest] Limina Research
VELIVAH = 3003810

sm.setSpeakerID(VELIVAH)
sm.sendNext("#b[Daily Quest] Limina Research#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều cho chúng tôi!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Limina EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Limina chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    sm.completeQuest(parentID)
    sm.setSpeakerID(VELIVAH)
    sm.sendSayOkay("#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Limina.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Limina chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
else:
    sm.setSpeakerID(VELIVAH)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")