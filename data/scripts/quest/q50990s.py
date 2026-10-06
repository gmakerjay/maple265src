# [Theme Dungeon] Ellinel Fairy Academy
npc = 9130008

sm.setSpeakerID(npc)
if sm.sendAskAccept("Bạn có vẻ đã sẵn sàng cho một cuộc phiêu lưu mới. Bạn có thể dành chút thời gian cho tôi không? Chúng tôi được yêu cầu tìm một người có trình độ phù hợp."):
    sm.sendNext("Yêu cầu đến từ #bHọc viện Tiên nữ Ellinel#k. Một người trẻ tuổi đã vào Học viện và gây ra khá nhiều xáo trộn.")
    sm.sendSay("Tôi không biết rõ chi tiết, nhưng họ đang cần giúp đỡ và tôi nghĩ tốt nhất là chúng ta nên xem xét tình hình.")
    if sm.sendAskYesNo("Fanzy sẽ đưa bạn đến vùng đất của các nàng tiên. Tôi có thể đưa bạn trực tiếp đến gặp anh ấy, nếu bạn muốn."):
        sm.sendNext("Tôi sẽ đưa bạn đến gặp Fanzy ngay. Hoàn thành nhiệm vụ và quay lại ngay. Chúc may mắn.")
        sm.startQuest(parentID)
        sm.warp(101030000)
