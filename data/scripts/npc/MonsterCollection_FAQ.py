def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "Bạn có câu hỏi nào về #e[Thu Thập Quái Vật]#n không?#b\r\n\r\n"
            "#L0#1. Làm thế nào để Thu Thập Quái Vật?#l\r\n"
            "#L1#2. Làm thế nào để nhận Huân chương Thu Thập Quái Vật?#l\r\n"
            "#L2#3. Làm thế nào để thực hiện Tham Hiểm Quái Vật?#l\r\n"
            "\r\n"
            "#L3#Kết thúc hội thoại#l#k"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eLàm thế nào để Thu Thập Quái Vật?#n\r\n\r\n"
                "Trong quá trình săn quái khi phiêu lưu khắp Maple World, bạn sẽ có cơ hội thêm quái vật vào bộ sưu tập. "
                "Tuy nhiên, bạn không thể Thu Thập Quái Vật khi đang tham gia NHIỆM VỤ NHÓM.\r\n\r\n"
                "Bộ sưu tập được dùng chung trong cùng một thế giới, vì vậy nhiều nhân vật có thể cùng nhau hoàn thành!"
            )
        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eLàm thế nào để nhận Huân chương Thu Thập Quái Vật?#n\r\n\r\n"
                "Thu thập đủ số lượng quái vật yêu cầu theo từng khu vực để nhận huân chương."
            )
        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#eLàm thế nào để sử dụng Tham Hiểm Quái Vật?#n\r\n\r\n"
                "Khi bạn hoàn thành một hàng quái vật trong Thu Thập Quái Vật, bạn có thể cử hàng đó đi thám hiểm thay cho bạn. "
                "Sau khi hoàn tất thám hiểm, quái vật sẽ mang về nhiều vật phẩm khác nhau, bao gồm ĐIỂM XU THƯỞNG. "
                "Hãy tận dụng cơ hội đặc biệt này để nhận vật phẩm!"
            )
        else:
            break


start()
