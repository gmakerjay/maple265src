MELANGE = 3003501

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
if sm.sendAskYesNo("#face0# Đủ rồi. Bây giờ, giữ chặt cây gậy của tôi.\r\n\r\n#b#e(Nếu bạn chấp nhận, bạn sẽ chuyển đến ký ức của Tana.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.completeQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h0;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h1;77=h0;78=h0;79=h0;80=h0")
    sm.warp(450007230)
else:
    sm.sendNext("#face0# Điều gì ngăn cản bạn vậy?")