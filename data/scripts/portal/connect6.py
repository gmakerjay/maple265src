from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1825):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_6)
else:
    sm.chat("Connection to Link Failed")

