# 15-star Root Abyss Set Box (Time-Restricted)
from net.swordie.ms.constants import JobConstants

rootAbyssSets = [
    (1005302, 1042392, 1062258),  # Warrior
    (1005303, 1042393, 1062259),  # Mage
    (1005304, 1042394, 1062260),  # Archer
    (1005305, 1042395, 1062261),  # Thief
    (1005306, 1042396, 1062262),  # Pirate
]

NPC = 9010000
sm.setSpeakerID(NPC)
sm.flipDialogue()

job = chr.getJob()

# Need 3 EQUIP slots (hat/top/bottom) and 1 ETC slot (2634981)
if sm.getEmptyInventorySlots(1) >= 3 and sm.getEmptyInventorySlots(4) >= 1:
    jobIdx = -1
    if JobConstants.isWarriorEquipJob(job):
        jobIdx = 0
    elif JobConstants.isMageEquipJob(job):
        jobIdx = 1
    elif JobConstants.isArcherEquipJob(job):
        jobIdx = 2
    elif JobConstants.isThiefEquipJob(job):
        jobIdx = 3
    elif JobConstants.isPirateEquipJob(job):
        jobIdx = 4

    if jobIdx == -1:
        sm.sendNext("Nghề của bạn không phù hợp để nhận Root Abyss Set.")

    hat, top, bottom = rootAbyssSets[jobIdx]
    chr.addItemToInventory(hat,    1, "day", 90, 15)
    chr.addItemToInventory(top,    1, "day", 90, 15)
    chr.addItemToInventory(bottom, 1, "day", 90, 15)
    chr.addItemToInventory(2634981, 1, "day", 90)
    sm.consumeItem(parentID)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP/ETC để nhận thưởng.")
