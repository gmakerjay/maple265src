# [Daily Quest] Morass Stabilization
JEAN = 3003432
COUPON = 2635513

sm.setSpeakerID(JEAN)
sm.sendNext("#b[Daily Quest] Save the Morass#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều cho chúng tôi!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Morass EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Morass chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(JEAN)
        sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 20 Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Morass.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Morass chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
    else:
        sm.setSpeakerID(JEAN)
        sm.sendNext("Bạn cần phải có ít nhất 01 ô trong túi USE của bạn.")
else:
    sm.setSpeakerID(JEAN)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")