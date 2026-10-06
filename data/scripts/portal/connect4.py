from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1823):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_4)
else:
    sm.chat("Connection to Link Failed")

