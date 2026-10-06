OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Có một #bBầy nhện#k, đúng như Melange đã nói. Một món quà từ Will")
sm.sendNext("#face0# Sẽ là một ý tưởng hay nếu xử lý chúng ngay bây giờ, trước khi chúng thực sự bắt đầu sinh sôi.")
if sm.sendAskYesNo("#face0# Đi đến #bMirror-touched Sea 2#k và săn 200 #bAranya#k"):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h1;32=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h1;77=h0;78=h0;79=h0;80=h0")
    sm.startNavigation(parentID, 450007110)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Bạn chưa sẵn sàng hả?")
