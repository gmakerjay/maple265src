if parentID % 2 == 0:
    portal = 20
else:
    portal = 19
if sm.getRandomIntBelow(10) == 0:
    sm.teleportToPortal(portal)
    chr.getFrittoEgg().update(chr, 4)
else:
    chr.getFrittoEgg().end(chr, 4)
