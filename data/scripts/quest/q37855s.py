OLLIE = 3003500
MELANGE = 3003501
SHUBERT = 3003502

sm.setPlayerBoxChat()
sm.sendNext("Bạn nói tự mình xem sao?")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# *Ngáp*...Ý tôi là #bErda#k.")
sm.sendNext("#face0# Có Erda méo mó gần đây. Có lẽ chúng có thể giúp bạn hiểu hơn.")
sm.setPlayerBoxChat()
sm.sendNext("(Erda méo mó... Có phải là Tana không?)")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Đây, tôi đã viết ra những chỉ dẫn.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# (Melange đưa cho Ollie một mảnh giấy.)")
sm.sendNext("#face0# Ừm... Bên phải ấy. Tôi nghĩ #bLiving Spring 5#k ở hướng đó.")
sm.sendNext("#face0# Tôi sẽ dẫn đầu. Tôi không biết chuyện này là sao, nhưng nó còn hơn là đứng yên xung quanh đây.")
sm.setSpeakerID(SHUBERT)
sm.setBoxChat()
sm.sendNext("#face0# Đi đi nhóc. Tôi sẽ khôi phục lại hệ thống liên lạc. Và báo cho tôi biết nếu có gì cần nổ tung nhé!")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskYesNo("#face0# Bạn đã sẵn sàng chưa? Tôi sẽ đi trinh sát trước và đảm bảo chúng ta không gặp rắc rối!"):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h1;77=h0;78=h0;79=h1")
    sm.startNavigation(parentID, 450007210)
else:
    sm.sendNext("#face0# Hãy trò chuyện với Melange khi nào bạn sẵn sàng.")