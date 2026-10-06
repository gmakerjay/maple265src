from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1820):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_2)
else:
    sm.chat("Connection to Link Failed")

