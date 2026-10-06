from net.swordie.ms.constants import QuestConstants

coreIDs = [30000025, 30000026, 30000027, 30000028, 30000029, 30000030]

if sm.hasQuestCompleted(QuestConstants.FIFTH_JOB_QUEST):
    if sm.hasItem(2638846, 1):
        if not sm.openNodeStonesByRandomCoreIDsInBulk(101, 2638846, 1, coreIDs):
            sm.chat("Kho Node của bạn đã đạt giới hạn tối đa.")
else:
    sm.chat("Vui lòng hoàn thành nhiệm vụ Thăng Cấp Nghề Lần 5.")