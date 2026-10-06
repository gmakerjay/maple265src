# [Daily Quest] Save the Morass
import time

JEAN = 3003432
reqMob = 500

sm.setSpeakerID(JEAN)
sm.sendNext("Oh #h0#, tôi tìm bạn mãi, tôi có chuyện này cần bạn giúp...")
sm.setPlayerAsSpeaker()
sm.sendSay("Chuyện gì vậy, Jean?")
sm.setSpeakerID(JEAN)
sm.sendSay("Hãy giúp chúng tôi bảo vệ #bMorass#k để Đầm lầy Ký ức không trở thành ký ức.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(35632): # [Moonbridge] Clear Path
        reqMob = 100
    elif sm.hasQuestCompleted(37871): # [Esfera] Mirrors in Mirrors
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Bạn cần giúp tôi đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bMorass#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38467)
        elif reqMob == 300:
            sm.startQuest(38468)
        else:
            sm.startQuest(38469)
        sm.setSpeakerID(JEAN)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(JEAN)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(JEAN)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")