# [Daily Quest] A Night's Peace in Lachelein
import time

GRAY_MASK = 3003209
reqMob = 500

sm.setSpeakerID(GRAY_MASK)
sm.sendNext("Tôi ngày càng cảm thấy thất vọng với lễ hội không bao giờ kết thúc của Lachelein.")
sm.setPlayerAsSpeaker()
sm.sendSay("Tôi cũng nghe thấy...Có chuyện gì vậy?")
sm.setSpeakerID(GRAY_MASK)
sm.sendSay("Để mang lại hòa bình cho thành phố lễ hội bất tận này. Hãy giúp tôi mang lại chút bình yên cho Lachelein, Thành phố Mộng mơ.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(34272): # [Morass] The Swamp Remains
        reqMob = 100
    elif sm.hasQuestCompleted(34478): # [Arcana] The Harmony of the Forest
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Tôi có nhiệm vụ cho bạn ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bLachelein#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38459)
        elif reqMob == 300:
            sm.startQuest(38460)
        else:
            sm.startQuest(38461)
        sm.setSpeakerID(GRAY_MASK)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(GRAY_MASK)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(GRAY_MASK)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")