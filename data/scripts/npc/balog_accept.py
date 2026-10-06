# [Boss Accept] Balrog:
from net.swordie.ms.constants import BossConstants

sm.setSpeakerID(1061014)
sm.flipSpeaker()
sm.setBoxChat()

destinations = [
	["Easy Balrog", 65, 105100300],
	["Hard Balrog", 100, 105100300],
]

def is_party_eligible(reqlevel, party):
        for member in party.getMembers():
                if member.getLevel() < reqlevel:
                        return False
        return True
        
choice = sm.sendNext("#e[Boss: Balrog]#n\r\nGreetings, o weary traveller, you have arrived at the Balrog temple.\r\n#L0#Request to enter Boss: Balrog (Easy)#l\r\n#L1#Request to enter Boss: Balrog (Hard)#l")
if sm.getParty() is None:
    sm.sendSayOkay("Please create a party before going in.")
elif not sm.isPartyLeader():
    sm.sendSayOkay("Please have your party leader talk to me if you wish to face Balrog.")
elif sm.checkParty():
    if is_party_eligible(destinations[choice][1], sm.getParty()):
        #if sm.checkPartyBossAttempt(BossConstants.BALROG, 0):
        sm.setPartyDeathCount(10)
        sm.warpInstanceIn(chr, destinations[choice][2], 0, True)
        #sm.addPartyBoss(BossConstants.BALROG, 0)
        sm.setInstanceTime(BossConstants.BALROG_TIME, BossConstants.BALROG_ENTRY_MAP)
        #else:
            #sm.sendSayOkay("Please make sure all party members have not reached the entry limit.")
    else:
        sm.sendSayOkay("One or more party members are lacking the prerequisite entry quests, or are below level %d." % destinations[0][1])