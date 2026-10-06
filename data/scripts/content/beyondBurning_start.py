sm.setSpeakerID(9010000)

def guide():
    sm.flipDialogue()
    sel = sm.sendNext("Bạn có câu hỏi nào về #b#eBeyond Burning#n#k không?\r\n\r\n"
                    "#L1##bHãy cho tôi biết về #eBeyond Burning#n.#k#l\r\n"
                    "#L2##bHãy cho tôi biết về #ephần thưởng Beyond Burning#n.#k#l\r\n"
                    "#L100#Tôi không có câu hỏi nào.#l")
    if sel == 1:
        sm.sendNext("#rNhân vật mỗi tài khoản#k trong khoảng #b#eCấp 260–268#n#k tự động trở thành #b#eBeyond Burning#n#k.\r\n\r\n"
                    "#b#eNhân vật Beyond Burning#n#k sẽ nhận thêm #b1 cấp#k cho mỗi lần lên cấp, #bcho đến Cấp 270#k.\r\n\r\n"
                    "Bạn sẽ nhận được #bnhiều phần thưởng khác nhau#k dựa trên cấp độ bạn đạt được vượt qua #rmốc cấp độ mục tiêu#k mà bạn đã đặt.")
        sm.sendNext("Mỗi khi bạn lên cấp với #b#enhân vật Beyond Burning#n#k,\r\n"
                        "bạn sẽ nhận được các phần thưởng sau đây.\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 261\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 262\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 263\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 264\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 265\r\n"
                        "#b#i2639960:# #t2639960:# #k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 266\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 267\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 268\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 269\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n"
                        "#b#i2639895:# #t2639895:##k\r\n\r\n"
                        "#ePhần thưởng đạt Cấp 270\r\n"
                        "#b#i2639961:# #t2639961:# #k\r\n"
                        "#b#i2639894:# #t2639894:##k\r\n\r\n"
                        "#r#e* Tất cả phần thưởng đều không thể giao dịch.#n#k\r\n")
        guide()
    elif sel == 2:
        sm.sendNext("Mỗi lần nhân vật #b#eBeyond Burning#n#k tăng cấp,\n"
                        "bạn sẽ nhận được các phần thưởng sau.\r\n"
                        "#ePhần thưởng Thành tích Cấp 261\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 262\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 263\r\n"
                        "#b#i2637338:# #t2637338:# x1#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 264\r\n"
                        "#b#i4009548:# #t4009548:# x20#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 265\r\n"
                        "#b#i2639960:# #t2639960:# #k\r\n"
                        "#ePhần thưởng Thành tích Cấp 266\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 267\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 268\r\n"
                        "#b#i2637338:# #t2637338:# x2#k\r\n"
                        "#ePhần thưởng Thành tích Cấp 269\r\n"
                        "#b#i4009548:# #t4009548:# x30#k\r\n"
                        "#b#i2639895:# #t2639895:##k\r\n"
                        "#ePhần thưởng Thành tích Cấp 270\r\n"
                        "#b#i2639961:# #t2639961:# #k\r\n"
                        "#b#i2639894:# #t2639894:##k\r\n"
                        "#r#e* Tất cả phần thưởng đều không thể giao dịch.#n#k")
        guide()

rewardIndex = parentID - 4000
if rewardIndex > 0 or parentID == 1001:
    rewardID = 0
    qty = 0

    if rewardIndex == 1 or rewardIndex == 3:
        rewardID = 2637338  # Sol Erda
        qty = 1
    elif rewardIndex == 2 or rewardIndex == 4:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 20
    elif rewardIndex == 5:
        rewardID = 2639960  # Sacred Symbol: Arcus Cấp 5 Coupon
        qty = 1
    elif rewardIndex == 6 or rewardIndex == 8:
        rewardID = 2637338  # Sol Erda
        qty = 2
    elif rewardIndex == 7:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 30
    elif rewardIndex == 9:
        rewardID = 4009548  # Sol Erda Fragment
        qty = 30
    elif rewardIndex == 10:
        rewardID = 2639895  # Burning Flame Wings Coupon
        qty = 1
    elif rewardIndex == 11:
        rewardID = 2639961  # Sacred Symbol: Odium Cấp 5 Coupon
        qty = 1
    elif rewardIndex == 12:
        rewardID = 2639894  # Beyond Burning Title Coupon
        qty = 1
    elif parentID == 1001:
        guide()

    if rewardIndex >= 1 and rewardIndex <= 12:
        level = 260 + rewardIndex
        msg = ("Chúc mừng bạn đã đạt Cấp #b#e" + str(level) + "#n#k!\r\n"
            "#kBạn có muốn nhận các phần thưởng dưới đây ngay bây giờ không?\r\n\r\n"
            "#b#e#i" + str(rewardID) + ":# #t" + str(rewardID) + ":# x" + str(qty) + "\r\n\r\n"
            "#r#n* Các phần thưởng này không thể giao dịch.\r\n"
            "* Các phần thưởng này có thể sử dụng đến 23:59 (UTC+7) Thứ Năm, ngày 31/12/2026.\r\n")
        if sm.sendAskAccept(msg):
            if sm.canHold(rewardID, qty):
                chr.addItemToInventory(rewardID,qty,"day",90)
                sm.setQRValueByKey(655, "r" + str(rewardIndex), "1")
        else:
            sm.dispose()