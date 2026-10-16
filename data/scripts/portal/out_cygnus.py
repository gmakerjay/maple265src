# Exit from Cygnus Boss Arena
target_map = 271040000
if sm.getChr().getInstance() is not None:
    sm.warpInstanceOut(chr, target_map)
else:
    sm.warp(target_map, 0)
