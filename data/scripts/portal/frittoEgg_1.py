if parentID % 2 == 0:
    portal = 14
else:
    portal = 13
if sm.getRandomIntBelow(10) == 0:
    sm.teleportToPortal(portal)
    chr.getFrittoEgg().update(chr, 1)
else:
    chr.getFrittoEgg().end(chr, 1)
