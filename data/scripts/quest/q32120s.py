# id 32120 ([Ellinel Fairy Academy] Dr. Betty's Measures), field 101000000
sm.setSpeakerID(1032104) # Betty
sm.sendNext("Tôi đã nghiên cứu rất nhiều về những khu rừng ma thuật quanh học viện. Rất khó để điều hướng, nhưng tôi đã tạo ra một công cụ có thể giúp bạn ít nhất là xác định âm thanh đang đến từ hướng nào. \r\n\r\n#i4033830##b#t4033830##k")
if sm.sendAskAccept("Tôi không chắc nó sẽ hữu ích đến mức nào, nhưng có còn hơn không. Giờ thì, tôi phải đi trước khi phòng thí nghiệm của tôi phát nổ. \r\n\r\n#b(Bạn sẽ được chuyển đến Học viện Tiên nữ Ellinel nếu chấp nhận.)#k"):
    if sm.canHold(4033830):
        sm.giveItem(4033830)
        sm.startQuest(parentID)
        sm.warp(101071300)
    else:
        sm.sendNext("Bạn không có đủ chỗ trống trong túi đồ để giữ thiết bị Định Vị Sóng Âm này.")