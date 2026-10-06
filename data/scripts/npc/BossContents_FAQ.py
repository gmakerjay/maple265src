def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp Boss UI>#n#b\r\n\r\n"
            "#L0#Làm sao để di chuyển đến #bBoss Map#k?#l\r\n"
            "#L1#Cách #bauto-match#k?#l\r\n"
            "#L2#Cách đăng bài trong bảng tuyển party boss?#l\r\n"
            "#L3#Cách gửi yêu cầu tham gia bài tuyển party boss?#l#k\r\n\r\n"
            "#L4#Kết thúc hội thoại#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Di chuyển đến Boss Map>#n\r\n\r\n"
                "Chọn nội dung boss bạn muốn trong tab #bMove to Boss#k, sau đó nhấn nút #bMove to Boss#k "
                "để di chuyển đến bản đồ vào boss đó."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Auto-matching>#n\r\n\r\n"
                "Nhấn nút #bauto-match#k ở góc trên bên phải của UI để dùng tính năng auto-matching.\r\n\r\n"
                "Dùng auto-matching để tự động tìm party boss cho boss đã chọn."
            )

        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Đăng bài trong Party Recruitment Bulletin Board>#n\r\n\r\n"
                "Dùng tab #bRecruit Party#k để tuyển party boss hoặc gửi yêu cầu tham gia party boss.\r\n\r\n"
                "Nhấn nút #bRecruit#k trong tab Recruit Party để tạo bài tuyển party boss.\r\n\r\n"
                "Bạn có thể nhập nội dung tuyển trong #bParty Desc.#k, và chọn #bboss mục tiêu#k cùng #bđộ khó#k "
                "của party bạn đang tìm."
            )

            sm.flipDialogue()
            sm.sendSay(
                "Bạn có thể tạo bài tuyển khi bạn là #bparty leader#k hoặc #bkhông ở trong party#k.\r\n\r\n"
                "Nếu bạn tạo bài khi không ở trong party, một party sẽ được #btự động tạo#k và bạn sẽ là party leader.\r\n\r\n"
                "Tuy nhiên, #btất cả thành viên party#k phải #đáp ứng điều kiện tiên quyết#k, như level và nhiệm vụ tiên quyết "
                "của boss mục tiêu, thì mới có thể tuyển party boss này."
            )

            sm.flipDialogue()
            sm.sendSay(
                "Nếu bạn yêu cầu một mức spec nhất định từ các thành viên bạn đang tìm, "
                "bạn có thể đặt các yêu cầu đó trong #bRequirements#k.\r\n\r\n"
                "Bạn có thể đặt #bLevel, Combat Power, Legion Level, Arcane Power, hoặc Sacred Power Level#k trong Requirements.\r\n\r\n"
                "#bParty leader#k có quyền chấp nhận hoặc từ chối người đăng ký.\r\n\r\n"
                "Nếu party leader muốn, #bRequirements#k có thể được #bthay đổi#k trong lúc tuyển."
            )

            sm.flipDialogue()
            sm.sendNext(
                "Người đăng ký được party leader chấp nhận sẽ vào party tương ứng #bngay lập tức#k.\r\n\r\n"
                "Các #bthành viên hiện tại#k vẫn sẽ giữ nguyên ngay cả khi họ không đáp ứng Requirements hiện tại.\r\n\r\n"
                "Party leader có thể dùng #bParty Invite#k hiện có để mời thành viên "
                "bất kể Requirements, nhằm tạo một party đa dạng."
            )

        elif sel == 3:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Yêu cầu tham gia tuyển party boss>#n\r\n\r\n"
                "Nếu bạn đang tìm party boss, bạn có thể gửi yêu cầu tham gia một bài tuyển có sẵn.\r\n\r\n"
                "Tuy nhiên, bạn cần đáp ứng #điều kiện tiên quyết#k như level và nhiệm vụ tiên quyết của boss mục tiêu, "
                "và cả #bRequirements#k mà party yêu cầu để gửi yêu cầu."
            )

            sm.flipDialogue()
            sm.sendNext(
                "Bạn chỉ có thể gửi yêu cầu tham gia #bmột party tại một thời điểm#k.\r\n\r\n"
                "Nếu bạn muốn gửi yêu cầu tham gia một bài tuyển khác, bạn cần #rhủy#k yêu cầu hiện tại trước.\r\n\r\n"
                "Ngoài ra, bạn vẫn cần đáp ứng #điều kiện tiên quyết#k như level và nhiệm vụ tiên quyết của boss mục tiêu, "
                "và #bRequirements#k mà party yêu cầu để gửi yêu cầu."
            )

        else:
            break


start()
