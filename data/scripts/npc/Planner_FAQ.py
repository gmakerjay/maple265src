def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Maple Planner là gì?#l\r\n"
            "#L1#Cách sử dụng Maple Planner?#l#k\r\n\r\n"
            "#L2#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendPrev(
                "Maple Planner là một UI dùng để xem trạng thái của #bTính năng hàng ngày/tuần#k trong MapleStory.\r\n\r\n"
                "Để kiểm tra trạng thái chơi của bạn, chỉ cần chọn nội dung bạn muốn xem.\r\n\r\n"
                "Nếu bạn chưa hoàn thành nội dung đó, bạn có thể dùng #bBẮT ĐẦU NHIỆM VỤ#k hoặc #bDỊCH CHUYỂN#k "
                "để di chuyển ngay tới khu vực của nội dung đó."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Đăng ký tính năng>#n\r\n\r\n"
                "Bạn có thể dùng #bUI Chỉnh Sửa#k, nằm trong #bCài Đặt#k của mỗi danh mục, để chọn nội dung nào "
                "bạn muốn hiển thị trong Maple Planner.\r\n\r\n"
                "Bạn có thể đăng ký nội dung mà bạn chưa mở khóa trong Planner, nhưng bạn vẫn sẽ không thể truy cập nó."
            )

            sm.flipDialogue()
            sm.sendSay(
                "Bạn có thể chọn boss theo #bChế Độ Khó#k.\r\n\r\n"
                "Nhưng nếu nhiều độ khó boss dùng chung một tính lượt chung, bạn sẽ không thể chọn chúng."
            )

            sm.flipDialogue()
            sm.sendPrev(
                "#e<Bắt Đầu và Hoàn Thành Nhiệm Vụ Hàng Ngày>#n\r\n\r\n"
                "Bạn có thể tìm thấy các nút #bBẮT ĐẦU TẤT CẢ#k và #bHOÀN THÀNH TẤT CẢ NHIỆM VỤ NGÀY#k trong Maple Planner.\r\n\r\n"
                "Trong danh mục Nhiệm Vụ Hàng Ngày, nhấn #bBẮT ĐẦU/HOÀN THÀNH TẤT CẢ#k để bắt đầu hoặc hoàn thành tất cả Nhiệm Vụ Hàng Ngày đã được đăng ký trong Maple Planner.\r\n\r\n"
                "Lưu ý rằng khi bạn dùng nút #bHOÀN THÀNH TẤT CẢ#k, bạn sẽ chỉ nhận được phần thưởng đã được chọn trong UI."
            )

        else:
            break


start()
