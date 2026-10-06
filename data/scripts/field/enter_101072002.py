# id 101072002 (Ellinel Fairy Academy : Ellinel Academy Lobby), field 101072002
sm.lockInGameUI(True, True)
sm.setSpeakerType(3)
sm.setParam(5)
sm.setSpeakerID(1500000) # Cootie the Really Small (Cootie Bé Tí)
sm.sendNext("Cái gì? Tôi có thể làm việc ở Ellinel sao?!")
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendSay("H-hiệu trưởng Ivana, cô sẽ đưa một NGƯỜI PHÀM vào thánh đường tri thức của chúng ta sao?!")
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendSay("Việc chúng ta tẩy chay con người đã làm suy yếu chúng ta. Nếu không nhờ sự giúp đỡ của họ, lũ trẻ của chúng ta đã bị mất tích rồi. Đã đến lúc phải thay đổi...")
sm.sendSay("Black Mage đã gieo rắc nỗi kinh hoàng cho toàn bộ Thế giới Maple từ lâu... Giờ đây, một số phe phái lại muốn đưa hắn ta trở lại. Chúng ta, những tiên nữ, không thể đứng yên được nữa. \r\nChúng ta phải mở rộng trái tim và trí óc của mình.")
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendSay("Ưm... Cô nói sao thì là vậy, Hiệu trưởng...")
sm.setSpeakerID(1500000) # Cootie the Really Small
sm.sendSay("Cái này TUYỆT VỜI quá. Tôi rất mừng vì bạn đã đến đây để thấy tôi làm được tất cả những điều này.")
sm.setParam(17)
sm.sendSay("Vậy, lũ trẻ có thể diễn tập vở kịch của chúng lần nữa không?")
sm.setParam(5)
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendSay("Chúng đã bắt đầu làm việc với một kịch bản khác rồi! Chắc chắn chúng đã bị sự việc này tác động rất lớn.")
sm.setParam(17)
sm.sendSay("......?")
sm.moveCamera(False, 180, -400, 259)
sm.sendDelay(4737)
sm.sendDelay(100)
sm.setParam(5)
sm.setSpeakerID(1500006) # Tiên nữ Ephony
sm.sendNext("Cẩn thận, Vua Chuột Chũi độc ác! Vì búp và mesos, tôi là #b#h0##k! Nhân danh những chiếc bánh sandwich nóng hổi, ta sẽ trừng phạt ngươi! ")
sm.setSpeakerID(1500005) # Tiên nữ Tracy
sm.sendSay("Ê, không công bằng! Tôi mới là người định đóng vai #b#h0##k!")
sm.setSpeakerID(1500007) # Tiên nữ Phiny
sm.sendSay("Không! Đó là vai của tôi!")
sm.moveCamera(True, 0, 0, 0)
sm.sendDelay(0)
sm.sendDelay(100)
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendNext("Tên vở kịch là #bSự Biến Hình Lộng Lẫy Của Chuột Chũi Mà #h0# Mít Ướt Đã Gây Ra#k.")
sm.setParam(17)
sm.sendSay("......")
sm.setParam(5)
sm.setSpeakerID(1500000) # Cootie the Really Small
sm.sendSay("Nghe có vẻ là một vở kịch mà tôi rất muốn xem!")
sm.lockInGameUI(False, True)
sm.startQuest(32129)
sm.warp(101072000)