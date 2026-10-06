OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Tôi sẽ để phần đó cho bạn! Trong lúc đó tôi sẽ đi trinh sát khu vực này.")
if sm.sendAskYesNo("#face0# Giống như trước, chúng ta có thể sẽ cần khoảng #b10 Năng lượng Erda#k."):
    sm.startQuest(parentID)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Hả? Tôi đã phạm sai lầm gì à...?")
