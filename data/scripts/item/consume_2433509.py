# Frozen Weapon Box
from net.swordie.ms.constants import JobConstants
JOB = chr.getJob()
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(1) >= 4:
    if JobConstants.isLuminous(JOB):
        chr.addItemToInventory(1212116,1,"day",90) # Frozen Shining Rod
    elif JobConstants.isAdele(JOB):
        chr.addItemToInventory(1213023,1,"day",90) # Frozen Bladecaster
    elif JobConstants.isKain(JOB):
        chr.addItemToInventory(1214023,1,"day",90) # Frozen Whispershot
    elif JobConstants.isRen(JOB):
        chr.addItemToInventory(1215033,1,"day",90) # Frozen Sword
    elif JobConstants.isAngelicBuster(JOB):
        chr.addItemToInventory(1222110,1,"day",90) # Frozen Soul Shooter
    elif JobConstants.isDemonAvenger(JOB):
        chr.addItemToInventory(1232110,1,"day",90) # Frozen Devil Sword
    elif JobConstants.isXenon(JOB):
        chr.addItemToInventory(1242117,1,"day",90) # Frozen Chain Sword
    elif JobConstants.isLynn(JOB):
        chr.addItemToInventory(1252095,1,"day",90) # Frozen Memorial Staff
    elif JobConstants.isSiaAstelle(JOB):
        chr.addItemToInventory(1253020,1,"day",90) # Frozen Celestial Light
    elif JobConstants.isKinesis(JOB):
        chr.addItemToInventory(1262027,1,"day",90) # Frozen Psy-limiter
    elif JobConstants.isCadena(JOB):
        chr.addItemToInventory(1272031,1,"day",90) # Frozen Nova Chain
    elif JobConstants.isIllium(JOB):
        chr.addItemToInventory(1282019,1,"day",90) # Frozen Lucent Gauntlet
    elif JobConstants.isHoYoung(JOB):
        chr.addItemToInventory(1292023,1,"day",90) # Frozen Black Ritual Fan
    elif JobConstants.isShadower(JOB) or JobConstants.isDualBlade(JOB):
        chr.addItemToInventory(1332275,1,"day",90) # Frozen Cutter
    elif JobConstants.isPhantom(JOB):
        chr.addItemToInventory(1362136,1,"day",90) # Frozen Cane
    elif JobConstants.isLara(JOB):
        chr.addItemToInventory(1372223,1,"day",90) # Frozen Wand
    elif JobConstants.isBattleMage(JOB):
        chr.addItemToInventory(1382260,1,"day",90) # Frozen Staff
    elif JobConstants.isMihile(JOB):
        chr.addItemToInventory(1302334,1,"day",90) # Frozen Sword
    elif JobConstants.isKaiser(JOB):
        chr.addItemToInventory(1402252,1,"day",90) # Frozen Two-handed Sword
    elif JobConstants.isMoXuan(JOB):
        chr.addItemToInventory(1403023,1,"day",90) # Frozen Martial Brace
    elif JobConstants.isKhali(JOB):
        chr.addItemToInventory(1404023,1,"day",90) # Frozen Kshama
    elif JobConstants.isAran(JOB):
        chr.addItemToInventory(1442269,1,"day",90) # Frozen Polearm
    elif JobConstants.isBowMaster(JOB) or JobConstants.isWindArcher(JOB):
        chr.addItemToInventory(1452253,1,"day",90) # Frozen Longbow
    elif JobConstants.isMarksman(JOB) or JobConstants.isWildHunter(JOB):
        chr.addItemToInventory(1462240,1,"day",90) # Frozen Crossbow
    elif JobConstants.isNightLord(JOB) or JobConstants.isNightWalker(JOB):
        chr.addItemToInventory(1472262,1,"day",90) # Frozen Steer
    elif JobConstants.isBuccaneer(JOB) or JobConstants.isThunderBreaker(JOB) or JobConstants.isShade(JOB) or JobConstants.isArk(JOB) or JobConstants.isYeti(JOB):
        chr.addItemToInventory(1482217,1,"day",90) # Frozen Grip
    elif JobConstants.isMechanic(JOB) or JobConstants.isCorsair(JOB):
        chr.addItemToInventory(1492232,1,"day",90) # Frozen Shooter
    elif JobConstants.isMercedes(JOB):
        chr.addItemToInventory(1522139,1,"day",90) # Frozen Twin Angels
    elif JobConstants.isCannoneer(JOB):
        chr.addItemToInventory(1532145,1,"day",90) # Frozen Cannon
    elif JobConstants.isHayato(JOB):
        chr.addItemToInventory(1542114,1,"day",90) # Frozen Katana
    elif JobConstants.isKanna(JOB):
        chr.addItemToInventory(1552116,1,"day",90) # Frozen Maple Fan
    elif JobConstants.isBlaster(JOB):
        chr.addItemToInventory(1582021,1,"day",90) # Frozen Arm Cannon
    elif JobConstants.isPathFinder(JOB):
        chr.addItemToInventory(1592008,1,"day",90) # Frozen Ancient Bow

    elif JobConstants.isHero(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302334:# #t1302334:##n#k#l\r\n"
                    "#L1##b#e#i1312200:# #t1312200:##n#k#l\r\n"
                    "#L2##b#e#i1402252:# #t1402252:##n#k#l\r\n"
                    "#L3##b#e#i1412178:# #t1412178:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302334,1,"day",90)
        elif sel == 1:
            chr.addItemToInventory(1312200,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1402252,1,"day",90)
        elif sel == 3:
            chr.addItemToInventory(1412178,1,"day",90)

    elif JobConstants.isPaladin(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302334:# #t1302334:##n#k#l\r\n"
                    "#L1##b#e#i1322251:# #t1322251:##n#k#l\r\n"
                    "#L2##b#e#i1402252:# #t1402252:##n#k#l\r\n"
                    "#L3##b#e#i1422185:# #t1422185:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302334,1,"day",90)
        elif sel == 1:
            chr.addItemToInventory(1322251,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1402252,1,"day",90)
        elif sel == 3:
            chr.addItemToInventory(1422185,1,"day",90)

    elif JobConstants.isDarkKnight(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1432215:# #t1432215:##n#k#l\r\n"
                    "#L2##b#e#i1442269:# #t1442269:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1432215,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1442269,1,"day",90)

    elif JobConstants.isDawnWarrior(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302334:# #t1302334:##n#k#l\r\n"
                    "#L2##b#e#i1402252:# #t1402252:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302334,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1402252,1,"day",90)

    elif JobConstants.isDemonSlayer(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1312200:# #t1312200:##n#k#l\r\n"
                    "#L2##b#e#i1322251:# #t1322251:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1312200,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1322251,1,"day",90)

    elif JobConstants.isAdventurerMage(JOB) or JobConstants.isBlazeWizard(JOB) or JobConstants.isEvan(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1372223:# #t1372223:##n#k#l\r\n"
                    "#L2##b#e#i1382260:# #t1382260:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1372223,1,"day",90)
        elif sel == 2:
            chr.addItemToInventory(1382260,1,"day",90)
    sm.consumeItem(parentID)
    chr.addItemToInventory(1004404,1,"day",90)
    chr.addItemToInventory(1102799,1,"day",90)
    chr.addItemToInventory(1052893,1,"day",90)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")