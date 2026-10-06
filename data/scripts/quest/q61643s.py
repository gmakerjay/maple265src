sm.setSpeakerID(9010000)
sm.sendNext("#b#e<Sử dụng Thú Cưng>#n#k\r\nBạn có thể mua thú cưng từ Cửa Hàng Tiền Mặt. Đôi khi bạn có thể nhận được chúng từ trùm hoặc sự kiện. Bạn có thể kiểm tra thú cưng đã nhận trong túi [Cash]. Nhấp đúp vào thú cưng để nhận hướng dẫn chi tiết về cách dùng thú cưng từ Bậc Thầy Thú Cưng Cloy và triệu hồi thú cưng đến gần nhân vật của bạn.")
sm.sendNext("#b#e<Chức Năng Thú Cưng và Cuộn Kỹ Năng Thú Cưng>#n#k\r\nThú cưng hỗ trợ bằng cách nhặt vật phẩm và mesos hoặc tự dùng bình hồi HP/MP cho bạn, cùng nhiều cách hữu ích khác.\r\nHãy dùng cuộn kỹ năng thú cưng bán tại Cửa Hàng Tiền Mặt nếu bạn muốn thêm khả năng mới cho thú cưng. Bạn có thể dùng cuộn này để tăng tầm hoạt động của thú cưng hoặc thêm các chức năng mà trước đây nó chưa có.")
sm.sendNext("#b#e<Độ No và Độ Thân Thiết của Thú Cưng>#n#k\r\nSau khi được triệu hồi, thú cưng sẽ dần đói theo thời gian. Nếu Độ No giảm về 0, chúng sẽ trở về túi đồ của bạn. Nhấp đúp vào thức ăn cho thú cưng trước khi Độ No về 0 để tăng Độ No. Độ Thân Thiết cũng tăng khi bạn cho ăn và cuối cùng sẽ tăng cấp thú cưng của bạn.")
sm.sendNext("#b#e<Thời Hạn và Hồi Sinh của Thú Cưng>#n#k\r\nThú cưng không vĩnh viễn sẽ biến thành búp bê khi thời hạn kết thúc, nhưng bạn có thể dùng Nước Sự Sống Cao Cấp bán tại Cửa Hàng Tiền Mặt để hồi sinh thú cưng.")
if (sm.getEmptyInventorySlots(5) > 1):
    sm.sendSayOkay("Tôi đã đưa cho bạn một thú cưng dùng thử!")
    chr.addItemToInventory(5000207, 1, "day", 3)
    sm.completeQuest(parentID)
else:
    sm.sendSayOkay("Không đủ ô chứa trong túi CASH của bạn.")