OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Tôi chưa thấy bất kỳ pháo sáng nào từ Shubert hay Melange. Tôi đoán chúng ta nên thực hiện bước đi đầu tiên")
sm.sendNext("#face0# #h0#, trong khi bạn đang tìm kiếm pháo sáng, tôi đã trinh sát ra một điểm để phóng nó. Tôi đã làm phần việc của mình rồi!")
if sm.sendAskYesNo("#face0# Nếu bạn xong việc ở đây rồi, chúng ta đi thôi?\r\n\r\n#b#e(Nếu bạn chấp nhận, bạn sẽ tiến hành bắn pháo hiệu.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;40=h0;41=h0;42=h0;77=h0;78=h0")
    sm.warp(450007040)
else:
    sm.sendNext("#face0# Pháo sáng đã sẵn sàng, tôi nghĩ chúng nên khẩn trương lên.")