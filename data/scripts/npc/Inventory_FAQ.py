def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Tìm kiếm trong Túi đồ#l\r\n"
            "#L1#Sắp xếp Túi đồ#l\r\n"
            "#L2#Khóa vật phẩm#l\r\n"
            "#L3#Tính năng riêng của tab Trang trí#l\r\n\r\n"
            "#L4#Kết thúc#l#k"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eTìm kiếm trong Túi đồ#n\r\n\r\n"
                "Nhập từ khóa vào #bthanh Tìm kiếm#k ở phía dưới cửa sổ túi đồ để tìm các vật phẩm phù hợp.\r\n\r\n"
                "Kết quả sẽ hiển thị #dtab và ô#k chứa vật phẩm đó."
            )
            sm.sendNext(
                "Các gợi ý sẽ #btự động hiển thị#k khi bạn nhập.\r\n"
                "Những gợi ý này #bchỉ bao gồm các vật phẩm hiện có trong túi đồ#k.\r\n\r\n"
                "Bạn #rkhông thể tìm kiếm#k khi túi đồ đang ở chế độ gọn (compact mode)."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eTự động sắp xếp#n\r\n\r\n"
                "Bạn có thể tự động sắp xếp túi đồ theo các cách sau:\r\n\r\n"
                "- #bGộp đồ#k: Lấp đầy túi đồ từ trên xuống và sắp xếp.\r\n"
                "- #bSắp xếp theo Loại#k: Nhóm các vật phẩm theo công dụng.\r\n"
                "- #bSắp xếp theo Bộ Đặc biệt#k: Thu thập các vật phẩm Trang trí có hiệu ứng bộ và sắp xếp chúng.\r\n\r\n"
                "Để biết thêm chi tiết về #bSắp xếp theo Bộ Đặc biệt#k, hãy xem phần #dTính năng riêng của tab Trang trí#k."
            )

        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#eKhóa vị trí vật phẩm#n\r\n\r\n"
                "Sử dụng tính năng #bKhóa#k ở phía trên túi đồ để #dgiữ cố định vị trí ô#k của vật phẩm.\r\n\r\n"
                "Các vật phẩm đã khóa vị trí sẽ #bkhông bị di chuyển#k, ngay cả khi bạn tự động sắp xếp túi đồ.\r\n\r\n"
                "Tuy nhiên, nếu vật phẩm đã khóa bị sử dụng hết, vứt bỏ hoặc xóa, #rkhóa cũng sẽ tự động biến mất#k."
            )
            sm.sendNext(
                "#eKhóa vật phẩm#n\r\n\r\n"
                "Sử dụng tính năng #bKhóa vật phẩm#k để #bBảo vệ Trang bị, Phi tiêu và Đạn#k.\r\n\r\n"
                "Vật phẩm đã khóa #rkhông thể bán, vứt bỏ hoặc cường hóa#k."
            )

        elif sel == 3:
            sm.flipDialogue()
            sm.sendNext(
                "Tab Trang trí có tổng cộng #b256 ô#k.\r\n\r\n"
                "Sử dụng nút #bMở rộng#k để xem và sắp xếp tab Trang trí.\r\n\r\n"
                "Tab này còn có các tính năng tiện lợi như #bBộ lọc vật phẩm Trang trí#k và #bSắp xếp theo Bộ Đặc biệt#k."
            )
            sm.sendSay(
                "#eTính năng Bộ lọc vật phẩm Trang trí#n\r\n\r\n"
                "Tính năng này cho phép bạn lọc và xem vật phẩm Trang trí #btheo loại hoặc theo cấp#k, "
                "như #dSpecial Label#k, #rRed Label#k và #kBlack Label#k.\r\n\r\n"
                "Khi áp dụng Bộ lọc Trang trí, #rbạn sẽ không thể sắp xếp hoặc khóa vật phẩm#k.\r\n\r\n"
                "Bạn #rkhông thể sử dụng#k Bộ lọc Trang trí khi túi đồ đang ở chế độ gọn (compact mode)."
            )
            sm.sendNext(
                "#eSắp xếp theo Bộ Đặc biệt#n\r\n\r\n"
                "Đây là tùy chọn tự động sắp xếp giúp #bnhóm và sắp xếp#k các vật phẩm Trang trí có hiệu ứng bộ.\r\n\r\n"
                "Thứ tự sắp xếp như sau:\r\n\r\n"
                "- Hầu hết các bộ: #bMũ > Trang phục > Giày > Áo choàng > Vũ khí#k\r\n"
                "- #dSpecial Label#k, #rRed Label#k, #kBlack Label#k: #bMũ > Trang phục > Giày > Áo choàng > Vũ khí#k\r\n"
                "- Các bộ Trang trí khác: #bMũ > Trang phục > Áo choàng > Vũ khí#k\r\n"
                "- Vật phẩm #dkhông có hiệu ứng bộ#k sẽ được đặt ở #rphía dưới cùng#k."
            )

        else:
            break


start()
