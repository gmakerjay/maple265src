def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Cửa sổ Túi hợp nhất (Unified Bag)#l\r\n"
            "#L1#Quy tắc sử dụng Túi#l#k\r\n\r\n"
            "#L2#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eCửa sổ Túi hợp nhất#n\r\n\r\n"
                "Cửa sổ Túi hợp nhất cho phép bạn truy cập #btất cả các túi#k từ #bmột cửa sổ duy nhất#k.\r\n\r\n"
                "Sử dụng các túi sẽ tạo thêm #bkhông gian lưu trữ#k cho loại vật phẩm tương ứng.\r\n\r\n"
                "Tuy nhiên, một số túi nhất định, như #rTúi Party Quest#k, sẽ #rkhông được bao gồm#k trong Cửa sổ Túi hợp nhất."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eTự động lưu vào Túi#n\r\n\r\n"
                "Khi tùy chọn #bTự động lưu vào Túi#k được bật, các vật phẩm nhặt được sẽ #bđược đưa vào túi phù hợp#k thay vì vào túi đồ chính.\r\n\r\n"
                "Việc lấy vật phẩm từ #rKho lưu trữ#k hoặc #rKho Boss Reward#k cũng sẽ bị ảnh hưởng bởi tùy chọn này."
            )

            sm.flipDialogue()
            sm.sendNext(
                "#eLàm trống Túi#n\r\n\r\n"
                "Nhấn nút #bLàm trống#k để chuyển #btất cả vật phẩm#k từ túi vào túi đồ.\r\n\r\n"
                "Tuy nhiên, nếu túi đồ #rkhông đủ ô trống#k, túi sẽ chỉ làm trống #dtrong phạm vi có thể#k."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eQuy tắc sử dụng Túi#n\r\n\r\n"
                "Bạn có thể sở hữu số lượng túi như sau:\r\n\r\n"
                "- #b2 Túi Công thức#k, #b2 Túi Soul#k, #b2 Túi Scroll#k và #b2 Túi Coin#k\r\n"
                "- #b10 Túi Chair#k và #b10 Túi Title#k\r\n"
                "- Tổng cộng #b10 Túi Khoáng sản, Cây trồng hoặc Sản xuất#k"
            )

        else:
            break


start()
