def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "Hỏi tôi bất cứ điều gì về Maple Guide.\r\n#b\r\n\r\n"
            "#L0#Maple Guide là gì?#l\r\n"
            "#L1#Giới thiệu về tính năng Dịch Chuyển Nhanh#l\r\n"
            "#L2#Cách cài đặt Địa điểm yêu thích cho Dịch Chuyển Nhanh?#l#k\r\n\r\n"
            "#L3#Không còn câu hỏi nào nữa#l"
        )

        # 0) What is the Maple Guide?
        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Maple Guide có thể hiển thị cho bạn tất cả nội dung khả dụng cho nhân vật của bạn chỉ trong một lần nhìn."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Dưới đây là cách nội dung được sắp xếp:\r\n\r\n"
                "- #bLevel Content#k:\r\n"
                "Thông tin về các nhiệm vụ và khu săn được đề xuất phù hợp với cấp độ hiện tại của bạn.\r\n\r\n"
                "- #bBoss Content#k:\r\n"
                "Thông tin về độ khó và phần thưởng của tất cả boss, được sắp xếp theo bậc.\r\n\r\n"
                "- #bSpecial Content#k:\r\n"
                "Thông tin về nội dung đặc biệt của MapleStory, được gom lại một nơi để dễ truy cập."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Nhấn #bphím tắt#k trên bàn phím sẽ mở/đóng Maple Guide, đồng thời thu nhỏ/phóng to cửa sổ.\r\n\r\n"
                "#r* Nếu bạn đã chọn 'Secondary Key Settings' thay vì 'Basic Key Settings' khi tạo nhân vật, "
                "bạn cần mở menu Key Bindings và tự đăng ký phím tắt Maple Guide#k"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Bạn có thể nhấn các #bcontent buttons#k trong Maple Guide để xem thông tin nội dung tương ứng, "
                "và cũng có thể di chuyển đến khu vực mục tiêu hoặc bắt đầu nhiệm vụ tiên quyết."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Nếu bạn là #bbeginner#k, bạn có thể chơi các nội dung trong mục #bLevel Content#k để lên cấp nhanh, "
                "vì chúng được thiết kế phù hợp với năng lực hiện tại của nhân vật.\r\n\r\n"
                "Các mục #bBoss & Special Content#k sẽ đưa ra những mục tiêu thử thách hơn để bạn hướng tới."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Maple Guide]#k#n\r\n\r\n"
                "Để xem phần Trợ giúp, hãy nhấn nút #b?#k ở góc trên bên phải của cửa sổ Maple Guide."
            )

            sm.flipDialogue()
            sm.sendNext(
                "Hãy sử dụng Maple Guide thật tốt nhé! Tôi sẽ cổ vũ cho những cuộc phiêu lưu đầy niềm vui của bạn!"
            )

        # 1) Dịch Chuyển Nhanh
        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#e#r[Dịch Chuyển Nhanh]#k#n\r\n\r\n"
                "Nằm trong mục Level Content, tính năng này cho phép bạn #bdi chuyển ngay lập tức#k "
                "đến bất kỳ điểm đến đã lưu chỉ với một cú nhấp, miễn là đáp ứng đủ điều kiện để đến đó."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Dịch Chuyển Nhanh]#k#n\r\n\r\n"
                "Destination List hiển thị các lối tắt đến các nhiệm vụ được đề xuất, khu săn quái, "
                "và các thị trấn mà các anh hùng thường xuyên ghé thăm."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Dịch Chuyển Nhanh]#k#n\r\n\r\n"
                "Nhấn nút #bMore#k sẽ hiển thị danh sách đầy đủ các điểm đến Dịch Chuyển Nhanh, "
                "với bản đồ được chia thành danh mục #bTown#k hoặc #bField#k."
            )

            sm.flipDialogue()
            sm.sendNext(
                "#e#r[Dịch Chuyển Nhanh]#k#n\r\n\r\n"
                "ạn không thể di chuyển đến các khu vực có cấp độ cao hơn 10 cấp so với cấp độ hiện tại của nhân vật nếu khu vực đó có cấp độ dưới 200, và bạn cũng không thể di chuyển đến các khu vực có cấp độ cao hơn cấp độ hiện tại của nhân vật nếu khu vực đó có cấp độ trên 200.\r\n"
                "Một số khu vực yêu cầu bạn hoàn thành một nhiệm vụ tiên quyết trước khi có thể chuyển đến đó.\r\n\r\n"
                "#r* Bạn không thể sử dụng chức năng Di chuyển nhanh nếu đang ở khu vực mà tính năng dịch chuyển tức thời bị vô hiệu hóa."
            )

        # 2) Địa điểm yêu thích
        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#e#r[Dịch Chuyển Nhanh - Địa điểm yêu thích]#k#n\r\n\r\n"
                "Bạn có thể tận dụng tối đa chức năng Di chuyển nhanh bằng cách thêm những địa điểm thường xuyên ghé thăm vào #bĐịa điểm yêu thích#k của bạn."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Dịch Chuyển Nhanh - Địa điểm yêu thích]#k#n\r\n\r\n"
                "Nhấn vào nút #b[Chỉnh Sửa]#k hình bánh răng ở bên phải mục #eĐịa điểm yêu thích#n sẽ chuyển sang #bChế Độ Chỉnh Sửa#k và hiển thị các nút Lưu/Hủy."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e#r[Dịch Chuyển Nhanh - Địa điểm yêu thích]#k#n\r\n\r\n"
                "Ở Chế độ Chỉnh sửa, bạn có thể thêm hoặc xóa các Địa điểm Yêu thích.\r\n\r\n"
                "#b- Thêm:#k\r\n"
                "Nhấp chuột vào các địa điểm trên bản đồ để thêm chúng vào mục Yêu thích. Các địa điểm yêu thích sẽ có dấu tích.\r\n\r\n"
                "#b- Loại bỏ:#k\r\n"
                "Nhấp chuột vào một địa điểm đã lưu trong danh sách Địa điểm yêu thích để xóa địa điểm đó khỏi danh sách."
            )

            sm.flipDialogue()
            sm.sendNext(
                "#e#r[Dịch Chuyển Nhanh - Địa điểm yêu thích]#k#n\r\n\r\n"
                "Sau khi chỉnh sửa, nhấn #b[Lưu]#k để lưu các thay đổi của bạn.\r\n"
                "Nhấn phím #b[Hủy]#k sẽ thoát khỏi Chế độ chỉnh sửa mà không lưu các thay đổi."
            )

        else:
            break


start()
