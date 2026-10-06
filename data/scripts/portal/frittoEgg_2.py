if parentID % 2 == 0:
    portal = 16
else:
    portal = 15
if sm.getRandomIntBelow(10) == 0:
    sm.teleportToPortal(portal)
    chr.getFrittoEgg().update(chr, 2)
else:
    chr.getFrittoEgg().end(chr, 2)
