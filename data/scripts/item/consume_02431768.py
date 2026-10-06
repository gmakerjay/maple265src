# id 2431768 (Schoolboys' Note), field 101072200
sm.createQuestWithQRValue(32158, "male=1")
sm.setSpeakerType(3)
sm.setParam(5)
sm.setSpeakerID(1500029) # Mẩu Ghi Chú Của Các Cậu Bé Học Sinh
sm.sendNext("#b#eTôi đã giấu bí mật của mình dưới giá sách. Đừng để bị bắt quả tang lén lút quanh đây nhé!#n#k")
sm.setParam(17)
sm.sendSay("Bí mật dưới giá sách ư? Tốt hơn hết mình nên đi hỏi #bCootie#k về những thứ này.")
sm.startQuest(32133)
sm.startQuest(32134)
sm.createQuestWithQRValue(32133, "1")
sm.updateQRValue(32133, False)
sm.consumeItem(2431768)