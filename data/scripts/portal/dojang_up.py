# 921160700 - Escape! - PQ
stage = ((chr.getFieldID() % 10000) / 100)

if chr.getInstance().hasProperty("dojoclear" + str(stage)):
    sm.addDojoPoint(10)
    if stage == 10 or stage == 20 or stage == 30 or stage == 40:
        sm.addDojoPoint(100)
    if chr.getFieldID() == 925074100:
        sm.warp(925020002)
    else:
        sm.warp(chr.getFieldID() + 100)
else:
    sm.teleportToPortal(0)
    sm.chat("Eliminate the boss before continuing")


