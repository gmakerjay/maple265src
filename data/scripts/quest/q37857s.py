OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Melange đã phát hiện thêm một ít Erda bị méo mó.")
sm.sendNext("#face0# Nếu đó là một ký ức khác của Tana, nó có thể sẽ dẫn chúng ta đến chỗ cô ấy.")
if sm.sendAskYesNo("#face0# Tôi rất thích khi mọi mảnh ghép khớp lại với nhau! Để tôi dẫn đầu!"):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h1;77=h0;78=h0;79=h0;80=h1")
    sm.startNavigation(parentID, 450007070)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Hả? Tôi không nghĩ là còn gì để làm ở đây nữa.")
