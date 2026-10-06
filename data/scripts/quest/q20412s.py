# 20412 - [Thăng Cấp] (Lv.100) Thăng cấp nghề lần 4 cho Mihile
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101002)
sm.setBoxChat()
if sm.sendAskYesNo("Bạn đã sẵn sàng, bạn ổn để rời đi chưa?"):
    sm.lockInGameUI(False,False)
    sm.showFade(100)
    sm.warp(913070100, 0)
    sm.setInstanceTime(300, 130000000)
else:
    sm.lockInGameUI(False,False)
    #sm.dispose()