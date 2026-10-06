# id 37171 ([Elodin] Music Teacher), field 101082000
sm.setSpeakerID(1501001) # Ruenna the Fairy
sm.setParam(4)
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendNext("Không biết điều gì đã khiến một chú chim Elodin khóc...")
sm.sendSay("Ồ? Cô ấy nói sẽ dạy nó hát ư? Tuyệt vời!")
sm.sendSay("Vậy giờ anh phải đích thân đưa chú chim non đến đó à?")
res = sm.sendAskYesNo("Vậy thì hai người có thể cùng nhau đến đó!")
sm.setParam(5)
sm.sendNext("Hãy trở về an toàn nhé!")
sm.createQuestWithQRValue(37150, "00=h0;01=h1;02=h0;03=h0;04=h1")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Tôi rất vui! Có lẽ cô ấy có thể dạy tôi cách hát đúng cách, để Ruenna thích nghe tôi hát!")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Đừng vội vàng quá...")
sm.setParam(3)
sm.sendSay("Sao chúng ta không đi nhỉ? Đường dài lắm.")
sm.startQuest(parentID)
sm.warp(101084400)
