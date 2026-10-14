# 34456 - [Arcana] Fixing the Floral Flute 2
sm.setSpeakerID(3003303)
sm.sendNext("The Floral Flute looked to be revitalized by the offered lifeforce, but returned to its withered state. Perhaps it is beyond saving.")
if sm.hasItem(4036101, 100):
    sm.consumeItem(4036101, 100)
if sm.hasItem(4036102, 100):
    sm.consumeItem(4036102, 100)
if sm.hasItem(4036103, 100):
    sm.consumeItem(4036103, 100)
sm.completeQuest(34456)
