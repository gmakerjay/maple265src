# Within Account Nodestone
from net.swordie.ms.constants import QuestConstants

if sm.hasQuestCompleted(QuestConstants.FIFTH_JOB_QUEST):
    sm.openNodestone(parentID)
    sm.consumeItem(parentID)
else:
    sm.chat("Please complete the 5th Job Advancement quest.")
