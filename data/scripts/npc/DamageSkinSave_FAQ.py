def start():
    sm.flipDialogue()
    sel = sm.sendNext("#e<Trợ giúp>#n#b\r\n\r\n#L0#Hệ thống Lưu trữ Damage Skin#l\r\n#L1#Lưu Damage Skin#l\r\n#L2#Áp dụng Damage Skin#l\r\n#L3#Xóa Damage Skin#l#k\r\n\r\n#L4#Kết thúc hội thoại#l")
    if sel == 0:
        sm.flipDialogue()
        sm.sendNext("Đây là hệ thống cho phép bạn lưu trữ nhiều Damage Skin. #bChúng sẽ được lưu riêng, không chung với vật phẩm [Damage Skin Storage Scroll].#k")
        start()
    elif sel == 1:
        sm.flipDialogue()
        sm.sendNext("Bạn có thể lưu Damage Skin bằng cách nhấn nút [Lưu Damage Skin] trong cửa sổ Slot Damage Skin. Tuy nhiên, bạn không thể lưu Damage Skin nếu tất cả ô đã đầy.\r\n\r\n#bBạn chỉ có thể lưu Damage Skin đang được áp dụng hiện tại.\r\nMột số Damage Skin không thể lưu.#k")
        start()
    elif sel == 2:
        sm.flipDialogue()
        sm.sendNext("Bạn có thể nhấp đúp vào biểu tượng trong cửa sổ Slot Damage Skin để đổi sang Damage Skin bạn đã lưu trước đó.\r\n\r\n#bHãy kiểm tra xem Damage Skin đang áp dụng hiện tại đã được lưu chưa.\r\n(Bất kỳ Damage Skin nào chưa lưu sẽ bị mất.)#k")
        start()
    elif sel == 3:
        sm.flipDialogue()
        sm.sendNext("Xóa Damage Skin bạn không muốn bằng cách kéo và thả biểu tượng của nó.\r\n\r\n#bSau khi xóa, Damage Skin không thể khôi phục trừ khi bạn lấy lại được nó.#k")
        start()

start()