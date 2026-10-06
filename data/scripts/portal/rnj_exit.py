from net.swordie.ms.constants import GameConstants

if chr.getFieldID() == GameConstants.ROMEO_EXIT_MAP:
    sm.setAchieveRatio(0)
    sm.warpInstanceOut(chr, GameConstants.ROMEO_ENTRANCE_MAP)
elif chr.getFieldID() == GameConstants.JULIET_EXIT_MAP:
    sm.setAchieveRatio(0)
    sm.warpInstanceOut(chr, GameConstants.JULIET_ENTRANCE_MAP)