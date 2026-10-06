# Biểu Cảm Ngủ Gật (6506)

calico = 1092004

drool = 5160031

sm.setSpeakerID(calico)
sm.sendNext("Khò khò...")

sm.setPlayerAsSpeaker()
sm.sendSay("#b(#p" + str(calico) + "# đang ngủ say. Quan sát biểu cảm của anh ta. "
"Mắt anh ấy nhắm và miệng hơi hé mở... "
"Thêm một chút nước dãi sẽ làm bức hình trông chân thực hơn...)")
sm.sendSay("#b(Eo, một bong bóng vừa xuất hiện từ mũi của #p" + str(calico) + "#! "
"Hmm... điều đó thực sự làm cho nó trông chân thực hơn. "
"Thử tạo ra một biểu cảm thậm chí còn vượt trội hơn vẻ mặt của #p" + str(calico) + "#.) \r\n\r\n"
"#fUI/UIWindow2.img/QuestIcon/4/0# \r\n"
"#i" + str(drool) + "# #t" + str(drool) + "# x 1")

sm.giveItem(drool)
sm.completeQuest(6506)

sm.sendNext("#b(Bạn đã học được Biểu Cảm Ngủ Gật từ Calico. "
"Bằng cách nghiên cứu anh ta, bạn đã tạo ra một Biểu Cảm Ngủ Gật thậm chí còn thuyết phục hơn.)")