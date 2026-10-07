# -*- coding: utf-8 -*-
# Exit from Papulatus Boss Arena
target_map = 220080000
if sm.getChr().getInstance() != null:
    sm.warpInstanceOut(chr, target_map)
else:
    sm.warp(target_map, 0)
