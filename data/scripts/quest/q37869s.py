MELANGE = 3003501

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Trong khi bạn đang giải quyết tất cả những mớ hỗn độn đó, tôi đã phân tích sức mạnh của Thế Giới Gương tự hỏi liệu điều đó có lan rộng đến Esfera không.")
sm.sendNext("#face0# Trước đó, bạn đã xem những ký ức bị rò rỉ. Lần này, chúng ta sẽ đột nhập vào chúng từ phía bên này.")
sm.setPlayerBoxChat()
sm.sendNext("Điều đó có thể thực hiện được không?")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# *Ngáp* Đó chính xác là lý do tôi đến đây.")
sm.sendNext("#face0# Ký ức của Tana đã bị Thế Giới Gương nuốt chửng. Chúng ta đến đây để xâm nhập vào cô ấy. À thì... Có một vấn đề.")
sm.sendNext("#face0# Tôi không thể tập trung khi có quá nhiều Keeper nhảy nhót xung quanh.")
if sm.sendAskYesNo("#face0# Đánh bại 200 #bLight Executor#k thì tôi sẽ ổn."):
    sm.startQuest(parentID)
    sm.setSpeakerID(MELANGE)
    sm.setBoxChat()
    sm.sendNext("#face0# Hãy cẩn thận. Đối với họ, lúc này chúng ta chẳng khác gì những kẻ xâm nhập.")
else:
    sm.sendNext("#face0# Tôi thật sự không thể tập trung để tiếp tục.")