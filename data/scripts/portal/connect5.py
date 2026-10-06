from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1824):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_5)
else:
    sm.chat("Connection to Link Failed")

