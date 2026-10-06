# ParentID: 2431412
# Character field ID when accessed: 240010500
# ObjectID: 0
from net.swordie.ms.constants import JobConstants
JOB = chr.getJob()
ITEM = 2431413
TYRANT_WARRIOR = 1132174
TYRANT_MAGICAL = 1132175
TYRANT_ARCHER = 1132176
TYRANT_THIEF = 1132177
TYRANT_PIRATE = 1132178
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(1)>= 1:
    if JobConstants.isAdventurerWarrior(int(JOB)) == True or JobConstants.isKaiser(int(JOB)) == True or JobConstants.isAran(int(JOB)) == True or JobConstants.isDemon(int(JOB)) == True or 1100 <= int(JOB) <= 1112 or 3700 <= int(JOB) <= 3712 or 5100 <= int(JOB) <= 5112 or 4100 <= int(JOB) <= 4112:
        sm.giveItem(TYRANT_WARRIOR)
    if JobConstants.isAdventurerMage(int(JOB)) == True or JobConstants.isEvan(int(JOB)) == True or JobConstants.isLuminous(int(JOB)) == True or JobConstants.isKinesis(int(JOB)) == True or 4200<=int(JOB)<=4212 or int(JOB) == 4002 or 3200<=int(JOB)<=3212 or 1200<=int(JOB)<=1212 :
        sm.giveItem(TYRANT_MAGICAL)
    if JobConstants.isAdventurerArcher(int(JOB)) == True or JobConstants.isMercedes(int(JOB)) == True or 1300<=int(JOB)<=1312 or 3300<=int(JOB)<=3312:
        sm.giveItem(TYRANT_ARCHER)
    if JobConstants.isAdventurerThief(int(JOB)) == True or 3600<=int(JOB)<=3612 or 1400<=int(JOB)<=1412 or int(JOB) == 2003 or 2400<=int(JOB)<=2412:
        sm.giveItem(TYRANT_THIEF)
    if JobConstants.isAdventurerPirate(int(JOB)) == True or 1500<=int(JOB)<=1512 or 3500<=int(JOB)<=3512 or int(JOB) == 6001 or 6500<=int(JOB)<=6512 or int(JOB) == 2005 or 2500<=int(JOB)<=2512 or 570<=int(JOB)<=572 or int(JOB) == 508:
        sm.giveItem(TYRANT_PIRATE)
    sm.consumeItem(ITEM)
    #sm.dispose()
elif not sm.getEmptyInventorySlots(1)>= 1:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")