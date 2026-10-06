def start():
    while True:
        sm.flipDialogue()
        sel = sm.sendNext(
            "#e<Trợ giúp>#n#b\r\n\r\n"
            "#L0#Sequence Kỹ Năng là gì?#l\r\n"
            "#L1#Sequence Kỹ Năng Buff là gì?#l\r\n"
            "#L2#Cách thêm vào Sequence#l\r\n"
            "#L3#Cách xóa khỏi Sequence#l\r\n"
            "#L4#Cài đặt tên Sequence#l\r\n"
            "#L5#Thông báo Sequence#l\r\n\r\n"
            "#L6#Kết thúc hội thoại.#l#k"
        )

        # 0) Sequence Kỹ Năng
        if sel == 0:
            sm.flipDialogue()
            sm.sendNext(
                "#eSequence Kỹ Năng#n\r\n\r\n"
                "Sequence Kỹ Năng là một tính năng cho phép bạn #bnhanh chóng#k dùng #bnhiều kỹ năng liên tiếp#k "
                "bằng cách nhấn #bmột nút duy nhất#k.\r\n\r\n"
                "Chỉ một số kỹ năng nhất định mới có thể được thêm vào Sequence Kỹ Năng. "
                "Ví dụ, các kỹ năng có hiệu ứng #rbất tử (invincibility)#k #rkhông thể thêm vào sequence#k.\r\n\r\n"
                "Ngoài ra, nếu bạn thêm một kỹ năng có hiệu ứng #rmiễn nhiễm đẩy lùi (knockback immunity)#k "
                "vào sequence, hiệu ứng đó sẽ #rkhông kích hoạt#k."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eSequence Kỹ Năng#n\r\n\r\n"
                "Tạo và sử dụng Sequence Kỹ Năng sẽ giúp bạn #rdùng kỹ năng nhanh hơn#k so với Skill Macro.\r\n\r\n"
                "Lưu ý rằng Sequence Kỹ Năng #rkhông thể sử dụng#k ở những khu vực #rhạn chế kỹ năng#k, "
                "và các kỹ năng còn lại vẫn sẽ được dùng ngay cả khi sequence cấp cho bạn một #bstatus effect#k.\r\n\r\n"
                "Tuy nhiên, các Sequence Kỹ Năng đang hoạt động sẽ bị #rgián đoạn#k nếu bạn bị #rincapacitated#k."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eSequence Kỹ Năng#n\r\n\r\n"
                "Thời gian hồi chiêu hiển thị khi sử dụng Sequence Kỹ Năng sẽ được tính dựa trên "
                "#rthời gian hồi chiêu dài nhất#k trong sequence.\r\n\r\n"
                "Nếu thời gian hồi chiêu dài nhất được giảm thông qua một tính năng như #bAction Customization#k, "
                "#rthời gian hồi chiêu còn lại thực tế#k sẽ được hiển thị."
            )

            sm.flipDialogue()
            sm.sendNext(
                "Nếu một Sequence Kỹ Năng được #bthêm vào thông báo khi hồi chiêu kết thúc#k, bạn sẽ được thông báo "
                "khi #btất cả kỹ năng trong sequence#k có thể dùng lại.\r\n\r\n"
                "Khi sử dụng Sequence Kỹ Năng, các kỹ năng trong sequence sẽ được dùng, "
                "#btrừ những kỹ năng đang hồi chiêu#k hoặc #bchưa đủ điều kiện sử dụng#k."
            )

        # 1) Sequence Kỹ Năng Buff
        elif sel == 1:
            sm.flipDialogue()
            sm.sendNext(
                "#eSequence Kỹ Năng Buff#n\r\n\r\n"
                "Sequence Kỹ Năng Buff cho phép bạn #bnhanh chóng#k sử dụng #bnhiều kỹ năng buff và vật phẩm liên tiếp#k "
                "bằng cách nhấn #bmột nút duy nhất#k.\r\n\r\n"
                "Bạn có thể đăng ký tối đa #b30#k #bkỹ năng và vật phẩm#k. Tuy nhiên, chỉ một số kỹ năng và vật phẩm nhất định "
                "mới có thể được thêm vào Sequence Kỹ Năng Buff.\r\n\r\n"
                "Ngoài ra, lưu ý rằng Sequence Kỹ Năng Buff #rkhông thể sử dụng#k trong #bbản đồ đánh Boss#k. "
                "Nút Sequence Kỹ Năng Buff sẽ bị vô hiệu hóa."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#eSequence Kỹ Năng Buff#n\r\n\r\n"
                "#rCác kỹ năng và vật phẩm sau có thể được thêm vào Sequence Kỹ Năng Buff:#k\r\n\r\n"
                "- Noblesse Guild Skill\r\n"
                "- Profession Skills\r\n"
                "- Hero's Echo, Exclusive Spell, Focused Time,\r\n"
                "  Empress's Prayer\r\n"
                "- Sparkling Gold, Blue, Red Star Potions\r\n"
                "- Advanced Boss Rush Boost Potion, Boss Rush Boost Potion\r\n"
                "- Advanced Great Hero Boost Potion, Great Hero Boost Potion\r\n"
                "- Advanced Penetrating Boost Potion, Penetrating Boost Potion\r\n"
                "- Advanced Great Blessing Potion, Great Blessing Potion\r\n"
                "- Legendary Hero, Blessing, Fortitude, Insight Potion\r\n"
                "- Legion Wealth, Luck, Wealth, Expertise Lv 1-3\r\n"
                "- MVP Superpower\r\n"
                "- VIP Buff (Stats), EXP\r\n"
                "- Sayram's Elixir, Aurelia's Elixir, Collector's Elixir\r\n"
                "- Bright Moonlight Potion\r\n"
                "- Blessing of the Guild, Greater Blessing of the Guild,\r\n"
                "  Masarayu's Gift Atmospheric Effect\r\n"
                "- Happy Birthday, Party Bear, Snowing Fishbread\r\n"
                "- (Advanced) Strength, Dexterity, Intelligence, Luck Potion\r\n"
                "  or Pill X\r\n"
                "- (Advanced) Attack, Magic Potion or Pill V\r\n"
                "- Warrior Potion, Warrior Pill, Baby Dragon Food,\r\n"
                "  Drake's Blood\r\n"
                "- Magic Potion, Magic Pill, Wizard Potion,\r\n"
                "  Ancient Tree Sap\r\n"
                "- Wealth Acquisition Potion, Small Wealth Acquisition Potion\r\n"
                "- EXP Accumulation Potion, Small EXP Accumulation Potion,\r\n"
                "  Small Condensed EXP Accumulation Potion\r\n"
                "- 1.5-4x EXP Coupon\r\n"
                "- 50% Bonus EXP Coupon, MVP 50%, 70% Bonus EXP Coupon\r\n"
                "- MVP 70% Bonus EXP Atmospheric Effect, Alicia's Blessing,\r\n"
                "  Mu Gong-Certified Wellness Tonic\r\n"
                "- Extreme Red, Green, Blue, Gold Potions\r\n"
                "- Azmoth Potion\r\n\r\n"
                "#r* Các vật phẩm có thể đăng ký vào Sequence Kỹ Năng Buff sẽ được hiển thị ở phía dưới hướng dẫn vật phẩm#k"
            )

            sm.flipDialogue()
            sm.sendNext(
                "#eSequence Kỹ Năng Buff Notes#n\r\n\r\n"
                "- Nếu kỹ năng Noblesse đang #bhồi chiêu#k, bạn sẽ không thể dùng lại bằng Sequence Kỹ Năng Buff.\r\n"
                "- Các vật phẩm có hiệu ứng tăng EXP như Legion's Expertise hoặc MVP EXP Coupons "
                "sẽ được #btính dưới hiệu ứng EXP Coupon#k và có #bcùng thời lượng#k khi được thêm vào.\r\n"
                "- Nếu hiệu ứng potion đã được áp dụng, Sequence Kỹ Năng Buff #rkhông thể ghi đè#k chúng. "
                "Hiệu ứng phải được gỡ trước để dùng potion thông qua sequence.\r\n"
                "- Khi có nhiều vật phẩm cùng loại trong túi đồ cho một sequence, "
                "vật phẩm #bở đầu túi đồ#k sẽ được ưu tiên sử dụng trước."
            )

        # 2) How to add (Register)
        elif sel == 2:
            sm.flipDialogue()
            sm.sendNext(
                "#e<Cách thêm vào Sequence>#n\r\n\r\n"
                "Mở cửa sổ Skill, sau đó nhấn nút #bSequence#k để mở cửa sổ Sequence Kỹ Năng.\r\n\r\n"
                "Nhấn nút #bLayout Setting#k để điều chỉnh cách hiển thị các sequence.\r\n"
                "Các kỹ năng và vật phẩm có thể thêm vào sequence sẽ hiển thị ở phía dưới."
            )

            sm.flipDialogue()
            sm.sendSay(
                "#e<Cách thêm vào Sequence>#n\r\n\r\n"
                "Để thêm một kỹ năng hoặc vật phẩm vào sequence, hãy #bchọn sequence bạn muốn chỉnh sửa#k, "
                "sau đó #bnhấp một kỹ năng/vật phẩm#k ở phía dưới hoặc #bnhấp một kỹ năng trong cửa sổ Skill#k.\r\n\r\n"
                "Sau khi thêm vào sequence, nhấn nút #bSave#k.\r\n"
                "Bạn có thể gán biểu tượng Sequence làm #bphím tắt#k."
            )

            sm.flipDialogue()
            sm.sendNext(
                "#e<Cách thêm vào Sequence>#n\r\n\r\n"
                "Các kỹ năng hoặc buff là một phần của sequence có thể được thêm vào #bCombo Keys#k, "
                "nhưng #rkhông thể thêm bản thân sequence#k.\r\n\r\n"
                "Để xem danh sách kỹ năng hoặc buff trong một sequence, hãy giữ đồng thời #bphím Sequence#k "
                "(phím được gán là Sequence trong #bKey Bindings#k) và #bphím Sequence Kỹ Năng#k "
                "(biểu tượng xuất hiện trong cửa sổ Sequence Kỹ Năng) #bcùng lúc#k."
            )

        # 3) How to remove
        elif sel == 3:
            sm.flipDialogue()
            sm.sendNext(
                "#e<How to Remove>#n\r\n\r\n"
                "Để xóa một phần khỏi sequence, hãy #bchọn sequence bạn muốn chỉnh sửa#k, "
                "sau đó #bnhấp chuột phải#k vào biểu tượng bạn muốn xóa.\r\n\r\n"
                "Ngoài ra, bạn có thể nhấn nút #bEmpty#k để #bngay lập tức xóa toàn bộ#k "
                "kỹ năng hoặc vật phẩm đã thêm vào mỗi sequence.\r\n"
                "Bạn cũng có thể bắt đầu chỉnh sửa một sequence rồi nhấn nút #bEmpty#k "
                "để chỉ xóa toàn bộ nội dung của #dsequence đó#k.\r\n\r\n"
                "Và hãy nhớ—kể cả khi bạn lỡ nhấn nút Empty, bạn vẫn có thể khôi phục sequence "
                "bằng cách đóng lại mà #rkhông nhấn Save#k!"
            )

        # 4) Sequence Name Settings
        elif sel == 4:
            sm.flipDialogue()
            sm.sendNext(
                "#eSequence Name Settings#n\r\n\r\n"
                "Nhấn nút #bSequence Name Settings#k ở phía trên cửa sổ Sequence để nhập "
                "#btên sequence tùy chỉnh#k.\r\n\r\n"
                "Tên tùy chỉnh có thể dài tối đa #b8 ký tự#k.\r\n\r\n"
                "Tuy nhiên, tên tùy chỉnh #rkhông được chứa ngôn từ phản cảm hoặc ký tự đặc biệt#k."
            )

        # 5) Thông báo Sequence
        elif sel == 5:
            sm.flipDialogue()
            sm.sendNext(
                "#eThông báo Sequence#n\r\n\r\n"
                "Bạn có thể bật #bThông báo Sequence#k ở góc dưới bên trái của cửa sổ Sequence "
                "để hiển thị những kỹ năng hoặc vật phẩm nào đang được sử dụng khi kích hoạt một sequence.\r\n\r\n"
                "Thông báo Sequence sẽ không hiển thị #bcác kỹ năng không thể dùng do thiếu gauge#k "
                "(ví dụ: không đủ MP, DF hoặc HP) hoặc #bcác kỹ năng đang hồi chiêu#k.\r\n\r\n"
                "Thông báo Sequence sẽ hiển thị khi vật phẩm hoặc kỹ năng không được dùng, "
                "giúp bạn #bsử dụng sequence#k ngay khi đáp ứng đủ các điều kiện cần thiết."
            )

        else:
            break


start()
