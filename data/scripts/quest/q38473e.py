# [Daily Quest] Esfera Research
OLLIE = 3003530
COUPON = 2635514

sm.setSpeakerID(OLLIE)
sm.sendNext("#b[Daily Quest] Esfera Research#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều cho nghiên cứu của chúng tôi!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Esfera EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Esfera chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(OLLIE)
        sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 20 Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Esfera.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Esfera chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
    else:
        sm.setSpeakerID(OLLIE)
        sm.sendNext("Bạn cần phải có ít nhất 01 ô trong túi USE của bạn.")
else:
    sm.setSpeakerID(OLLIE)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")