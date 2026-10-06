# [Commerci Republic] Neinheart's Call

NEIN_HEART = 1064026

sm.setSpeakerID(NEIN_HEART)
response = sm.sendAskYesNo("Ah good, I've managed to reach you. The Empress has been asking for you. Could you come to Ereve?\r\n#b(You will be moved to Ereve if you accept.)")
if response:
    sm.sendNext("I will be waiting for you.")
    sm.startQuestNoCheck(parentID)
    sm.warp(130000000, 0)
else:
    sm.sendSayOkay("It would be wise to listen.")