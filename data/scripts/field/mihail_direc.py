sm.lockInGameUI(True,True)
sm.reservedEffect("Effect/Direction7.img/mikhail/1st_Job")
sm.invokeAfterDelay(10000, "warpInstanceOut", chr, 130000000, 0)# hacky
sm.invokeAfterDelay(8000, "lockInGameUI", False)