# id 37151 ([Elodin] Anne's Plea for Help), field 101082000
sm.setSpeakerID(1012110) # Anne
sm.setParam(4)
sm.setSpeakerID(1012110) # Anne
sm.sendNext("#fs10#Xin chào? Xin lỗi...")
sm.setParam(2)
sm.sendSay("Ai vừa gọi tôi vậy?")
sm.setParam(4)
sm.sendSay("Bạn nghe thấy tôi ư? Tốt quá!")
sm.sendSay("Tôi là Anne! Tôi đang ở Rừng Phép Thuật cùng mẹ tôi, Tiến sĩ Betty, trong khi bà ấy thực hiện nghiên cứu.")
sm.sendSay("Nhưng tôi cần một chút giúp đỡ. Bạn có thể nghe tôi nói không?")
if sm.sendAskYesNo("Nếu bạn sẵn lòng giúp, làm ơn đến gặp tôi.\r\n#r(Nếu bạn đồng ý, bạn sẽ tự động di chuyển đến chỗ Anne ở Rừng Phép Thuật.)#k\r\n\r\n#b#e[Chuỗi nhiệm vụ: Khu Rừng Bí Mật Elodin]#n#k là một chuỗi nhiệm vụ đặc biệt. Nó có cấp độ tối đa là #rCấp 59#b, và kinh nghiệm nhiệm vụ cùng quái vật gần cấp độ của bạn sẽ được cung cấp tương ứng.)"):
    if chr.getFieldID() != 101000000:
        sm.startQuest(parentID)
        sm.setParam(5)
        sm.sendNext("Tôi đang đợi bạn ở Rừng Phép Thuật.")
        sm.warp(101000000)
    else:
        sm.startQuest(parentID)

