from net.swordie.ms.constants import QuestConstants

if sm.hasQuestCompleted(QuestConstants.FIFTH_JOB_QUEST):
    if sm.hasItem(2637235, 1):
        if not sm.openNodeStoneByCoreID(2637235, 10000035):
            sm.chat("Kho Node của bạn đã đạt giới hạn tối đa.")
else:
    sm.chat("Vui lòng hoàn thành nhiệm vụ Thăng Cấp Nghề Lần 5.")