from net.swordie.ms.constants import GameConstants

if sm.getInstance() is not None and chr.getParty().isLeader(chr):
    sm.warpParty(GameConstants.ROMEO_EXIT_MAP, chr.getParty())
else:
    sm.sendSayOkay("Only #bLeader of your party#k can talk to me!")