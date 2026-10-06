OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Làm tốt lắm!")
sm.sendNext("#face0# Trong lúc anh chiến đấu, tôi đã trinh sát khu vực đó nhưng không tìm thấy dấu hiệu nào của Will hay Tana.")
sm.sendNext("#face0# Tôi đoán bia mộ này là manh mối duy nhất của chúng ta.")
if sm.sendAskYesNo("#face0# Được rồi, chúng ta lên đường thôi!\r\n\r\n#b#e(Nếu bạn đồng ý, bạn sẽ được dịch chuyển đến Mirror-touched Sea.)#n#k"):
    sm.setPlayerBoxChat()
    sm.sendNext("#b#eĐã tự động bỏ qua phần cắt cảnh.#n#k")
    sm.completeQuest(parentID)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Lũ nhện vẫn còn quấy rầy bạn à? Tôi nghĩ bạn đã tiêu diệt đủ số nhện rồi.")
