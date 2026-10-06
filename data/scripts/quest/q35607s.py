ATHENA_PIERCE = 1540453

sm.setSpeakerID(ATHENA_PIERCE)
sm.setBoxChat()
sm.sendNext("#face0# Những người lính ngày càng bồn chồn khi thời điểm triển khai của chúng tôi đang đến gần... Ừm, tôi nghĩ đó cũng là điều tự nhiên. Tôi đã có nhiều năm kinh nghiệm hơn, vậy mà tôi vẫn còn chút nghi ngờ.")
if sm.sendAskAccept("#face0# Vẫn còn chút thời gian trước khi chúng ta triển khai. #h0#, bạn có thể dành chút thời gian nói chuyện với các chiến sĩ được không? Bạn chắc chắn là át chủ bài của Liên minh... Nói chuyện với bạn sẽ giúp họ bớt căng thẳng hơn."):
    sm.setSpeakerID(ATHENA_PIERCE)
    sm.setBoxChat()
    sm.sendNext("#face0# Cảm ơn bạn. Xin hãy nói chuyện với những người lính, tôi chắc chắn điều đó sẽ mang lại nhiều điều tốt đẹp.")
    sm.startQuest(parentID)
else:
    sm.setSpeakerID(ATHENA_PIERCE)
    sm.setBoxChat()
    sm.sendNext("#face0# Không sao, bất cứ khi nào bạn sẵn sàng.")