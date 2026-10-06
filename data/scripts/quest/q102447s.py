# [Tera Blink] The Might of the Elite Boss!
import random

SPIEGELMANN = 9063175

sm.removeBlowWeather()
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Lần này, tôi sẽ cho bạn đối đầu với những đối thủ mạnh hơn một chút.")
sm.sendNext("#face0# Tôi khuyên bạn nên truy cập #fEffect/BasicEff.img/MainNotice/Event/Default/0# #bEvent List#k và nhận phần thưởng hỗ trợ tăng trưởng Hyper Burning MAX. Sử dụng #b#i2637177:# #t2637177:##k đi kèm để nhận được một số trang bị khởi đầu tốt!")
sm.sendNext("#face0# Trong khi săn lùng những kẻ thù gần cấp độ của bạn, ngoài Quái vật Tinh Anh, còn có những kẻ thù đặc biệt khác có thể xuất hiện.")
sm.sendNext("#face0# Bạn cũng có thể gặp #rElite Champions#k và #rElite Bosses#k.")
sm.sendNext("#face0# Lần này bạn sẽ đối mặt với một #rElite Boss#k.")
sm.sendNext("#face0# Đánh bại một #rElite Boss#k sẽ giúp bạn nhận được #b#i2433834:# #t2433834:##k, mở ra cánh cửa dẫn đến một số vật phẩm tuyệt vời.")
if sm.sendAskYesNo("#face0# Vậy, bạn đã sẵn sàng đối đầu với một #TrùmTinhNhất# chưa? Nó sẽ xuất hiện khi bạn đánh bại những con quái vật mà tôi triệu hồi cho bạn!\r\n#r* Sau khi chấp nhận, nhiều quái vật sẽ xuất hiện."):
    sm.createQuestWithQRValue(parentID, "step=1;crEqp=1")
    sm.openUI(1562)
    sm.openUIWithFocus(1562, 30, 150)
    for i in range(20):
        x = random.randint(-500, 500)
        sm.spawnMob(9834328, x, 2, False, 135000, 173392)
    for i in range(20):
        x = random.randint(-500, 500)
        sm.spawnMob(9834329, x, 2, False, 135000, 173392)