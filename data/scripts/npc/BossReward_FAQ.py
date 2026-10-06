def start():
    sm.flipDialogue()
    sm.sendNext(
        "Kho lưu trữ Boss Reward đúng như tên gọi: nơi lưu trữ phần thưởng Boss.\r\n\r\n"
        "Các vật phẩm nhận được từ #rphân phối phần thưởng tổ đội#k có thể được chuyển vào túi đồ của bạn thông qua tính năng #bTìm#k của Kho Boss Reward."
    )

    sm.flipDialogue()
    sm.sendSay(
        "Nhấn nút #bTìm tất cả#k để chuyển toàn bộ vật phẩm Boss Reward đang lưu vào túi đồ hoặc các túi, nếu #rTự động lưu vào túi#k đang bật.\r\n\r\n"
        "Để chuyển vật phẩm từ Boss Reward vào túi đồ, bạn có thể #bkéo thả#k hoặc #bnhấp đúp#k.\r\n"
        "Tuy nhiên, nếu #rTự động lưu vào túi#k được bật, vật phẩm sẽ được chuyển vào túi tương ứng."
    )

    sm.flipDialogue()
    sm.sendNext(
        "Lưu ý rằng bạn cũng có thể kéo thả các vật phẩm liên quan từ Boss Reward vào các túi của bạn."
    )

start()
