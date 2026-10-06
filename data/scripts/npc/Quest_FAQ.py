def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Quest UI#l\r\n"
            "#L1#Quest Notifier#l#k\r\n\r\n"
            "#L2#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eQuest UI#n\r\n\r\n"
                "#bQuest UI#k cho phép bạn xem các nhiệm vụ #bAvailable#k, #bIn Progress#k, và #bCompleted#k.\r\n\r\n"
                "Nhiệm vụ được chia theo danh mục, giúp bạn dễ dàng kiểm tra loại nhiệm vụ bạn muốn."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Categories#n\r\n\r\n"
                "Nhiệm vụ được phân loại theo các nhóm sau:\r\n\r\n"
                "1. Story: Main, Job, Normal, Event\r\n"
                "2. Repeat: Daily, Weekly\r\n"
                "3. Guide\r\n"
                "4. Cash: Timed, Special, Maple Rewards"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Categories#n\r\n\r\n"
                "1. Story: Nhiệm vụ liên quan đến nội dung cốt truyện\r\n"
                "- Main: Nhiệm vụ liên quan đến cốt truyện chính\r\n"
                "- Job: Nhiệm vụ liên quan đến boss và thăng cấp nghề\r\n"
                "- Event: Nhiệm vụ cốt truyện theo sự kiện\r\n"
                "- Normal: Nhiệm vụ liên quan đến cốt truyện không thuộc Main, Job, hoặc Event"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Categories#n\r\n\r\n"
                "2. Repeat: Nhiệm vụ có thể lặp lại\r\n"
                "- Daily: Nhiệm vụ có thể lặp lại hằng ngày\r\n"
                "- Weekly: Nhiệm vụ có thể lặp lại hằng tuần\r\n\r\n"
                "3. Guide: Nhiệm vụ hướng dẫn cách chơi game"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Categories#n\r\n\r\n"
                "4. Cash: Nhiệm vụ liên quan đến Cash hoặc Reward Points\r\n"
                "- Timed: Nhiệm vụ Cash cần hoàn thành trong một khoảng thời gian\r\n"
                "- Special: Nhiệm vụ Cash có thể hoàn thành bất cứ lúc nào\r\n"
                "- Maple Rewards: Nhiệm vụ Cash cho Reward Points"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Category Banners#n\r\n\r\n"
                "Mỗi danh mục nhiệm vụ có banner ở phía trên cũng bao gồm các tính năng tiện lợi bổ sung.\r\n\r\n"
                "1. Story: Bao gồm bộ lọc cho nhiệm vụ tiên quyết\r\n"
                "- Required: Nhiệm vụ giới hạn gameplay cho đến khi hoàn thành\r\n"
                "- Job Advancement: Nhiệm vụ cần thiết để thăng cấp nghề\r\n"
                "- Skill: Nhiệm vụ nhận kỹ năng khi hoàn thành\r\n"
                "- Area: Nhiệm vụ cho phép vào khu vực cấp cao hơn khi hoàn thành\r\n"
                "- Boss: Nhiệm vụ mở khóa thử thách boss khi hoàn thành\r\n"
                "- Content: Nhiệm vụ mở khóa nội dung bổ sung khi hoàn thành\r\n"
                "- System: Nhiệm vụ mở khóa hệ thống bổ sung khi hoàn thành\r\n\r\n"
                "#r* Nếu bạn chọn nhiều loại nhiệm vụ tiên quyết, chỉ những nhiệm vụ đáp ứng các yêu cầu đã chọn mới được hiển thị.#k"
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Category Banners#n\r\n\r\n"
                "2. Repeat: Nhấn để mở Maple Planner UI để dễ dàng hoàn thành các nhiệm vụ lặp lại.\r\n\r\n"
                "3. Guide: Nhấn để mở website hướng dẫn chính thức để xem hướng dẫn chi tiết.\r\n\r\n"
                "4. Cash: Nhấn để di chuyển đến Cash Shop, nơi bạn có thể bắt đầu và quản lý các nhiệm vụ cash."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eQuest Sorting#n\r\n\r\n"
                "Các nhiệm vụ Available và In Progress được sắp xếp như sau:\r\n"
                "1. Nhiệm vụ có thể hoàn thành\r\n"
                "2. Nhiệm vụ đề xuất\r\n"
                "- Tuy nhiên, các nhiệm vụ có thể hoàn thành sẽ không được liệt kê riêng\r\n"
                "- Tên nhiệm vụ sẽ mờ nếu không được đề xuất\r\n"
                "3. Danh mục nhiệm vụ có khả năng được kiểm tra thường xuyên\r\n"
                "4. Theo thứ tự giảm dần của yêu cầu cấp độ nhân vật của nhiệm vụ\r\n\r\n"
                "Các nhiệm vụ Completed được sắp xếp như sau:\r\n"
                "1. Danh mục nhiệm vụ có khả năng được kiểm tra thường xuyên\r\n"
                "2. Thời điểm nhiệm vụ được hoàn thành"
            )

            sm.flipDialogue()
            sm.sendNext(
                "#eQuest Info#n\r\n\r\n"
                "Nhấn vào tên NPC, quái vật, hoặc tên bản đồ được tô nổi bật trong Quest Info "
                "sẽ cho phép bạn tìm vị trí của chúng trên World Map."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eQuest Notifier#n\r\n\r\n"
                "#rQuest Notifier UI#k cho phép bạn nhanh chóng kiểm tra các nhiệm vụ #bIn Progress#k.\r\n\r\n"
                "Các nhiệm vụ có thể hoàn thành sẽ nằm ở #btrên cùng#k, "
                "sau đó là các nhiệm vụ mới được thêm vào Quest Notifier gần đây."
            )

            sm.flipDialogue()
            sm.sendNext(
                "#eQuest Notifier#n\r\n\r\n"
                "Các nhiệm vụ đã nhận và các nhiệm vụ có thể hoàn thành sẽ được tự động thêm vào Quest Notifier.\r\n\r\n"
                "Nhấn vào một nhiệm vụ để xem thông tin chi tiết của nó trong #bQuest UI#k."
            )

        else:
            break


start()
