# [Riena Strait] Gỗ Tốt 1
sm.setSpeakerID(1510006)

lumber = 4030022

if sm.canHold(lumber):
    sm.sendNext("Hoa tiêu, khúc gỗ này trông khá tốt.\r\n\r\n"
                "#b#v"+ str(lumber) +"##t"+ str(lumber) +"#")
    sm.startQuestNoCheck(parentID)
    sm.giveItem(lumber)
else:
    sm.sendSayOkay("Hoa tiêu, hãy dọn chỗ để chứa hết số gỗ chúng ta đang thu hồi này nào!")