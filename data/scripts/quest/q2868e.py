# A Ghost's Perspective (2868)

jane = 1052105
naora = 103000004
shade = 5090000

sm.setPlayerAsSpeaker()
sm.sendNext("Bạn có tìm thấy gì không?")

sm.setSpeakerID(jane)
sm.sendNext("Tôi không tìm thấy bóng ma của chủ chiếc mũ..."
"nhưng nó đã bị rơi ra bởi một trong những #o" + str(shade) + "#s ở đây.")

sm.setPlayerAsSpeaker()
sm.sendNext("(Rốt cuộc chuyện gì đã xảy ra với chủ chiếc mũ ở dưới này? "
"Có lẽ chúng ta nên quay lại bệnh viện lúc này...)")
sm.completeQuest(parentID)
sm.warp(naora)