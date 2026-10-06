from net.swordie.ms.constants import GameConstants

if sm.sendAskYesNo("Do you want to leave?"):
    sm.warpInstanceOut(chr, GameConstants.COMMERCI_TRADE_ENTRANCE_MAP, 0)
