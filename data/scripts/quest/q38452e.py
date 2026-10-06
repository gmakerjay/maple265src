# [Daily Quest] Vanishing Journey Research
RONA = 3003104
COUPON = 2635509

sm.setSpeakerID(RONA)
sm.sendNext("#b[Daily Quest] Vanishing Journey Research#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Vanishing Journey EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Vanishing Journey chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        if sm.hasQuestCompleted(37620): # [Reverse City] Surviving in the Reversed City
            sm.giveItem(COUPON, 20)
            sm.setSpeakerID(RONA)
            sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 20 (+ 10 sau khi hoàn thành nhiệm vụ #b[Reverse City] Surviving in the Reversed City#k) Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Vanishing Journey.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Vanishing Journey chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
        else:
            sm.giveItem(COUPON, 10)
            sm.setSpeakerID(RONA)
            sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 10 Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Vanishing Journey.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Vanishing Journey chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
    else:
        sm.setSpeakerID(RONA)
        sm.sendNext("Bạn cần phải có ít nhất 01 ô trong túi USE của bạn.")
else:
    sm.setSpeakerID(RONA)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")