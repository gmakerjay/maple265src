if 2400 <= chr.getJob() <= 2411:
    if not sm.hasMobsInField():
        sm.warp(915020101, 1)
    else:
        sm.chat("Eliminate all monster before proceeding.")
    

