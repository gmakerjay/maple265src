# id 5 (null), field 101030000

MIDSUMMER_NIGHTS_FOREST_PATH_TO_ELLINEL = 101074000 # MAP ID

sm.setSpeakerType(3)
sm.setParam(4)
sm.setSpeakerID(1500010) # Fanzy
if sm.sendAskYesNo("Bạn có muốn vào #b[Chuỗi nhiệm vụ: #rHọc viện Tiên nữ Ellinel#b]#k không?"):
    sm.warp(MIDSUMMER_NIGHTS_FOREST_PATH_TO_ELLINEL)
else:
    sm.sendSayOkay("Chúng ta vẫn còn việc phải làm, nhớ không?\r\n\r\n#b(Bạn phải nói chuyện với Fanzy và hoàn thành nhiệm vụ của anh ấy để vào.)#k")
