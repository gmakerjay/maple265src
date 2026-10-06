from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1822):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_3)
else:
    sm.chat("Connection to Link Failed")

