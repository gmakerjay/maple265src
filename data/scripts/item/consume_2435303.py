from net.swordie.ms.constants import JobConstants

itemID = 2435303
warrior = [
    1004229, #Pensalir Battle Helm
    1052799, #Pensalir Battle Mail
    1072967, #Pensalir Battle Boots
    1082608, #Pensalir Battle Gloves
    1102718, #Pensalir Battle Cape
]
mage = [
    1004230, #Pensalir Mage Sallet
    1052800, #Pensalir Mage Robe
    1072968, #Pensalir Mage Boots
    1082609, #Pensalir Mage Gloves
    1102719, #Pensalir Mage Cape
]
bow = [
    1004231, #Pensalir Sentinel Cap
    1052801, #Pensalir Sentinel Suit
    1072969, #Pensalir Sentinel Boots
    1082610, #Pensalir Sentinel Gloves
    1102720, #Pensalir Sentinel Cape
]
thief = [
    1004232, #Pensalir Chaser Hat
    1052802, #Pensalir Chaser Armor
    1072970, #Pensalir Chaser Boots
    1082611, #Pensalir Chaser Gloves
    1102721, #Pensalir Chaser Cape
]
pirate = [
    1004233, #Pensalir Skipper Hat
    1052803, #Pensalir Skipper Coat
    1072971, #Pensalir Skipper Boots
    1082612, #Pensalir Skipper Gloves
    1102722, #Pensalir Skipper Cape
]

sm.setSpeakerID(9000193)

if sm.getEmptyInventorySlots(1)>= 5:
    sm.consumeItem(itemID)
    if JobConstants.isPirateEquipJob(chr.getJob()):
        for item in pirate:
            sm.giveItem(item)
    elif JobConstants.isMageEquipJob(chr.getJob()):
        for item in mage:
            sm.giveItem(item)
    elif JobConstants.isArcherEquipJob(chr.getJob()):
        for item in bow:
            sm.giveItem(item)
    elif JobConstants.isThiefEquipJob(chr.getJob()):
        for item in thief:
            sm.giveItem(item)
    else:
        for item in warrior:
            sm.giveItem(item)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")