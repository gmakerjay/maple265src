# [Tera Blink] Worlds Beyond
SPIEGELMANN = 9063175

sm.removeBlowWeather()
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# #b#i2433834:# #t2433834:# từ một #bElite Boss#k chỉ có thể được sử dụng trong vòng #b24 giờ#k sau khi nhận được, vì vậy hãy nắm bắt cơ hội!")
sm.sendNext("#face0# Tất cả những gì chúng ta đặt ra mục tiêu đều đã được hoàn thành!")
sm.sendNext("#face0# Nhiệm vụ cuối cùng của bạn là phá vỡ cánh cửa ngăn cách bạn với thế giới rộng lớn hơn!")
sm.sendNext("#face0# Tôi rất mong chờ được chứng kiến sự trưởng thành của bạn trong tương lai.")
sm.setPlayerBoxChat()
sm.sendNext("Vậy thì... Bạn đã sẵn sàng rời khỏi nơi này và bắt đầu cuộc hành trình thực sự của mình chưa?")
sm.createQuestWithQRValue(parentID, "final=0;step=1")
sm.spawnMob(9834332, 400, 2, False)
sm.removeBlowWeather()
sm.blowWeather(5120243, "Hãy tấn công cánh cửa do Spiegelmann triệu hồi để mở khóa, rồi bước ra thế giới bên ngoài!", 4)
sm.openUI(1562)
sm.createQuestWithQRValue(parentID, "final=0;step=1;95=1")
sm.addPopUpSay(9063173, 3000, "Cửa đã khóa chặt chưa?\r\nHãy thử nói chuyện với tôi!\r\nTôi nghĩ tôi có thể giúp bạn.", "")