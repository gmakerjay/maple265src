def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Bộ sưu tập Huy hiệu#l\r\n"
            "#L1#Nhiệm vụ Huy hiệu#l#k\r\n\r\n"
            "#L2#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eBộ sưu tập Huy hiệu#n\r\n\r\n"
                "Mở #bMedal Collection UI#k để xem các huy hiệu bạn đã nhận.\r\n\r\n"
                "Việc cấp lại huy hiệu sẽ có chi phí Mesos đi kèm.\r\n"
                "Chi phí cấp lại huy hiệu có thể tăng lên đến #b1,000,000 Mesos#k, dựa trên tổng số huy hiệu đã được cấp lại.\r\n\r\n"
                "#rMột số huy hiệu không thể cấp lại#k. Những huy hiệu không thể cấp lại sẽ hiển thị #bCannot be re-issued#k "
                "trong tooltip, và khi vứt bỏ chúng sẽ hiển thị một thông báo xác nhận."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eNhiệm vụ Huy hiệu#n\r\n\r\n"
                "#bMedal Quest UI#k cho phép bạn xem cả #bIn Progress#k và #bAvailable medal quests#k.\r\n\r\n"
                "Có rất nhiều nhiệm vụ huy hiệu khác nhau. Nếu có huy hiệu bạn muốn, hãy thử thách để giành lấy nó!"
            )

        else:
            break


start()
