# ObjectID: 0
# ParentID: 57459
# Character field ID when accessed: 103050101
MEDAL = 1142508
sm.jobAdvance(4211)
sm.giveItem(MEDAL)
sm.completeQuestNoRewards(parentID)
sm.chatScript("Bạn đã nhận được một huy chương mới.")
sm.showEffect("Effect/BasicEff.img/JobChangedKanna", 0, 0, 0, -2, -2, False, 0)