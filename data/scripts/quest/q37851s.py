JEAN = 3003406

quests = [37851, 37852, 37853, 37854, 37855, 37856, 37857, 37858, 37859, 37860, 37861, 37862, 37863, 37864, 37865, 37866, 37867, 37868, 37869, 37870, 37871]

sm.setSpeakerID(JEAN)
if sm.sendAskYesNo("Bạn có thể bỏ qua tất cả các nhiệm vụ tiên quyết của #b#eEsfera#n#k mà không cần chơi qua các nhiệm vụ cốt truyện khu vực.\r\n#b#eBạn có muốn bỏ qua tất cả các nhiệm vụ bắt buộc không?#n#k\r\nNếu bạn chọn #b#eCó#n#k, #e#rtất cả các nhiệm vụ sẽ được đánh dấu là hoàn thành#k#n. Nếu chọn #r#eKhông#n#k, bạn sẽ phải làm các nhiệm vụ như bình thường."):
    if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) and sm.getEmptyInventorySlots(3) >= 1:
        for i in quests:
            sm.startQuest(i)
            sm.completeQuest(i)
        sm.giveSymbol(1712006, 1, 37871)
        sm.giveItem(2438411, 1)
        sm.giveItem(3018045, 1)
        sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
        sm.createQuestWithQRValue(37900, "01=h1")
        sm.warp(450007040)
    else:
        sm.sendNext("Không đủ ô chứa trong túi EQUIP hoặc USE hoặc INSTALL để nhận phần thưởng chuỗi nhiệm vụ Esfera!")
else:
    sm.setBoxChat()
    sm.sendNext("#face0# #h0#! Chúng ta có vấn đề! Bạn đang ở đâu? Bạn cần phải đến Morass Coral Colony ngay bây giờ.")
    sm.setPlayerBoxChat()
    sm.sendNext("Có vấn đề gì hả?")
    sm.setSpeakerID(JEAN)
    sm.setBoxChat()
    sm.sendNext("#face0# Có một số kẻ mờ ám đang lảng vảng quanh Coral Colony.")
    sm.sendNext("#face0# Tôi nghĩ họ đang tìm kiếm dấu hiệu cho thấy Erda đã bị xáo trộn. Bị làm phiền bởi những người ngoài cuộc như bạn.")
    sm.sendNext("#face0# Có lẽ chúng không nguy hiểm, nhưng bạn nên nói chuyện với chúng trước khi chúng gây ra rắc rối. Tôi không thể rời Trueffet lúc này vì thể trạng của tôi không ổn định.")
    if sm.sendAskYesNo("#face0# Với tốc độ này, họ sẽ sớm đến Trueffet thôi. Xin hãy nhanh lên.\r\n#b(Nếu bạn chấp nhận, bạn sẽ được chuyển đến Abandoned Area ngay.))#k"):
        sm.setPlayerBoxChat()
        sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
        sm.startQuest(parentID)
        sm.completeQuest(parentID)
        sm.createQuestWithQRValue(34560, "40=h1;77=h1;78=h1")
        sm.warp(450006330)
    else:
        sm.setSpeakerID(OLLIE)
        sm.setBoxChat()
        sm.sendNext("#face0# Hãy trò chuyện cùng tôi khi nào bạn sẵn sàng nhé.")