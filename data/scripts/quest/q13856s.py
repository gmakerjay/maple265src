# Mastery Book Sale

ILLIAD = 2080009

sm.setSpeakerID(ILLIAD)
sm.sendNext("Này, ngươi đó! Người du hành dũng cảm! Lại đây ta có chuyện cần bàn.")
sm.setPlayerAsSpeaker()
sm.sendSay("Ngươi gọi ta à? Có chuyện gì mà phải lén lút thế, thưa ngài thương nhân kỳ quặc?")
sm.setSpeakerID(ILLIAD)
sm.sendSay("Kỳ quặc? Hừm, người ngoài như ngươi không hiểu được nghệ thuật kinh doanh tinh tế của ta đâu! Dù sao thì, ta nghe danh ngươi đã lâu, và ta có thứ ngươi #ecần#n.")
sm.setPlayerAsSpeaker()
sm.sendSay("Thứ ta cần? Ngươi muốn gì ở ta?")
sm.setSpeakerID(ILLIAD)
sm.sendSay("Bình tĩnh nào, không phải chuyện xấu đâu! Ta là một nhà sưu tầm hiếm có, và ta có những cuốn #eSách Tinh Thông (Mastery Book)#n tuyệt đỉnh. Ta biết những kỹ năng của ngươi đang cần một bước đột phá, phải không?")
sm.setPlayerAsSpeaker()
sm.sendSay("À, ngươi nói là Sách Tinh Thông? Đúng là ta đang tìm kiếm.")
sm.setSpeakerID(ILLIAD)
sm.sendSay("Chính xác! Ta đã vượt qua bao hiểm nguy, đối mặt với lũ Rồng ở đây để mang chúng về. Nếu ngươi sẵn sàng nâng cấp sức mạnh, hãy giao dịch với ta ngay.")
sm.sendSay("Nhớ kỹ, nếu cần sức mạnh thực sự, hãy quay lại tìm ta ở #m240000000# này! Công việc của ta vẫn còn rất nhiều!")
if sm.sendAskYesNo("Bạn có muốn ghé thăm #m240000000# để săn những cuốn #i# được giảm giá không? Rất là hời đó!!"):
    sm.warp(240000000, 0)
    sm.startQuest(parentID)
    sm.completeQuest(parentID)