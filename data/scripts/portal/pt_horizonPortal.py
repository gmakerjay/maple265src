MAPLE_WORLD = 100000201
PANTHEON = 400000001
WORLD_TREE = 105300000

field = chr.getFieldID()

if field == MAPLE_WORLD and sm.hasQuest(1461):
    sm.warp(450000100)
elif field == PANTHEON and sm.hasQuest(1461):
    sm.warp(450000110)
elif field == WORLD_TREE and sm.hasQuest(1461):
    sm.warp(450000120)
else:
    sm.sendSayOkay("You cannot use this Horizon Portal.")
