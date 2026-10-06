# id 32112 ([Ellinel Fairy Academy] Clue Number One), field 101072400
sm.setSpeakerID(1500021) # Hốc Bí Mật
if sm.sendAskAccept("Có một thứ gì đó kỳ lạ ở đây. Chúng ta nên kiểm tra không?"):
    sm.setParam(2)
    sm.sendNext("#i4033828# \r\n\r\n(Bạn tìm thấy... một vở kịch. Lũ trẻ đã viết ra cái này sao? Nó dài đến 300 trang! Có lẽ bạn nên đọc nó... cho mục đích nghiên cứu...)")
    sm.setParam(4)
    sm.setSpeakerID(1500022) # Vở Kịch Tiên Nữ
    sm.sendSay("[Vở Kịch Tiên Nữ]\r\n\r\n- Hồi 3 -\r\n\r\n[Màn nhung kéo lên khi một giai điệu trang nghiêm vang vọng trong không khí.]\r\n\r\nPHANTOM: (nói với khán giả) Thế giới này là một thế giới của nỗi buồn và khổ đau, và cũng là nỗi buồn! Ta cảnh cáo ngươi, tên chỉ huy của cái ác và bạn của Black Mage, ta sẽ không bao giờ để ngươi yên nghỉ, trừ khi ta buộc ngươi phải yên nghỉ! Ta đã đánh cắp đá quý và kiệt tác của hàng triệu người giàu có, nhưng thứ cuối cùng ta sẽ lấy... LÀ MẠNG SỐNG CỦA NGƯƠI!")
    sm.setParam(2)
    sm.sendSay("Tuyệt vời quá... Mình phải đọc thêm mới được")
    sm.setParam(4)
    sm.sendSay("[Vở Kịch Tiên Nữ]\r\n\r\nARAN: (Vừa dũng cảm vừa u sầu) Hỡi người bảo vệ ánh sáng thân yêu, hãy di chuyển nhanh hơn ánh sáng! Tôi sẽ đẩy lùi sự tà ác của kẻ thù bằng cánh tay lốc xoáy của mình!\r\nLUMINOUS: (Cực kỳ than thở) Tôi thề với tất cả các vị thần hùng mạnh nhất của thời gian và ánh sáng rằng tôi sẽ đánh bại Black Mage bằng phép thuật ánh sáng cực mạnh của mình trước khi vũ khí của anh kịp tiêu diệt kẻ thù thứ một nghìn lẻ một! \r\n\r\n[Đèn sân khấu mờ đi và Freud cùng Mercedes xuất hiện ở bên trái sân khấu]\r\n\r\nFREUD: Ôi Nữ hoàng tiên nữ thân yêu, xinh đẹp, dễ thương nhất! Nàng thật xinh đẹp đến nỗi ta muốn hôn chân và sau đó chải tóc cho nàng! Danh dự của ta đang bùng nổ sức mạnh khi chiến đấu bên cạnh nàng!\r\nMERCEDES: Ôi, Long Sư vĩ đại nhất trong các Long Sư, ta sẽ tự hào chiến đấu bên cạnh chàng, với mái tóc tuyệt đẹp của ta tung bay trong gió từ con rồng ngọt ngào của chàng! Black Mage sẽ thất bại trước chúng ta!")
    sm.setParam(2)
    sm.sendSay("Tại sao lũ trẻ lại phải giấu cái thứ này nhỉ? Mình muốn đọc thêm, nhưng mình phải đưa cho Cootie xem đã.\r\n(Nói chuyện với #b#p1500011##k.)")
    if sm.canHold(4033828):
        sm.giveItem(4033828)
        sm.startQuest(parentID)
    else:
        sm.sendNext("Bạn không thể nhặt vật phẩm Vở Kịch Tiên Nữ được, vui lòng tạo thêm chỗ trống trong túi đồ.")