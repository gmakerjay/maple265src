# [Daily Quest] Vanishing Journey Research
import time

RONA = 3003104
reqMob = 500

sm.setSpeakerID(RONA)
sm.sendNext("Hành trình Biến mất là một nơi bí ẩn, nơi mọi thứ dường như liên tục bị hủy hoại.")
sm.setPlayerAsSpeaker()
sm.sendSay("Có chuyện gì vậy?")
sm.setSpeakerID(RONA)
sm.sendSay("Hãy giúp Vệ binh Thời gian trong quá trình nghiên cứu bằng cách hoàn thành nhiệm vụ được giao hàng ngày.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(34331): # [Lachelein] Decisive Battle
        reqMob = 100
    elif sm.hasQuestCompleted(34218): # [Chu Chu] Goodbye, Chu Chu Island
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Tôi có nhiệm vụ cho bạn ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bArcana#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38451)
        elif reqMob == 300:
            sm.startQuest(38452)
        else:
            sm.startQuest(38453)
        sm.setSpeakerID(RONA)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(RONA)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(RONA)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")