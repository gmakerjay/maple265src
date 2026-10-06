import random

REWARDS = [[1142910, 1], [2049612, 1], [2049033, 1], [2470013, 1], [2049710, 1], [2049164, 1], [2434638, 1], [2711005, 1], [4001832, 500]]

reward = random.randrange(len(REWARDS))

if sm.canHold(REWARDS[reward][0]):
    sm.giveItem(REWARDS[reward][0], REWARDS[reward][1])
    sm.consumeItem(2434635)
else:
    sm.chat("Make sure you have enough empty slots in your inventory!")