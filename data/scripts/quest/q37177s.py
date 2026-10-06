# id 37177 ([Elodin] Practice Always Makes Perfect), field 101084400
sm.createQuestWithQRValue(37150, "00=h0;01=h1;02=h0;03=h0;04=h1;07=h1;08=h1")
sm.setSpeakerID(1501007) # Baby Bird
sm.setParam(4)
sm.setSpeakerID(1501010) # Baby Bird
sm.sendNext("Tất cả những gì tôi cần là nước mát và hoa ngọt!")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Mọi chuyện đến đâu rồi?")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Ruenna!!")
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendSay("Chào mừng, Ruenna! Tôi rất biết ơn cô vì đã chăm sóc con tôi.")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Đó là chim con của cô sao?!")
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendSay("Đúng vậy! Tôi đã rất lo lắng cho nó! Nhưng cô đã đảm bảo nó trở về nhà an toàn và khỏe mạnh.")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Cô ấy đã làm đồ ăn vặt cho tôi và mọi thứ nữa!")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Tôi chỉ ngạc nhiên thôi. Thành thật mà nói, tôi không thấy nhiều sự giống nhau trong gia đình cho lắm.")
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendSay("Tôi đoán cô nói đúng, ít nhất là bây giờ. Nhưng nó sẽ là một chú chim chói lọi khi nó trưởng thành.")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Tôi muốn lớn lên ngay bây giờ!")
sm.setSpeakerID(1501015) # Shimmer Songbird
sm.sendSay("Con sẽ sớm lớn thôi. Ruenna, nếu không có cô...")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Không có gì đâu. Tôi chỉ đang chăm sóc khu rừng thôi.")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Ồ! Cô đến đúng lúc để nghe tôi hát!")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Vậy thì hãy để tôi nghe xem nào!")
sm.setParam(2)
sm.sendSay("Ưm...")
sm.lockInGameUI(True, False)
sm.removeAdditionalEffect()
sm.blind(1, 255, 0, 0, 0, 0)
sm.sendDelay(1000)
sm.onLayer(1500, "00", 0, 0, 12, "Effect/Direction21.img/Elodin/sing/0", 4, True, -1, False)
sm.sendDelay(3000)
sm.setParam(5)
sm.sendNext("Tôi tưởng cậu đi học thêm rồi...")
sm.sendSay("Đêm nay ngủ ngon quá.")
sm.setParam(3)
sm.sendSay("Ít nhất thì nhịp độ của cậu ấy cũng ổn định hơn rồi.")
sm.setParam(5)
sm.sendSay("...")
sm.sendDelay(3000)
sm.offLayer(500, "00", False)
sm.sendDelay(2000)
sm.blind(0, 0, 0, 0, 0, 1000)
sm.showFadeTransition(0, 1000, 3000)
sm.zoomCamera(0, 1000, 2147483647, 2147483647, 2147483647)
sm.moveCamera(True, 0, 0, 0)
sm.sendDelay(300)
sm.removeOverlapScreen(1000)
sm.moveCamera(True, 0, 0, 0)
sm.lockInGameUI(False, True)
sm.startQuest(parentID)
