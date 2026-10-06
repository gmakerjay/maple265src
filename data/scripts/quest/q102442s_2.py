# [Tera Blink] Star Power Up!
SPIEGELMANN = 9063175

sm.closeUI(1561)
sm.closeUI(1562)
sm.makeDescOnUI(993236800, 4, "", "")
sm.openUI(1561)
sm.removeBlowWeather()
sm.blowWeather(5120243, "Bạn đã đạt đến cấp độ 8 sao của Lực lượng Sao. Hãy nói chuyện với Spiegelmann để hoàn thành nhiệm vụ!", 4)
sm.closeUI(1562)
chr.createQuestWithQRValue(102442, "success=8;step=done;curStar=8")
sm.completeQuest(102442)
sm.levelUntil(130)