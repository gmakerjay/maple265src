if parentID % 2 == 0:
    portal = 18
else:
    portal = 17
if sm.getRandomIntBelow(10) == 0:
    sm.teleportToPortal(portal)
    chr.getFrittoEgg().update(chr, 3)
else:
    chr.getFrittoEgg().end(chr, 3)
