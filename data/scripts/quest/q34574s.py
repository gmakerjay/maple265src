OLLIE = 3003652

sm.setPlayerBoxChat()
sm.sendNext("Chúng ta cần tính tiền nhân viên trước, phải không?")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Ừ. Tôi nghĩ 200 #bAraneas#k là đủ."):
    sm.startQuest(34574)
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face3#Và hãy cẩn thận. Lũ nhện đó có thể có độc, và... tôi đã quá chán ngán việc phải đối phó với chất độc rồi.")