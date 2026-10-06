# [Theme Dungeon] Ellinel Fairy Academy
npc = 1201000

sm.setSpeakerID(npc)
if sm.sendAskAccept("#h0#, anh có thể dành chút thời gian cho tôi không? Tôi nhận được yêu cầu giúp đỡ, và tôi không nghĩ ra ai tốt hơn anh."):
    sm.sendNext("Đã xảy ra sự cố tại #bHọc viện Tiên nữ Ellinel#k. Một pháp sư loài người đã xâm phạm vào thánh đường của trường tiên.")
    if sm.sendAskYesNo("Fanzy sẽ đưa anh đến vùng đất của các nàng tiên. Tôi có thể đưa anh đến gặp anh ấy trực tiếp, nếu anh muốn."):
        sm.startQuest(parentID)
        sm.warp(101030000)
