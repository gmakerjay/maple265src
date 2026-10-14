# 34455 - [Arcana] Fixing the Floral Flute 1
sm.setSpeakerID(3003303)
sm.sendNext("The Floral Flute looked to be revitalized by the offered lifeforce, but returned to its withered state. Maybe you need more?")
if sm.hasItem(4036096, 10):
    sm.consumeItem(4036096, 10)
if sm.hasItem(4036097, 10):
    sm.consumeItem(4036097, 10)
if sm.hasItem(4036098, 10):
    sm.consumeItem(4036098, 10)
sm.completeQuest(34455)
