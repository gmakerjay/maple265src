# id 32129 ([Ellinel Fairy Academy] Professor Peace), field 101073200
sm.setSpeakerID(1500015) # Cootie the Really Small (Cootie Bé Tí)
if sm.sendAskAccept("Không tệ, #h0#. Bạn thực sự đã suy nghĩ như một tiên nữ đấy. Hãy trở về gặp Hiệu trưởng ở Ellinel. \r\n#b(Bạn sẽ được chuyển đến Ellinel nếu chấp nhận.)#k"):
    sm.setParam(1)
    sm.sendNext("Tuyệt vời. Chắc giờ tất cả lũ trẻ đã trở về rồi, phải không?")
    sm.warp(101072001)