# id 37173 ([Elodin] Singing Necessities 1), field 101084400
sm.setSpeakerID(1501004) # Shimmer Songbird
sm.setParam(4)
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendNext("Trước khi hát, bạn phải chuẩn bị giọng hát.")
sm.sendSay("Tìm #i4036505# #t4036505# từ #o3501108# và #o3501109# gần đó sẽ cho bạn những nốt nhạc hay và rõ ràng.")
if sm.sendAskYesNo("Đây là một #t4220197# mới. Vui lòng dùng #t4036505# và đổ vào rồi quay lại đây.") and sm.getEmptyInventorySlots(4) >= 1:
    sm.sendNext("Lần này tôi cần #r15 giọt #t4036505##k.")
    sm.startQuest(parentID)
    sm.giveItem(4220197) # 4036505 | Pure Water
else:
    sm.sendSayOkay("Bạn không có đủ ô chứa ở tab khác.")
