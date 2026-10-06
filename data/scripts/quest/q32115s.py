# id 32115 ([Ellinel Fairy Academy] Clue Number Two), field 101072500
sm.setSpeakerID(1500023) # Hốc Bí Mật
if sm.sendAskAccept("Có một thứ gì đó kỳ lạ ở đây. Chúng ta nên kiểm tra không?"):
    sm.setParam(2)
    sm.sendNext("#i4033829# \r\n\r\nỞ đây có rất nhiều quần áo... Vài bộ trông hơi kỳ lạ.")
    sm.sendSay("#i1052196##i1050168##i1052495#\r\n\r\nMình biết ngay! Đây là những bộ trang phục sân khấu! Mình phải đem cái này về cho Cootie.")
    if sm.canHold(4033829):
        sm.startQuest(parentID)
        sm.giveItem(4033829)
    else:
        sm.sendNext("Bạn không thể giữ Trang phục Sân khấu Tiên nữ vì bạn không đủ chỗ trống trong túi đồ.")