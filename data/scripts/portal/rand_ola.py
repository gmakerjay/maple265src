import random
from net.swordie.ms.world.event import OlaOlaEvent

success = random.randint(0, 100)

if sm.isOlaOlaActive():
    if chr.getFieldID() != OlaOlaEvent.FINAL_MAP:
        if success <= 10:
            sm.warpNoReturn(chr.getFieldID() + 1, 0)
        else:
            sm.teleportToPortal(1)
    else:
        if success <= 5:
            sm.warpNoReturn(OlaOlaEvent.REWARD_MAP, 0)
        else:
            sm.teleportToPortal(1)
