UNK = 3003505

sm.setSpeakerID(UNK)
sm.setBoxChat()
sm.sendNext("#face0# ...")
sm.setPlayerBoxChat()
sm.sendNext("Ồ... Bạn là người đã chiến đấu với Will trong ký ức của Tana...")
sm.setSpeakerID(UNK)
sm.setBoxChat()
sm.sendNext("#face0# ...Bạn vẫn có thể chiến đấu, phải không?")
sm.setPlayerBoxChat()
sm.sendNext("Bạn đã cứu tôi...?")
sm.setSpeakerID(UNK)
sm.setBoxChat()
if sm.sendAskYesNo("#face0# Trả lời câu hỏi.\r\n\r\n#b#e(Nếu bạn chấp nhận, bạn sẽ được chuyển đến Mirror-touched Sea.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)
    sm.createQuestWithQRValue(34560, "30=h0;31=h0;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h1;77=h0;78=h0;79=h0;80=h0")
    sm.warp(450007040)
else:
    sm.sendNext("#face0# ...")