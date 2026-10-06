LIGHT_EXECUTOR = 3003504
OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Hm? Tại sao bạn lại dừng lại?")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("#face0# Chúng ta không thể tiếp tục.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Sau tất cả, bạn không thể tiếp tục sao?")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("#face0# Cô ấy đã đặt một rào chắn. Nhưng vẫn còn một cách khác.")
sm.completeQuest(parentID)