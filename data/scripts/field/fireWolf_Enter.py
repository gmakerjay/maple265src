from net.swordie.ms.constants import BossConstants

if not sm.hasMobsInField():
    sm.spawnMob(BossConstants.INFERNO_WOLF, 0, 353, False)
sm.createStopWatch(30) # 30 sec
sm.invokeAfterDelay(30000, "warpNoReturn", 993000600, 0)