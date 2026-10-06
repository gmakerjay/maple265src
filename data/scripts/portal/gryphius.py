# Portal to Griffin
DARK_GRIFFEY_FOREST = 924000201

if sm.hasQuest(1451) or sm.hasQuest(1453) or sm.hasQuest(1455) or sm.hasQuest(1457) or sm.hasQuest(1459):
    sm.warpInstanceIn(chr, DARK_GRIFFEY_FOREST)
else:
    sm.warp(240020101, 3)

