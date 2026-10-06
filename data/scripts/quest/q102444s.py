# [Tera Blink] Who's the Boss of the Monsters?
import random

SPIEGELMANN = 9063175

sm.removeBlowWeather()
sm.openUI(1561)
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Ồ, chúng không chỉ đơn thuần là những con quái vật khổng lồ... Chúng là những #bQUÁI VẬT TINH ANH#k!")
sm.sendNext("#face0# #bQUÁI VẬT TINH ANH#k! là những quái vật đôi khi xuất hiện khi săn lùng #bquái vật gần cấp độ của bạn#k")
sm.sendNext("#face0# QUÁI VẬT TINH ANH có lượng HP và Sức tấn công cao hơn nhiều so với quái vật thông thường, và cũng mang lại nhiều phần thưởng hơn!")
if sm.sendAskYesNo("#face0# Bạn có muốn đối đầu với một #bQuáiVậtTinhNhất#k ngay bây giờ không? Nó sẽ xuất hiện khi bạn đánh bại những con quái vật tôi triệu hồi cho bạn! #r* Sau khi chấp nhận, nhiều quái vật sẽ xuất hiện."):
    sm.createQuestWithQRValue(parentID, "step=1")
    sm.openUI(1562)
    sm.openUIWithFocus(1562, 30, 150)
    for i in range(50):
        x = random.randint(-500, 500)
        sm.spawnMob(9834328, x, 2, False, 135000, 173392)
    for i in range(50):
        x = random.randint(-500, 500)
        sm.spawnMob(9834329, x, 2, False, 135000, 173392)