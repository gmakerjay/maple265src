def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Character Presets là gì?#l\r\n"
            "#L1#Cách sử dụng Character Presets?#l#k\r\n\r\n"
            "#L2#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eCharacter Presets là gì?#n\r\n\r\n"
                "#bCharacter Presets#k cho phép bạn nhanh chóng chuyển sang một preset do bạn thiết kế.\r\n"
                "Bạn có tổng cộng #b5#k preset và có thể thiết lập từng preset theo ý bạn.\r\n\r\n"
                "#eCác preset khả dụng#n\r\n"
                "- Equipment Presets\r\n"
                "- Hyper Stats Presets\r\n"
                "- Ability Presets\r\n"
                "- Union Presets\r\n"
                "- Link Skill Presets\r\n"
                "- Hotkey Settings Presets\r\n"
                "- Familiar Presets"
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eCách sử dụng Character Presets?#n\r\n\r\n"
                "1. Bạn có thể mở tab Character Presets thông qua #bCharacter > Character Presets#k hoặc #bphím tắt Character Presets#k.\r\n\r\n"
                "2. Bạn có thể đổi tên Character Preset trong #bSettings#k.\r\n\r\n"
                "3. Bạn có thể thiết lập #bEquipment, Hyper Stats, Ability, Union, và Link Skill Presets#k cho mỗi Character Preset.\r\n\r\n"
                "4. Để áp dụng một Character Preset, hãy chọn tab Character Preset rồi nhấn nút #bApply#k.\r\n\r\n"
                "5. Chỉ các preset đã thay đổi mới được thay đổi\r\n"
                "- Chi phí đổi preset sẽ được tính ngay khi nó được thay đổi\r\n"
                "- Nếu preset mục tiêu giống với preset hiện tại của bạn, bạn sẽ không bị tính phí\r\n\r\n"
                "6. #rNhấn phím tắt đổi preset và một phím số 1 - 5 đồng thời#k\r\n"
                "#bđể chuyển ngay sang một character preset cụ thể#k"
            )

        else:
            break


start()
