OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Tana là ứng cử viên để trở thành Siêu việt sao...? Tôi đoán đó là lý do tại sao cô ấy có nhiều sức mạnh như vậy.")
sm.sendNext("#face0# Nhưng chuyện đó dường như đã xảy ra từ lâu rồi. Giờ cô ấy thế nào rồi...?")
sm.setPlayerBoxChat()
sm.sendNext("Hmm...")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# ...Tôi còn rất nhiều câu hỏi nữa! Nhưng nếu chúng ta theo dõi, có lẽ chúng ta sẽ tìm được câu trả lời.")
if sm.sendAskYesNo("#face0# Tôi nghĩ chúng ta nên đi theo họ."):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h1;52=h1;77=h0;78=h0;79=h0;80=h0")
    sm.startNavigation(parentID, 450007140)
