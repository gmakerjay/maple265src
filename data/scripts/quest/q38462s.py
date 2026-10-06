# [Daily Quest] Peace in Arcana
import time

TREE_SPIRITS = 3003322
reqMob = 500

sm.setSpeakerID(TREE_SPIRITS)
sm.sendNext("Bạn nghe thấy tiếng thì thầm của các Linh hồn Cây cối trong gió. Liệu họ có cần bạn giúp đỡ một lần nữa không?.")
sm.setPlayerAsSpeaker()
sm.sendSay("Tôi cũng nghe thấy...Có chuyện gì vậy?")
sm.setSpeakerID(TREE_SPIRITS)
sm.sendSay("Hãy giúp mang lại sự cân bằng cho khu rừng Arcana trong Grove of the Spirit Tree.")
if sm.sendAskAccept("Sẽ rất tuyệt nếu bạn có thể giúp chúng tôi, #h0#. Tất nhiên, chúng tôi sẽ cung cấp những phần thưởng mà bạn sẽ thấy rất hữu ích."):
    if sm.hasQuestCompleted(37871): # [Esfera] Mirrors in Mirrors
        reqMob = 100
    elif sm.hasQuestCompleted(34272): # [Morass] The Swamp Remains
        reqMob = 300
    if sm.sendAskAccept("Xin chào! Tôi có nhiệm vụ cho bạn ngày hôm nay. Đánh bại " + str(reqMob) + " quái vật xung quanh khu vực #bArcana#k."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        if reqMob == 100:
            sm.startQuest(38463)
        elif reqMob == 300:
            sm.startQuest(38464)
        else:
            sm.startQuest(38465)
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("Hãy đến gặp tôi sau khi bạn hoàn tất yêu cầu nhiệm vụ. Đừng quên quay lại #r#etrước nửa đêm#n#k nhé!\r\nBây giờ là #r#e" + str(sm.getCurrentTime()))
    else:
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")
else:
    sm.setSpeakerID(TREE_SPIRITS)
    sm.sendNext("Có vẻ như bạn vẫn chưa sẵn sàng. Hãy cho tôi biết khi nào bạn sẵn sàng nhé.")