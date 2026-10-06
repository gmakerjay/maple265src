def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Combat Power là gì?#l\r\n"
            "#L1#Các yếu tố tăng trưởng được tính vào Combat Power#l\r\n"
            "#L2#Các loại chỉ số dùng để tính Combat Power và phương pháp tính#l#k\r\n\r\n"
            "#L3#Kết thúc hội thoại.#l"
        )

        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Combat Power là gì?>#n\r\n\r\n"
                "#bCombat Power#k là một con số đại diện cho mức tăng trưởng tổng thể của nhân vật, "
                "không tính các yếu tố thay đổi theo job, để bạn có thể tiện so sánh mức tăng trưởng với các nhân vật khác.\r\n\r\n"
                "Khác với #bDamage Range#k, việc so sánh với nhân vật khác là có thể, nhưng lưu ý rằng những con số này "
                "khác với cách tính sát thương thực tế của nhân vật."
            )

        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Các yếu tố tăng trưởng được tính vào Combat Power>#n\r\n\r\n"
                "Combat Power phản ánh #bchỉ số cơ bản#k của nhân vật, #btrang bị#k, #bTrait#k, #bAbility#k, "
                "#bHyper Stats#k, #bLegion Member & Grid Bonus#k, #bLegion Artifact Bonus#k và #bHEXA Stats#k.\r\n\r\n"
                "Chỉ số tăng từ tất cả kỹ năng, bao gồm #bLink Skill#k và #bGuild Skill#k, cũng như chỉ số tăng từ tất cả vật phẩm sử dụng "
                "sẽ #rkhông được phản ánh#k trong Combat Power.\r\n\r\n"
                "Tuy nhiên, các chỉ số sau đây sẽ được phản ánh trong Combat Power vì chúng bị ảnh hưởng trực tiếp bởi tăng trưởng trang bị "
                "hoặc liên quan đến tính toán sát thương thực tế:\r\n\r\n"
                "- #rChỉ số của Cung, Phi tiêu và Đạn khi đang sử dụng#k\r\n"
                "- #rBlessing of the Fairy hoặc Empress's Blessing#k\r\n"
                "- #rStar Force Conversion#k\r\n"
                "- #rTanadian Ruin#k\r\n"
                "- #rChỉ số tăng từ một số Event Skills#k"
            )

        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Các loại chỉ số dùng để tính Combat Power và phương pháp tính>#n\r\n\r\n"
                "Combat Power được tính dựa trên #bMain Stat#k của nhân vật, #bSecondary Stat#k, #bAttack Power/Magic ATT#k, "
                "#bDamage#k, #bBoss Monster Damage#k, #bFinal Damage#k và #bCritical Damage#k.\r\n\r\n"
                "Các chỉ số có thể được áp dụng khác nhau tùy theo mục tiêu bị tấn công hoặc bản đồ diễn ra chiến đấu, "
                "như #bIgnore Defense#k, #bElemental Resistance Ignored#k, #bArcane Power/Sacred Power#k, v.v... "
                "sẽ #rkhông được tính#k trong Combat Power.\r\n\r\n"
                "Ngoài ra, các hằng số cố định theo vũ khí và job (những giá trị áp dụng khác nhau tùy job) cũng #rkhông được tính#k."
            )

        else:
            break


start()
