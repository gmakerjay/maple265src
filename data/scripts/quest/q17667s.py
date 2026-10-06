# id 17667 ([Cộng hòa Thương mại] Kế hoạch từ Thiên đường), trường 865030111
sm.setSpeakerID(9390238) # Zion
sm.setParam(32)
sm.setColor(1)
sm.sendNext("Không thể chấp nhận được...")
sm.setParam(56)
sm.sendSay("Tại sao anh lại giả chết?")
sm.setParam(32)
sm.sendSay("Tôi không cần phải trả lời câu hỏi của anh. Anh không có quyền giữ tôi ở đây!")
sm.setParam(36)
sm.setSpeakerID(9390202) # Leon Daniella
res = sm.sendAskYesNo("(#h0#, anh nghĩ anh có thể bắt anh ta Nói chuyện?)")
sm.startQuest(parentID)
sm.setParam(56)
sm.sendNext("Này Leon. Con tin đâu cần tóc, phải không? Hay bộ ria mép nhỏ xíu đáng sợ của chúng?")
sm.setParam(36)
sm.sendSay("Không, tôi thực sự không hiểu tại sao họ lại cần. Này, họ cũng đâu cần quần áo!")
sm.setParam(56)
sm.sendSay("Ừ, nếu anh chàng này vừa hói vừa khỏa thân, anh ta sẽ xấu hổ đến mức không dám rời đi. Hình như tôi có một cái nhíp trong túi...")
sm.setParam(36)
sm.setSpeakerID(9390207) # Zion
sm.sendSay("Đó là ý tưởng của bọn sát thủ! Chính chúng đã ép tôi phải giả mạo cái chết.")
sm.setParam(56)
sm.sendSay("Thấy chưa? Dễ mà.")