# horntail - Cave of Life - Cave of trial 1
from net.swordie.ms.constants import GameConstants
maps = { 240060000 : 240060100, 240060100 : 240060300, 240060002 : 240060102, 240060102 : 240060200, 240060001 : 240060101, 240060101 : 240060201 }

if not sm.isPartyLeader():
	sm.systemMessage("Only your party leader may proceed to the next room..")
elif not sm.hasMobsInField():
    sm.warpParty(maps[sm.getFieldID()], chr.getParty())
else:
	sm.chat("Please eliminate all monsters")
