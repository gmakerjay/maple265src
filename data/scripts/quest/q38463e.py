# [Daily Quest] Arcana Area Expedition
TREE_SPIRITS = 3003322
COUPON = 2635512

sm.setSpeakerID(TREE_SPIRITS)
sm.sendNext("#b[Daily Quest] Peace in Arcana#k Bạn đã hoàn thành nhiệm vụ thành công. Nó sẽ giúp ích rất nhiều cho chúng tôi!")
if sm.sendAskYesNo("Bạn chưa nhận được nhiệm vụ hàng ngày của Arcana EXP ngày hôm nay.\r\nBạn có muốn yêu cầu ngay bây giờ không?\r\n\r\n#r#n* EXP hoàn thành Nhiệm vụ hàng ngày của Arcana chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendSayOkay("Tôi đã cho bạn #b#i"+str(COUPON)+"# #z"+str(COUPON)+"##k x 20 Vui lòng kiểm tra túi USE của bạn.\r\n\r\n#r#e* Bạn đã nhận được EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Arcana.*#n EXP hoàn thành Nhiệm vụ hàng ngày ở Khu vực Arcana chỉ có thể được nhận một lần mỗi ngày cho mỗi thế giới.")
    else:
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("Bạn cần phải có ít nhất 01 ô trong túi USE của bạn.")
else:
    sm.setSpeakerID(TREE_SPIRITS)
    sm.sendNext("Hãy cho tôi biết khi nào bạn sẵn sàng nhận phần thưởng nhé.")