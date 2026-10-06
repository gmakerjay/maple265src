from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1827):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_8)
else:
    sm.chat("Connection to Link Failed")

