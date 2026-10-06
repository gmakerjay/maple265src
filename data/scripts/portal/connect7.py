from net.swordie.ms.constants import GameConstants

if sm.hasQuestCompleted(1826):
    sm.warp(GameConstants.EVOLVING_LINK_MAP_7)
else:
    sm.chat("Connection to Link Failed")

