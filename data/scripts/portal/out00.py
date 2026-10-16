# Exit from Root Abyss Boss Arena
target_map = 105200000
if sm.getChr().getInstance() is not None:
    sm.warpInstanceOut(chr, target_map)
else:
    sm.warp(target_map, 0)
