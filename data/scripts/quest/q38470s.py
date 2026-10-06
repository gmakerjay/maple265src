# [Daily Quest] Esfera Research Orders
import time

OLLIE = 3003530
reqMob = 500

sm.setSpeakerID(OLLIE)
sm.sendNext("Bạn đây rồi!")
sm.setPlayerAsSpeaker()
sm.sendSay("Chuyện gì vậy, Ollie?")
sm.setSpeakerID(OLLIE)
sm.sendSay("Chúng tôi nhận được lệnh từ Bộ Tư lệnh. Họ muốn chúng tôi bắt đầu #bnghiên cứu về Esfera#k.")
sm.setPlayerAsSpeaker()
sm.sendSay("Nghiên cứu?")
sm.setSpeakerID(OLLIE)
sm.sendSay("Có! Nghiên cứu này là #rsăn quái vật#k để xem xét những thay đổi trong khu vực.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(35731) or sm.hasQuestCompleted(36772): # [Labyrinth of Suffering] Source of Suffering
        reqMob = 100
    elif sm.hasQuestCompleted(35632): # [Moonbridge] Clear Path
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Tôi có lệnh điều tra ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bEsfera#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38471)
        elif reqMob == 300:
            sm.startQuest(38472)
        else:
            sm.startQuest(38473)
        sm.setSpeakerID(OLLIE)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(OLLIE)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(OLLIE)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")