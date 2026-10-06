# id 37169 ([Elodin] Thirst Quenching), field 101084400
sm.setSpeakerID(1501004) # Shimmer Songbird
sm.setParam(4)
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendNext("Hụ hụ hụ...")
sm.sendSay("Tôi xin lỗi. Xin hãy thứ lỗi cho tôi. Cổ họng tôi hơi đau từ lúc đó... Thôi không sao.")
sm.setParam(2)
sm.sendSay("Tôi có thể giúp gì cho bạn không?")
sm.setParam(4)
sm.sendSay("Thực ra, bạn có thể giúp tôi! Bạn có thể mang cho tôi #i4036505# #r#t4036505##k được không?")
if sm.sendAskYesNo("#b#o3501108#s#k và #b#o3501109#s#k gần đây có một ít. Tôi rất cảm kích nếu bạn có thể đổ đầy chai nhỏ này và quay lại.") and sm.getEmptyInventorySlots(4) >= 1:
    sm.startQuest(parentID)
    sm.giveItem(4220196) # 4036503 | Pure Water
    sm.sendNext("Cảm ơn bạn! Tôi nghĩ #r9 #i4036503###k nên đủ. \r\n#rNhấp đúp để mở #i4220196:# #b#t4220196:##k, sau đó kéo #i4036503:# #b#t4036503:##k vào để lấp đầy nó.#k")
else:
    sm.sendSayOkay("Bạn không có đủ ô chứa ở tab khác.")
