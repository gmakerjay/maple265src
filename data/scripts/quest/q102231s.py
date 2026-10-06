NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.hasQuestCompleted(102231):
    sm.sendNext("Bạn đã nhận thưởng rồi.")
else:
    sm.sendNext("Xin chào, #b#e#h0##n#k! Tăng trưởng không giới hạn!\r\n"
                    "#e#rHyper Burning MAX đang diễn ra, với\r\n"
                    " #b#eđặc quyền tăng 1+4 cấp#n#k cho đến #r#eLv. 260#n#k!")
    sm.sendNext("Trong thời gian diễn ra sự kiện #e#rHyper Burning MAX#n#k,\r\n"
                    "bạn có thể #b#etạo một nhân vật Hyper Burning MAX mới#n#k,\r\n"
                    "hoặc chọn một nhân vật hiện có #r#eLv. 200–258#n#k\r\n"
                    "làm #b#eHyper Burning MAX character#n#k.")
    sm.sendNext("Nhân vật Hyper Burning MAX có thể được tạo mới hoặc thiết lập\r\n"
                    "trong thời gian sự kiện, từ #rSau bảo trì ngày 31/01/2026 (Thứ Bảy) UTC#k đến #r\r\n"
                    "31/12/2026 (Thứ Năm) 23:59 AM UTC+7#k.")
    sm.sendNext("Nhân vật Hyper Burning MAX của bạn sẽ nhận được\r\n"
                    "#b#e4 cấp độ bổ sung#n#k cho mỗi lần tăng cấp, bắt đầu từ Lv. 10.\r\n"
                    "#r(Hiệu ứng sẽ kết thúc khi đạt Lv. 260.)")
    sm.sendNext("#b#eĐặc quyền đầu tiên!#n#k\r\n\r\n"
                    "#b#eNhân vật Hyper Burning MAX#n#k có thể nhận được\r\n"
                    "#r#ephần thưởng hỗ trợ lên cấp#n#k sau đây.\r\n\r\n"
                    "#b#e#i2439178:#   #t2439178:##n#k\r\n"
                    "#b#e#i2433444:#   #t2433444:##n#k\r\n"
                    "#b#e#i2637177:#   #t2637177:##n#k\r\n"
                    "#b#e#i2634979:# #t2634979:##n#k\r\n"
                    "#b#e#i2632789:# #t2632789:##n#k\r\n\r\n"
                    "#r#eTất cả phần thưởng đều không thể giao dịch. Chỉ các nhân vật Hyper Burning MAX\r\n"
                    "được tạo mới hoặc được chỉ định trong thời gian sự kiện\r\n"
                    "mới có thể nhận các phần thưởng này.#n#k\r\n\r\n"
                    "#r#eNhân vật Zero không thể nhận Hộp Vũ khí Băng Giá/Vũ khí Phụ,\r\n"
                    "cũng như Hộp Vũ khí Fafnir 15 Sao.#n#k")
    if sm.getEmptyInventorySlots(2)>= 5:
        chr.addItemToInventory(2439178,1,"month",3)
        chr.addItemToInventory(2433444,1,"month",3)
        chr.addItemToInventory(2637177,1,"month",3)
        chr.addItemToInventory(2634979,1,"month",3)
        chr.addItemToInventory(2632789,1,"month",3)
        sm.completeQuest(102231)
    else:
        sm.sendNext("Bạn không đủ ô chứa trong túi USE để nhận thưởng.")