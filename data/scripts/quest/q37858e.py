OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Tôi rất vui được báo cáo rằng khu vực đã an toàn. Nhưng tôi vẫn cứ nghĩ Will sẽ lao ra từ trong bóng tối...")
if sm.sendAskYesNo("#face0# Vậy còn chần chờ gì nữa?\r\n#b#e(Nếu chấp nhận, bạn sẽ được chuyển đến Somewhere in Living Spring.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.completeQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h1;77=h0;78=h0;79=h0;80=h0")
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Bạn vẫn chưa sẵn sàng sao?")
