# ObjectID: 0
# ParentID: 57459
# Character field ID when accessed: 103050101
MEDAL = 1142509
sm.jobAdvance(4212)
sm.giveItem(MEDAL)
sm.startQuest(parentID)
sm.completeQuestNoRewards(parentID)
sm.chatScript("You received a new medal.")
sm.showEffect("Effect/BasicEff.img/JobChangedKanna", 0, 0, 0, -2, -2, False, 0)