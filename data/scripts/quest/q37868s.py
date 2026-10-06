MELANGE = 3003501

sm.setPlayerBoxChat()
sm.sendNext("Đây là nơi nào vậy? Tôi cứ tưởng mọi thứ đều trắng xóa vì... bạn biết đấy, mặt trời kìa.")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Đây là Đền Ánh Sáng. Giờ đây nó là hiện thân của Thế Giới Gương.")
sm.setPlayerBoxChat()
sm.sendNext("Chuyện gì đang xảy ra bây giờ?")
sm.sendNext("Will chắc chắn đang cố gắng trao sức mạnh của Tana cho Black Mage.")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Đó chính là điều chúng ta cần tìm hiểu ngay bây giờ. Chúng ta cần xem xét những ký ức được hình thành trong không gian này.")
sm.setPlayerBoxChat()
sm.sendNext("Nhưng nếu chúng ta không nhanh lên, Ollie...")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Nếu vội vàng, bạn sẽ chỉ chuốc lấy rắc rối lớn hơn thôi. Chẳng phải chuyện vừa xảy ra là như vậy sao?")
if sm.sendAskYesNo("#face0# Bắt đầu đi, nó nằm ở phía trước."):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h0;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h1;77=h0;78=h0;79=h0;80=h0")
    sm.startNavigation(parentID, 450007210)
else:
    sm.sendNext("#face0# Hãy trò chuyện với tôi khi nào bạn sẵn sàng.")