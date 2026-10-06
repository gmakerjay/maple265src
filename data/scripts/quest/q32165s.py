# [Riena Strait] Gỗ Tốt 2
sm.setSpeakerID(1510006)

lumber = 4030022

if sm.canHold(lumber):
    sm.sendNext("Hoa tiêu, nhìn đằng kia kìa! Gỗ.\r\n\r\n"
                "#b#v"+ str(lumber) +"##t"+ str(lumber) +"#")
    sm.startQuestNoCheck(parentID)
    sm.giveItem(lumber)
else:
    sm.sendSayOkay("Hoa tiêu, hãy dọn chỗ để chứa hết số gỗ chúng ta đang thu hồi này nào!")