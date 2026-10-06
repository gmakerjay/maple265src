# id 32114 ([Ellinel Fairy Academy] Combing the Academy 4), field 101072700
sm.setSpeakerID(1500012) # Cootie the Really Small (Cootie Bé Tí)
res = sm.sendAskAccept("Ký túc xá nữ cũng được bố trí giống hệt khu nam, ở cuối mỗi tầng. Tôi không biết mình có nên lảng vảng trong phòng của các quý cô không nữa...")
if res:
    sm.sendNext("Chúng ta phải làm những gì cần làm để hoàn thành cuộc điều tra này!\r\n(Không hiểu sao Cootie lại đỏ mặt...)\r\n\r\nVui lòng tìm kiếm xung quanh các phòng ký túc xá ở tầng ba giúp tôi...")
    sm.startQuest(parentID)