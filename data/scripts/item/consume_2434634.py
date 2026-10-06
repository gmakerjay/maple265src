import random

REWARDS = [[1142909, 1], [2049033, 1], [2470013, 1], [2049505, 1], [2049164, 1], [2434638, 1], [2000019, 20], [2711005, 1], [4001832, 200]]

reward = random.randrange(len(REWARDS))

if sm.canHold(REWARDS[reward][0]):
    sm.giveItem(REWARDS[reward][0], REWARDS[reward][1])
    sm.consumeItem(2434634)
else:
    sm.chat("Make sure you have enough empty slots in your inventory!")