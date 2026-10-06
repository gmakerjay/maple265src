# Frozen Secondary Weapon Box
from net.swordie.ms.constants import JobConstants
JOB = chr.getJob()
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(1) >= 1:
    if JobConstants.isHero(JOB):
        chr.addItemToInventory(1352207,1,"day",90)
    elif JobConstants.isPaladin(JOB):
        chr.addItemToInventory(1352217,1,"day",90)
    elif JobConstants.isDarkKnight(JOB):
        chr.addItemToInventory(1352227,1,"day",90)
    elif JobConstants.isFirePoison(JOB):
        chr.addItemToInventory(1352237,1,"day",90)
    elif JobConstants.isIceLightning(JOB):
        chr.addItemToInventory(1352247,1,"day",90)
    elif JobConstants.isBishop(JOB):
        chr.addItemToInventory(1352257,1,"day",90)
    elif JobConstants.isBowMaster(JOB):
        chr.addItemToInventory(1352267,1,"day",90)
    elif JobConstants.isMarksman(JOB):
        chr.addItemToInventory(1352277,1,"day",90)
    elif JobConstants.isPathFinder(JOB):
        chr.addItemToInventory(1353704,1,"day",90)
    elif JobConstants.isNightLord(JOB):
        chr.addItemToInventory(1352297,1,"day",90)
    elif JobConstants.isShadower(JOB):
        chr.addItemToInventory(1352287,1,"day",90)
    elif JobConstants.isDualBlade(JOB):
        chr.addItemToInventory(1342102,1,"day",90)
    elif JobConstants.isBuccaneer(JOB):
        chr.addItemToInventory(1352907,1,"day",90)
    elif JobConstants.isCorsair(JOB):
        chr.addItemToInventory(1352917,1,"day",90)
    elif JobConstants.isCannoneer(JOB):
        chr.addItemToInventory(1352929,1,"day",90)
    elif JobConstants.isCygnusKnight(JOB):
        chr.addItemToInventory(1352976,1,"day",90)
    elif JobConstants.isAran(JOB):
        chr.addItemToInventory(1352936,1,"day",90)
    elif JobConstants.isEvan(JOB):
        chr.addItemToInventory(1352946,1,"day",90)
    elif JobConstants.isMercedes(JOB):
        chr.addItemToInventory(1352010,1,"day",90)
    elif JobConstants.isPhantom(JOB):
        chr.addItemToInventory(1352110,1,"day",90)
    elif JobConstants.isShade(JOB):
        chr.addItemToInventory(1353106,1,"day",90)
    elif JobConstants.isLuminous(JOB):
        chr.addItemToInventory(1352407,1,"day",90)
    elif JobConstants.isDemon(JOB):
        chr.addItemToInventory(1099013,1,"day",90)
    elif JobConstants.isBattleMage(JOB):
        chr.addItemToInventory(1352958,1,"day",90)
    elif JobConstants.isWildHunter(JOB):
        chr.addItemToInventory(1352968,1,"day",90)
    elif JobConstants.isMechanic(JOB):
        chr.addItemToInventory(1352708,1,"day",90)
    elif JobConstants.isXenon(JOB):
        chr.addItemToInventory(1353007,1,"day",90)
    elif JobConstants.isBlaster(JOB):
        chr.addItemToInventory(1353404,1,"day",90)
    elif JobConstants.isHayato(JOB):
        chr.addItemToInventory(1352809,1,"day",90)
    elif JobConstants.isMihile(JOB):
        chr.addItemToInventory(1098007,1,"day",90)
    elif JobConstants.isKaiser(JOB):
        chr.addItemToInventory(1352507,1,"day",90)
    elif JobConstants.isKain(JOB):
        chr.addItemToInventory(1354014,1,"day",90)
    elif JobConstants.isCadena(JOB):
        chr.addItemToInventory(1353304,1,"day",90)
    elif JobConstants.isAngelicBuster(JOB):
        chr.addItemToInventory(1352607,1,"day",90)
    elif JobConstants.isKinesis(JOB):
        chr.addItemToInventory(1353204,1,"day",90)
    elif JobConstants.isAdele(JOB):
        chr.addItemToInventory(1354004,1,"day",90)
    elif JobConstants.isIllium(JOB):
        chr.addItemToInventory(1353504,1,"day",90)
    elif JobConstants.isKhali(JOB):
        chr.addItemToInventory(1354034,1,"day",90)
    elif JobConstants.isArk(JOB):
        chr.addItemToInventory(1353604,1,"day",90)
    elif JobConstants.isRen(JOB):
        chr.addItemToInventory(1354045,1,"day",90)
    elif JobConstants.isLara(JOB):
        chr.addItemToInventory(1354024,1,"day",90)
    elif JobConstants.isHoYoung(JOB):
        chr.addItemToInventory(1353804,1,"day",90)
    elif JobConstants.isLynn(JOB):
        chr.addItemToInventory(1352817,1,"day",90)
    elif JobConstants.isMoXuan(JOB):
        chr.addItemToInventory(1352864,1,"day",90)
    elif JobConstants.isSiaAstelle(JOB):
        chr.addItemToInventory(1352874,1,"day",90)
    sm.consumeItem(parentID)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")