if sm.getRandomIntBelow(10) == 0:
    sm.teleportToPortal(10) # Final portal
    chr.getFrittoEgg().update(chr, 5)
else:
    chr.getFrittoEgg().end(chr, 5)
