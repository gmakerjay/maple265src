sm.setPlayerAsSpeaker()
selection = sm.sendNext("Chào mừng đến hệ thống uỷ thác, bạn muốn thực hiện:#b\r\n#L0#Bắt đầu uỷ thác.#l\r\n#L1#Tìm hiểu về hệ thống uỷ thác.#l#k")
if selection == 0:
    if not chr.isStartedHunting():
        if sm.sendAskYesNo("Bạn chưa có bản ghi uy thác nào ở bản đồ này, vui lòng hãy thiết lập bản ghi tại bản đồ này. Bạn có muốn thực hiện ngay không?"):
            chr.setupIdleHunting()
    else:
        sm.sendSayOkay("Bạn đã có bản ghi ở bản đồ này rồi")
elif selection == 1:
    sm.sendNext("Hệ thống #eỦy thác Săn quái#n là một tính năng giúp nhân vật của bạn tự động tiêu diệt quái vật, thu thập kinh nghiệm và vật phẩm ngay cả khi bạn không trực tuyến (offline). Khi bạn đăng nhập lại, tất cả phần thưởng sẽ được trao cho bạn.\r\nĐể bắt đầu, bạn cần phải kích hoạt hệ thống này tại một bản đồ nhất định.")
    sm.sendNext("#eCách thức hoạt động#n\r\n1. #eGhi nhận dữ liệu:#n Khi bạn bắt đầu ủy thác, hệ thống sẽ ghi nhận các chỉ số chiến đấu của bạn tại bản đồ hiện tại, bao gồm:\r\n- Tốc độ tiêu diệt quái (số quái vật mỗi phút).\r\n- Tốc độ nhận kinh nghiệm (EXP mỗi phút).\r\n- Tốc độ nhặt tiền vàng (meso mỗi phút).\r\n- Tỉ lệ rơi vật phẩm.\r\n2. #eQuá trình ủy thác:#n Khi bạn đăng xuất, hệ thống sẽ sử dụng các chỉ số đã ghi nhận để mô phỏng quá trình săn quái. Thời gian bạn ngoại tuyến càng lâu, số lượng quái vật bị tiêu diệt và phần thưởng nhận được sẽ càng lớn.")
    sm.sendNext("3. #eTrao thưởng:#n Khi bạn đăng nhập lại, hệ thống sẽ tính toán tổng số phần thưởng dựa trên thời gian offline và các chỉ số đã lưu. Bạn sẽ nhận được một thông báo chi tiết về toàn bộ quá trình ủy thác, bao gồm:\r\n- Tổng thời gian ủy thác.\r\n- Tổng số quái vật đã tiêu diệt.\r\n- Tổng kinh nghiệm nhận được.\r\n- Tổng tiền vàng (meso) đã nhặt được.\r\n- Danh sách các vật phẩm đã rơi ra.")
    sm.sendSayOkay("#eCâu hỏi thường gặp#n\r\n#eHệ thống có hoạt động ở mọi bản đồ không?#n\r\nHệ thống chỉ hoạt động ở những bản đồ đã được hệ thống cho phép. Vui lòng kiểm tra danh sách bản đồ ủy thác trước khi bắt đầu.\r\n#eCó thể nhận được vật phẩm hiếm không?#n\r\nCó. Tỷ lệ rơi vật phẩm sẽ được tính toán dựa trên chỉ số thực tế của bạn và tỉ lệ mặc định của game.\r\n#eTôi có thể hủy ủy thác không?#n\r\nHiện tại, hệ thống này sẽ tự động kết thúc khi bạn đăng nhập lại. Bạn có thể bắt đầu ủy thác mới bất cứ lúc nào sau khi đã nhận thưởng.")