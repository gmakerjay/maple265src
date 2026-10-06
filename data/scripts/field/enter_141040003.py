BARBARA = 1510008
PUTAN = 1510000
DACHI = 1510005
ALVESH = 1510003
ALVIOLA = 1510002
NORA = 1510007
HELMSMAN_TANYA = 1510006


sm.lockInGameUI(True)
sm.removeEscapeButton()
sm.moveCamera(150, 0, 100)
if "1" in sm.getQRValue(32192):

    sm.setSpeakerID(BARBARA)
    sm.sendNext("Gì cơ? Mấy người tụ tập ở đây làm gì thế?")

    sm.setSpeakerID(PUTAN)
    sm.sendSay("Hừm hừm,. Chuyện là.. Hừm... Tôi nên bắt đầu từ đâu đây..")

    sm.setSpeakerID(DACHI)
    sm.sendSay("Ý tôi là.. Hừm..")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Nếu có gì muốn nói thì nói nhanh lên! Ta đang bận nấu bữa tối!")

    sm.setSpeakerID(ALVIOLA)
    sm.sendSay("Tôi đến để xin lỗi. Tôi xin lỗi vì đã hiểu lầm bà bấy lâu nay.")

    sm.setSpeakerID(ALVESH)
    sm.sendSay("Tất cả chỉ là một sự hiểu lầm lớn. Bà không phải là phù thủy... "
               "Bà không phá hủy các sông băng, cũng không làm mực nước biển dâng lên. "
               "Thay vào đó, bà đã chăm sóc những đứa trẻ của chúng tôi, những đứa trẻ không còn nơi nào để đi.")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Mấy người dở hơi. Giờ mới nhận ra sao?")

    sm.setSpeakerID(PUTAN)
    sm.sendSay("Hừm hừm, tôi xin lỗi. Nhưng tại sao bà không nói ra? Như thế chúng tôi đã không hiểu lầm bà rồi!")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Thật vớ vẩn! Tại sao ta lại phải làm hại những đứa mà ta đã nuôi nấng và chăm sóc bằng chính đôi tay của mình?")

    sm.setSpeakerID(PUTAN)
    sm.sendSay("Hả?..")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Ta không phải là người gốc ở đây. Ta đã mất chồng và các con.. "
               "Ta không muốn sống nữa, nhưng ta quyết định sẽ chết sau khi tận hưởng tuyết mà ta thích. "
               "Đó là lý do ta đến đây.")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Nhưng rồi, ta tìm thấy các ngươi đang trôi dạt trên biển.")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Những đứa nhỏ đó bám chặt lấy áo quần của ta... Ta không thể bỏ mặc chúng. Đó là lý do ta đưa tất cả chúng về đây.")

    sm.warp(141040002, 0)
    sm.setQRValue(32192, "2")

elif "2" in sm.getQRValue(32192):
    sm.hideUser(False)

    sm.setSpeakerID(PUTAN)
    sm.sendNext("Ôi không... Tôi không nhớ rõ... Nhưng bà chính là người đã cứu chúng tôi khi còn bé!")

    sm.setSpeakerID(ALVESH)
    sm.sendSay("Tôi nhớ lờ mờ. Có ai đó đã chăm sóc tôi bằng đôi tay ấm áp... Tôi chưa bao giờ biết đó là tay của con người. Trong khi đó, chúng tôi lại gọi bà là phù thủy...")

    sm.setSpeakerID(DACHI)
    sm.sendSay("Vậy thì, điều đó có nghĩa là, bà đã ở đây làm công việc đó suốt hàng thế kỷ. Ôi trời... bà như một người mẹ của dân tộc chúng tôi!")

    sm.setSpeakerID(NORA)
    sm.sendSay("Thật cảm động quá, Bà ơi.")

    sm.setSpeakerID(BARBARA)
    sm.sendSay("Ngừng nói nhảm và ăn đi.")

    sm.sendSay("Và mấy đứa nhóc kia.. Bà già này cảm thấy tổn thương rồi đó..")

    sm.setSpeakerID(PUTAN)
    sm.sendSay("...?")

    sm.setSpeakerID(BARBARA)
    sm.sendNext("#r#eNgừng cãi vã đi, lũ nhóc ranh!")

    sm.setSpeakerID(PUTAN)
    sm.sendSay("Vâ.. Vâng!")

    sm.moveCamera(150, -500, 50)

    sm.setSpeakerID(NORA)
    sm.sendNext("Tốt rồi. Vậy là sẽ không còn xung đột nào giữa ba nhóm dân tộc nữa, phải không?")

    sm.setSpeakerID(HELMSMAN_TANYA)
    sm.sendSay("Haha, tất cả là nhờ công của anh/chị, hoa tiêu.")

    sm.warpInstanceOut(chr, 141000000, 0)
    sm.lockInGameUI(False)