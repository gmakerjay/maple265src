LIGHT_EXECUTOR = 3003504
OLLIE = 3003500

sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("#face0# Chúng ta sẽ phá vỡ rào chắn của cô ấy.")
sm.sendNext("#face0# Để làm điều đó, chúng ta cần sức mạnh to lớn hơn.")
sm.sendNext("#face0# Đánh bại những Keeper ở đây. Sức mạnh của chúng sẽ chuyển vào chúng ta.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Để phá vỡ rào chắn của Tana, chúng ta cần sức mạnh của Tana.")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("#face0# Đúng vậy. Nhiệm vụ này dành cho bạn. Với tư cách của Executor, tôi không thể làm tổn thương những Keeper.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskYesNo("#face0# Có vẻ như chúng ta cần sự giúp đỡ của cậu, Ren. Chỉ cần hạ gục khoảng 200 tên #bKeeper of Darkness#k gần đó là được."):
    sm.startQuest(parentID)
else:
    sm.sendNext("#face0# Oh...Có chuyện gì không ổn sao?")