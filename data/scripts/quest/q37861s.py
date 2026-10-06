OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Trông giống như... một con nhện. Tôi nghĩ chúng ta nên kiểm tra xem sao.")
sm.sendNext("#face0# Hình như nó đang tấn công ai đó.")
sm.setPlayerBoxChat()
sm.sendNext("Tôi không thấy gì cả...")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Không phải tự nhiên mà tôi được chọn làm trinh sát của Hiệp sĩ Thiên Nga. Bạn có thể tin vào mắt tôi.")
if sm.sendAskYesNo("#face0# Bắt đầu đi nhé?\r\n\r\n#b#e(Nếu bạn đồng ý, bạn sẽ được dịch chuyển đến Mirror-touched Sea.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h1;77=h0;78=h0;79=h0;80=h0")
    sm.warp(450007130)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Bạn có điều gì tốt hơn để làm ở đây à?")
