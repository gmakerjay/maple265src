# id 32120 ([Ellinel Fairy Academy] Dr. Betty's Measures), field 101072000
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.setParam(4)
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendNext("Chào mừng trở lại. Các cô gái ở Ellinia đã giúp được gì cho bạn không?")
sm.setParam(2)
sm.sendSay("(Bạn đưa cho họ xem thiết bị của Tiến sĩ Betty.)")
sm.setParam(4)
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendSay("Cô đang đề nghị chúng tôi làm ô uế khu rừng bằng thứ vật phẩm bẩn thỉu, hôi hám này từ nền văn minh con người bại hoại sao? Không đời nào!")
sm.setSpeakerID(1500009) # Tiên nữ Rowen
sm.sendSay("Hiện tại không còn lựa chọn nào khác, Chủ nhiệm Khoa Kalayan.")
sm.setSpeakerID(1500008) # Tiên nữ Arwen
sm.sendSay("Rowen nói đúng. Chúng ta phải tìm thấy lũ trẻ!")
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendSay("Tôi không thể nói rằng tôi thích ý tưởng này, nhưng chúng ta không còn lựa chọn nào khác.")
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendSay("Được rồi. Nhưng nếu nó làm ô nhiễm khu rừng của chúng ta thì TỘI LỖI này là do CÁNH của CÔ...")
sm.setSpeakerID(1500000) # Cootie the Really Small (Cootie Bé Tí)
sm.sendSay("Mọi người, làm ơn giữ im lặng một phút. Tôi sẽ bật nó lên.")
sm.lockInGameUI(True, True)
sm.sendDelay(500)
sm.changeBGM("Bgm34.img/TheFairyForest", 0, 0)
sm.setParam(5)
sm.sendNext("......")
sm.sendSay("Tuyệt vời, tôi có thể nghe thấy cả khu rừng!")
sm.sendDelay(2000)
sm.sendDelay(2000)
sm.sendNext("???")
sm.sendDelay(2000)
sm.sendDelay(2000)
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendNext("Cái thứ này bị làm sao vậy? Tại sao nó chỉ ghi lại những âm thanh vô dụng?")
sm.setSpeakerID(1500009) # Tiên nữ Rowen
sm.sendSay("Suỵt... Im lặng.")
sm.sendDelay(3000)
sm.sendDelay(1000)
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendNext("Giọng nói đó!")
sm.setSpeakerID(1500000) # Cootie the Really Small
sm.sendSay("Nó đang phát ra từ phía sau!")
sm.setSpeakerID(1500002) # Chủ nhiệm Khoa Kalayan
sm.sendSay("Hãy kiên nhẫn, các con! Cô sẽ cứu các con ngay bây giờ!")
sm.setSpeakerID(1500009) # Tiên nữ Rowen
sm.sendSay("Arwen, chúng ta nên giúp một tay.")
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
sm.sendSay("Mọi người, làm ơn đợi đã!")
sm.changeBGM("Bgm34.img/TheFairyAcademy", 0, 0)
sm.lockInGameUI(False, True)
sm.completeQuest(parentID)