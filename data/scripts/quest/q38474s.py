# [Daily Quest] Moonbridge Research
import time

VELIVAH = 3003810
reqMob = 100

sm.setSpeakerID(VELIVAH)
sm.sendNext("Bạn đây rồi!")
sm.setPlayerAsSpeaker()
sm.sendSay("Chuyện gì vậy, Velivah?")
sm.setSpeakerID(VELIVAH)
sm.sendSay("Chúng tôi nhận được yêu cầu từ Người bảo vệ thời gian. Họ muốn chúng tôi bắt đầu #bnghiên cứu về Moonbridge#k.")
sm.setPlayerAsSpeaker()
sm.sendSay("Nghiên cứu?")
sm.setSpeakerID(VELIVAH)
sm.sendSay("Có! Nghiên cứu này là #rsăn quái vật#k để xem xét những thay đổi trong khu vực.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.sendAskAccept("Xin chào! Tôi có yêu cầu điều tra ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bMoonbridge#k."):
        sm.startQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.setSpeakerID(VELIVAH)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(VELIVAH)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(VELIVAH)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")