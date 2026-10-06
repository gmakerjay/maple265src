from net.swordie.ms.util import Util

if sm.canHold(4310075, 100):
    sm.giveItem(4310075, Util.getRandom(1, 100))
    sm.consumeItem(2430863)
else:
    sm.chat("Make sure you have enough empty slots in your ETC inventory!")