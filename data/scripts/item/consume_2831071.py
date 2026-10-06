from net.swordie.ms.constants import QuestConstants

coreIDs = [30000031, 30000032, 30000033]

if sm.hasQuestCompleted(QuestConstants.FIFTH_JOB_QUEST):
    if sm.hasItem(2831071, 1):
        if not sm.openNodeStonesByRandomCoreIDsInBulk(102, 2831071, 1, coreIDs):
            sm.chat("Kho Node của bạn đã đạt giới hạn tối đa.")
else:
    sm.chat("Vui lòng hoàn thành nhiệm vụ Thăng Cấp Nghề Lần 5.")