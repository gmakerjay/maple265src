# Monster Park Shuttle
oldFieldID = sm.getReturnField()
if sm.getFieldID() != 951000000:
    sm.setSpeakerID(9071003)
    sm.flipDialogue()
    if sm.sendAskYesNo("Ôi, vị khách hàng yêu quý của chúng tôi! Bạn có muốn đến Monster Park của Spiegelman không?"):
        sm.sendNext("Chúc bạn có khoảng thời gian vui vẻ tại Monster Park!")
        sm.setReturnField()
        sm.showFade(500)
        sm.warp(951000000, 0)
elif sm.getFieldID() == 951000000:
    if oldFieldID == 0 or oldFieldID == 951000000:
        sm.chat("(Cổng dịch chuyển) Không tìm thấy dữ liệu bản đồ trước đó của bạn, đang dịch chuyển đến Henesys.")
        map = 100000000
        portal = 0
    else:
        map = oldFieldID
        portal = 0
    if sm.sendAskYesNo("Chào bạn! Bạn cần đi nhờ xe về thị trấn không? Đó chính là mục đích của dịch vụ xe đưa đón Monster Park đấy!!"):
        sm.sendNext("Được rồi, xe đưa đón sẽ đưa bạn trở lại thị trấn.")
        sm.showFade(500)
        sm.warp(map, portal)
    else:
        sm.sendNext("Hãy sử dụng xe đưa đón nếu bạn muốn rời khỏi Công viên Quái vật. Chuyến đi thoải mái mọi lúc, đảm bảo 100%.!")