# [Daily Quest] Chu Chu's Finest Cuisine
import time

MASTER_LYCK = 3003152
reqMob = 500

sm.setSpeakerID(MASTER_LYCK)
sm.sendNext("Hãy giúp tôi nấu món ăn tuyệt vời để đãi mọi người bữa ăn thịnh soạn nhé.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(34478): # [Arcana] The Harmony of the Forest
        reqMob = 100
    elif sm.hasQuestCompleted(34331): # [Lachelein] Decisive Battle
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Tôi có nhiệm vụ cho bạn ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bChu Chu#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38455)
        elif reqMob == 300:
            sm.startQuest(38456)
        else:
            sm.startQuest(38457)
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(MASTER_LYCK)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")