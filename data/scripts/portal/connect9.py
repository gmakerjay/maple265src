from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1828):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_9)
else:
    sm.chat("Connection to Link Failed")

