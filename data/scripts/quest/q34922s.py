# Được tạo bởi MechAviv
# Mã nhiệm vụ :: 34922
# Chưa được mã hóa

sm.setSpeakerID(3001510)
sm.setSpeakerType(3)
sm.setPlayerBoxChat()
sm.setColor(1)
sm.sendNext("#face0#Nhiêu đây là đủ để sửa chữa những thứ chúng ta cần. Hôm nay anh đã làm việc rất chăm chỉ. Sao anh không nghỉ ngơi một chút?")

sm.setSpeakerID(3001510)
sm.setPlayerBoxChat()
sm.setColor(1)
if sm.sendAskAccept("#face0#Ồ, nhưng trước khi làm vậy, anh có thể cất đống phế liệu vào kho được không? Chúng tôi không thể lãng phí bất cứ thứ gì."):
    sm.setSpeakerID(3001510)
    sm.setSpeakerType(3)
    sm.setPlayerBoxChat()
    sm.setColor(1)
    sm.sendNext("#face0#Storage nằm ngay bên phải bạn. Nếu bạn có thời gian, hãy quay lại, tôi sẽ hướng dẫn bạn cách thư giãn theo kiểu caravan.")
    sm.startQuest(34922)
    # [START_NAVIGATION] [D8 0A F6 17 01 00 00 00 07 00 33 30 30 31 34 30 33 ]