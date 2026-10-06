# id 1500016 (Woonie the Fairy), field 101073300
sm.setSpeakerType(3)

if not sm.hasMobsInField():
    sm.setParam(5)
    sm.setSpeakerID(1500016) # Tiên nữ Woonie
    sm.sendNext("Anh/chị đã cứu mạng chúng tôi... và cả danh dự của chúng tôi nữa. Cảm ơn anh/chị rất nhiều.")
    sm.setSpeakerID(1500018) # Tiên nữ Tracy
    sm.sendSay("Tôi sẽ không bao giờ quên lòng tốt của anh/chị!")
    sm.warp(101073200)
    sm.completeQuest(32128)
else:
    sm.setSpeakerID(1500016) # Tiên nữ Woonie
    sm.sendNext("Làm ơn đánh bại Vua Chuột Chũi!")