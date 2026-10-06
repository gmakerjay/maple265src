NINEHEART = 3003651

quests = [35601, 35602, 35603, 35604, 35605, 35606, 35607, 35608, 35609, 35610, 35611, 35612, 35613, 35614, 35615, 35616, 35617, 35618, 35619, 35620, 35621, 35622, 35623, 35624, 35625, 35626, 35627, 35628, 35629, 35630, 35631, 35632]

sm.setSpeakerID(NINEHEART)
if sm.sendAskYesNo("Bạn có thể bỏ qua tất cả các nhiệm vụ tiên quyết của #b#eMoonbridge#n#k mà không cần chơi qua các nhiệm vụ cốt truyện khu vực.\r\n#b#eBạn có muốn bỏ qua tất cả các nhiệm vụ bắt buộc không?#n#k\r\nNếu bạn chọn #b#eCó#n#k, #e#rtất cả các nhiệm vụ sẽ được đánh dấu là hoàn thành#k#n. Nếu chọn #r#eKhông#n#k, bạn sẽ phải làm các nhiệm vụ như bình thường."):
    if sm.getEmptyInventorySlots(1) >= 1:
        for i in quests:
            sm.startQuest(i)
            sm.completeQuest(i)
        sm.giveItem(1143150, 1)
        #sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
        #sm.createQuestWithQRValue(37900, "01=h1")
        #sm.warp(450007040)
    else:
        sm.sendNext("Không đủ ô chứa trong túi EQUIP hoặc USE hoặc INSTALL để nhận phần thưởng chuỗi nhiệm vụ Esfera!")
else:
    sm.setBoxChat()
    sm.sendNext("#face0# À, anh đến rồi. Tốt lắm. Tôi có chuyện muốn nói với anh. Chuyện này liên quan đến tương lai của Thế Giới Maple.")
    sm.sendNext("#face0# Sau khi Trăng Đen và Mặt Trời Trắng hợp nhất, một vùng bão lớn xuất hiện.\r\nNgay sau đó, chúng tôi nhận được báo cáo rằng cơn bão đang mở rộng và dần dần nuốt chửng mọi thứ xung quanh.")
    sm.sendNext("#face0# Và... cuối cùng nó đã đến gần trại căn cứ.")
    sm.sendNext("#face0# Liên minh đã quyết định đã đến lúc quay trở lại tổng hành dinh. Trận chiến cuối cùng đã đến, và chúng ta phải chiến đấu hết mình.")
    if sm.sendAskAccept("#face0# Các thành viên Liên minh được phái đến Dòng Sông Arcane đã hoàn tất cuộc điều tra và sẵn sàng trở về Thế giới Maple. #h0#, Bạn có muốn đi cùng ta không?\r\n#b#e(Chấp nhận đi vào không phận Esfera.)#n#k"):
        sm.setSpeakerID(NINEHEART)
        sm.setBoxChat()
        sm.sendNext("#face0# Tốt lắm, chúng ta sẽ đi đến #bTiền Đồn#k!")
        sm.setPlayerBoxChat()
        sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
        sm.startQuest(parentID)
        sm.completeQuest(parentID)
        sm.warp(993060011)
    else:
        sm.setSpeakerID(NINEHEART)
        sm.setBoxChat()
        sm.sendNext("#face0# Được thôi, khi nào bạn sẵn sàng hãy quay về đây.")