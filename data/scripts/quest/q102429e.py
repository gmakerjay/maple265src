# [Tera Blink] Potions Are Essential!
SPIEGELMANN = 9063175

sm.closeUI(1561)
sm.closeUI(1562)
sm.closeUI(0)
sm.closeUI(1562)
sm.openUI(1561)
sm.closeUI(1562)
sm.completeQuest(parentID)
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Vậy thuốc tôi đưa cho bạn có tác dụng không?")
sm.sendNext("#face0# Mặc dù có nhiều phương pháp hồi phục khác nhau, nhưng thuốc vẫn chiếm phần lớn trong số đó.")
sm.sendNext("Mặc dù có những trường hợp đặc biệt, chẳng hạn như phong ấn thuốc và thời gian hồi chiêu của vật phẩm tiêu hao, nhưng trong hầu hết các trường hợp, thuốc sẽ hỗ trợ rất nhiều cho việc sống sót của bạn.")
sm.sendNext("#face0# Tất cả điều này có nghĩa là, đừng quên tầm quan trọng của các loại thuốc!")
sm.removeBlowWeather()
sm.blowWeather(5120243, "Bạn đã sử dụng thành công loại thuốc này! Hãy nói chuyện với Spiegelmann để tiếp tục nhiệm vụ!", 4)