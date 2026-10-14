# 34320 - [Lachelein] Dress Code
sm.setSpeakerID(3003241)
sm.sendNext("You collected the Flashy Mask Materials. Now you can talk to the other townspeople.")
if sm.hasItem(4034980, 20):
    sm.consumeItem(4034980, 20)
sm.completeQuest(34320)
