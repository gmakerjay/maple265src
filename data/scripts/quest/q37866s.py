OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Họ đã đối đầu với nhau lần nữa...")
sm.sendNext("#face0# Nhưng cảm ơn Executor, chúng ta đã đến tận đây. Chúng ta đã đến gần hơn bây giờ.")
sm.sendNext("#face0# Ồ, #h0#, trong lúc anh đang chiến đấu, tôi nhận được tin nhắn từ Shubert. Anh ta đang sử dụng phương pháp truyền vật chất tầm ngắn.")
if sm.sendAskYesNo("#face0# Khi đã có Tana, chúng ta có thể đưa cô ấy đến nơi an toàn ngay lập tức. Đi thôi!"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(37866, "clear=c1")
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h1;77=h0;78=h0;79=h0;80=h0")
else:
    sm.sendNext("#face0# Oh...Có chuyện gì không ổn sao?")