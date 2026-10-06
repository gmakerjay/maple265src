from net.swordie.ms.constants import QuestConstants

if sm.hasQuestCompleted(QuestConstants.FIFTH_JOB_QUEST):
    if sm.hasItem(2632972, 1):
        if not sm.openNodeStoneByCoreID(2632972, 10000031):
            sm.chat("Kho Node của bạn đã đạt giới hạn tối đa.")
else:
    sm.chat("Vui lòng hoàn thành nhiệm vụ Thăng Cấp Nghề Lần 5.")