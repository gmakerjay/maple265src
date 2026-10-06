# id 1500017 (Tosh the Fairy), field 101073010
sm.setSpeakerType(3)
if not sm.hasMobsInField():
    sm.setParam(5)
    sm.setSpeakerID(1500017) # Tiên nữ Tosh
    sm.sendNext("T-Tôi sợ quá...")
    sm.sendSay("Tôi và các bạn đang diễn tập một vở kịch thì lũ Mandrakies đột nhiên hóa điên và tấn công chúng tôi. Tôi nhắm mắt lại khi một con cắn vào chân tôi và sau đó tôi tỉnh dậy ở đây!")
    sm.setParam(17)
    sm.sendSay("#b(Một học sinh còn hơn không. Tốt hơn hết mình nên đưa đứa bé này về Ellinel.)#k")
    sm.warp(101073000)
    sm.completeQuest(32123)
else:
    sm.sendNext("Làm ơn tiêu diệt hết lũ quái vật đi, tôi không thể ra ngoài như thế này được!")