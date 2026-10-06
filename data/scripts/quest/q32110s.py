# id 32110 ([Ellinel Fairy Academy] Combing the Academy 1), field 101072200
sm.setSpeakerID(1500011) # Cootie Bé Tí
sm.sendNext("Nơi này tuyệt vời quá, #h0#. Hãy cùng đi xem xét xung quanh nào.")
sm.setParam(2)
sm.sendSay("Chúng ta nên làm gì trước đây?")
sm.setParam(4)
sm.setSpeakerID(1500011) # Cootie Bé Tí
sm.sendSay("Bạn biết trẻ con thích gì nhất không? Bí mật! Tôi nhớ mình từng trao đổi công thức thuốc với bạn bè sau lưng giáo viên, giấu nghiên cứu giả kim của mình trong các ngóc ngách quanh trường...")
sm.setParam(0)
res = sm.sendNext("Tôi cá là những đứa trẻ này có giấu các mẩu giấy khắp trường. Nhưng làm thế nào chúng ta tìm ra chúng?#b\r\n#L0#Tìm lũ trẻ và hỏi chúng giấu đồ ở đâu.#l\r\n#L1#Chúng phải ở gần đây, chúng ta nên tìm xung quanh.#l#l\r\n#L2#Tôi không biết. Khó quá...#l")
if res == 0:
    sm.sendNext("Đúng là một câu nói của con người, #h0#. Chúng ta phải tìm ra bí mật của chúng TRƯỚC! Sau đó mới tìm chúng... Trời ạ.")
elif res == 1:
    sm.sendNext("Mọi người đã tìm kiếm hết rồi, chúng ta nên thử cách khác.")
elif res == 2:
    sm.sendNext("Có lẽ có manh mối được viết trong những cuốn sách này.")
    sm.startQuest(parentID)
    sm.addQRValue(32133, "1")