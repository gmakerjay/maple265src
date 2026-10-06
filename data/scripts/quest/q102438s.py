# [Tera Blink] (Lv. 100) Once More into the Hunt!
SPIEGELMANN = 9063175

sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Bạn sẽ bắt đầu cuộc săn với những kỹ năng đã học được qua lần thăng tiến công việc thứ 3 của mình!")
sm.sendNext("#face0# Link Skill rất thú vị, nhưng tôi hy vọng bạn chưa quên hết những kỹ năng mới của mình!\r\nNâng cấp bản thân #blên đến cấp độ 100#k!")
sm.removeBlowWeather()
sm.openUI(1562)
sm.openUIWithFocus(1562, 30, 150)
sm.levelUntil(100)
sm.createQuestWithQRValue(parentID, "success=1;step=done")
sm.completeQuest(parentID)