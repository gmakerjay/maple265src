from net.swordie.ms.constants import GameConstants

if not sm.hasQuestCompleted(1820):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_1)
else:
    sm.chat("Connection to Link Failed")

