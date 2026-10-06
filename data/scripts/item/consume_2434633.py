import random

REWARDS = [[1142910, 1], [2049035, 1], [2049511, 1], [2049710, 1], [2434637, 1], [4001832, 100]]

reward = random.randrange(len(REWARDS))

if sm.canHold(REWARDS[reward][0]):
    sm.giveItem(REWARDS[reward][0], REWARDS[reward][1])
    sm.consumeItem(2434633)
else:
    sm.chat("Make sure you have enough empty slots in your inventory!")