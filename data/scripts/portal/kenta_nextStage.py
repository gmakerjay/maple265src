# kenta_nextStage.py - Portal next00 in Kenta in Danger PQ
from net.swordie.ms.enums.social.Party import PartyQuestType

fieldId = sm.getFieldID()
if fieldId == 923040100:
    if sm.hasMobsInField():
        sm.chat("The portal is closed. Clear the monsters threatening Kenta first!")
    else:
        sm.setAchieveRatio(25)
        sm.warpParty(923040200, chr.getParty())
elif fieldId == 923040200:
    if sm.hasMobsInField():
        sm.chat("The portal is closed. Eliminate the dangerous sea creatures!")
    else:
        sm.setAchieveRatio(50)
        sm.warpParty(923040300, chr.getParty())
elif fieldId == 923040300:
    if sm.hasMobsInField():
        sm.chat("The portal is closed. Protect Kenta from the remaining creatures!")
    else:
        sm.setAchieveRatio(75)
        sm.warpParty(923040400, chr.getParty())
        sm.spawnMob(8520000, 180, 1810, False)
else:
    sm.warp(923040000)
