import random

REWARDS = [[1142910, 1], [2711006, 1], [2711005, 1], [5680479, 1], [2049028, 1], [2434639, 1], [2049164, 1], [2049122, 1], [4001832, 500]]

reward = random.randrange(len(REWARDS))

if sm.canHold(REWARDS[reward][0]):
    sm.giveItem(REWARDS[reward][0], REWARDS[reward][1])
    sm.consumeItem(2434636)
else:
    sm.chat("Make sure you have enough empty slots in your inventory!")