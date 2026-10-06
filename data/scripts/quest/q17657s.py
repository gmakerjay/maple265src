# id 17657 ([Cộng Hòa Commerci] Quý Cô Đó Là Ai?), field 865030000
sm.setSpeakerID(9390249) # Quý Cô Áo choàng
sm.sendNext("Việc bạn tìm ra tôi là ai có thực sự quan trọng đến thế không?")
sm.setParam(4)
sm.setSpeakerID(9390202) # Leon Daniella
sm.sendSay("Này. Chúng ta có một sự gắn kết. Bạn và tôi, tôi muốn chúng ta cởi mở với nhau. Như là, tôi vừa tè ra quần một chút khi con sói đó cắn tôi. Thấy chưa? Đến lượt bạn đấy.")
sm.setParam(0)
res = sm.sendAskYesNo("Tôi hy vọng bạn đã sẵn sàng cho một bất ngờ...")
sm.sendNext("Cầm lấy cái này.")
sm.startQuest(parentID)