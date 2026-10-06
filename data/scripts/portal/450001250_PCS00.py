if chr.getLevel() < 210:
    sm.teleportToPortal(0)
    sm.progressMessageFont("You must be Lv. 210 or higher to enter this area.")
elif sm.hasQuestCompleted(34200):
    sm.warp(450002000)
else:
    sm.warpInstanceIn(chr, 450002200)