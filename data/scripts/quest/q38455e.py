# [Daily Quest] Chu Chu Island Enemy Elimination
MASTER_LYCK = 3003152
COUPON = 2635510

sm.setSpeakerID(MASTER_LYCK)
sm.sendNext("#b[Daily Quest] Chu Chu's Finest Cuisine#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều cho bữa ăn thịnh soạn!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Chu Chu EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Chu Chu chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        if sm.hasQuestCompleted(37726): # [Yum Yum] The Traveler and the Follower
            sm.giveItem(COUPON, 20)
            sm.setSpeakerID(MASTER_LYCK)
            sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 20 (+ 10 sau khi hoàn thành nhiệm vụ #b[Yum Yum] The Traveler and the Follower#k) Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Chu Chu.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Chu Chu chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
        else:
            sm.giveItem(COUPON, 10)
            sm.setSpeakerID(MASTER_LYCK)
            sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 10 Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Chu Chu.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Chu Chu chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
    else:
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("Bạn cần phải có ít nhất 01 ô trong túi USE của bạn.")
else:
    sm.setSpeakerID(MASTER_LYCK)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")