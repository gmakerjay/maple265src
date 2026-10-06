# 15-star Fafnir Weapon Set Box (Time-Restricted)
from net.swordie.ms.constants import JobConstants
JOB = chr.getJob()
NPC = 9010000

sm.setSpeakerID(NPC)
sm.flipDialogue()
if sm.getEmptyInventorySlots(1) >= 1:
    if JobConstants.isLuminous(JOB):
        chr.addItemToInventory(1212130,1,"day",90,15) # Fafnir Mana Cradle
    elif JobConstants.isAdele(JOB):
        chr.addItemToInventory(1213016,1,"day",90,15) # Fafnir Mercy (Tradeable) FUCK NEXON
    elif JobConstants.isKain(JOB):
        chr.addItemToInventory(1214032,1,"day",90,15) # Fafnir Nightchaser
    elif JobConstants.isRen(JOB):
        chr.addItemToInventory(1215034,1,"day",90,15) # Fafnir Soaring Sword
    elif JobConstants.isAngelicBuster(JOB):
        chr.addItemToInventory(1222123,1,"day",90,15) # Fafnir Angelic Shooter
    elif JobConstants.isDemonAvenger(JOB):
        chr.addItemToInventory(1232123,1,"day",90,15) # Fafnir Death Bringer
    elif JobConstants.isXenon(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1242142:# #t1242142: (Thief)##n#k#l\r\n"
                    "#L1##b#e#i1242143:# #t1242143: (Pirate)##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1242142,1,"day",90,15)
        elif sel == 1:
            chr.addItemToInventory(1242143,1,"day",90,15)
    elif JobConstants.isLynn(JOB):
        chr.addItemToInventory(1252015,1,"day",90,15) # Fafnir Memorial Staff (Tradeable) FUCK NEXON
    elif JobConstants.isSiaAstelle(JOB):
        chr.addItemToInventory(1253016,1,"day",90,15) # Fafnir Celestial Light (Tradeable) FUCK NEXON
    elif JobConstants.isKinesis(JOB):
        chr.addItemToInventory(1262052,1,"day",90,15) # Fafnir Psy-limiter
    elif JobConstants.isCadena(JOB):
        chr.addItemToInventory(1272041,1,"day",90,15) # Fafnir Chain
    elif JobConstants.isIllium(JOB):
        chr.addItemToInventory(1282041,1,"day",90,15) # Fafnir Lucent Gauntlet
    elif JobConstants.isHoYoung(JOB):
        chr.addItemToInventory(1292016,1,"day",90,15) # Fafnir Dragon Ritual Fan (Tradeable) FUCK NEXON
    elif JobConstants.isShadower(JOB) or JobConstants.isDualBlade(JOB):
        chr.addItemToInventory(1332290,1,"day",90,15) # Fafnir Damascus
    elif JobConstants.isPhantom(JOB):
        chr.addItemToInventory(1362090,1,"day",90,15) # Fafnir Ciel Claire (Tradeable) FUCK NEXON
    elif JobConstants.isLara(JOB):
        chr.addItemToInventory(1372238,1,"day",90,15) # Fafnir Mana Taker
    elif JobConstants.isBattleMage(JOB):
        chr.addItemToInventory(1382275,1,"day",90,15) # Fafnir Mana Crown
    elif JobConstants.isMihile(JOB):
        chr.addItemToInventory(1302356,1,"day",90,15) # Fafnir Mistilteinn
    elif JobConstants.isKaiser(JOB):
        chr.addItemToInventory(1402269,1,"day",90,15) # Fafnir Penitent Tears
    elif JobConstants.isMoXuan(JOB):
        chr.addItemToInventory(1403042,1,"day",90,15) # Fafnir Martial Brace
    elif JobConstants.isKhali(JOB):
        chr.addItemToInventory(1404032,1,"day",90,15) # Fafnir Chakram
    elif JobConstants.isAran(JOB):
        chr.addItemToInventory(1442286,1,"day",90,15) # Fafnir Moon Glaive
    elif JobConstants.isBowMaster(JOB) or JobConstants.isWindArcher(JOB):
        chr.addItemToInventory(1452267,1,"day",90,15) # Fafnir Wind Chaser
    elif JobConstants.isMarksman(JOB) or JobConstants.isWildHunter(JOB):
        chr.addItemToInventory(1462253,1,"day",90,15) # Fafnir Windwing Shooter
    elif JobConstants.isNightLord(JOB) or JobConstants.isNightWalker(JOB):
        chr.addItemToInventory(1472276,1,"day",90,15) # Fafnir Risk Holder
    elif JobConstants.isBuccaneer(JOB) or JobConstants.isThunderBreaker(JOB) or JobConstants.isShade(JOB) or JobConstants.isArk(JOB) or JobConstants.isYeti(JOB):
        chr.addItemToInventory(1482233,1,"day",90,15) # Fafnir Perry Talon
    elif JobConstants.isMechanic(JOB) or JobConstants.isCorsair(JOB):
        chr.addItemToInventory(1492246,1,"day",90,15) # Fafnir Zeliska
    elif JobConstants.isMercedes(JOB):
        chr.addItemToInventory(1522153,1,"day",90,15) # Fafnir Dual Windwing
    elif JobConstants.isCannoneer(JOB):
        chr.addItemToInventory(1532158,1,"day",90,15) # Fafnir Lost Cannon
    elif JobConstants.isHayato(JOB):
        chr.addItemToInventory(1542063,1,"day",90,15) # Fafnir Raven Katana (Tradeable) FUCK NEXON
    elif JobConstants.isKanna(JOB):
        chr.addItemToInventory(1552063,1,"day",90,15) # Fafnir Indigo Fan (Tradeable) FUCK NEXON
    elif JobConstants.isBlaster(JOB):
        chr.addItemToInventory(1582045,1,"day",90,15) # Fafnir Big Mountain
    elif JobConstants.isPathFinder(JOB):
        chr.addItemToInventory(1592035,1,"day",90,15) # Fafnir Ancient Bow

    elif JobConstants.isHero(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302356:# #t1302356:##n#k#l\r\n"
                    "#L1##b#e#i1312214:# #t1312214:##n#k#l\r\n"
                    "#L2##b#e#i1402269:# #t1402269:##n#k#l\r\n"
                    "#L3##b#e#i1412190:# #t1412190:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302356,1,"day",90,15)
        elif sel == 1:
            chr.addItemToInventory(1312214,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1402269,1,"day",90,15)
        elif sel == 3:
            chr.addItemToInventory(1412190,1,"day",90,15)

    elif JobConstants.isPaladin(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302356:# #t1302356:##n#k#l\r\n"
                    "#L1##b#e#i1322265:# #t1322265:##n#k#l\r\n"
                    "#L2##b#e#i1402269:# #t1402269:##n#k#l\r\n"
                    "#L3##b#e#i1422198:# #t1422198:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302356,1,"day",90,15)
        elif sel == 1:
            chr.addItemToInventory(1322265,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1402269,1,"day",90,15)
        elif sel == 3:
            chr.addItemToInventory(1422198,1,"day",90,15)

    elif JobConstants.isDarkKnight(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1432228:# #t1432228:##n#k#l\r\n"
                    "#L2##b#e#i1442286:# #t1442286:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1432228,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1442286,1,"day",90,15)

    elif JobConstants.isDawnWarrior(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1302356:# #t1302356:##n#k#l\r\n"
                    "#L2##b#e#i1402269:# #t1402269:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1302356,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1402269,1,"day",90,15)

    elif JobConstants.isDemonSlayer(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1312214:# #t1312214:##n#k#l\r\n"
                    "#L2##b#e#i1322265:# #t1322265:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1312214,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1322265,1,"day",90,15)

    elif JobConstants.isAdventurerMage(JOB) or JobConstants.isBlazeWizard(JOB) or JobConstants.isEvan(JOB):
        sel = sm.sendNext("Hãy chọn vũ khí nào bạn muốn:\r\n\r\n"
                    "#L0##b#e#i1372238:# #t1372238:##n#k#l\r\n"
                    "#L2##b#e#i1382275:# #t1382275:##n#k#l\r\n")
        if sel == 0:
            chr.addItemToInventory(1372238,1,"day",90,15)
        elif sel == 2:
            chr.addItemToInventory(1382275,1,"day",90,15)
    sm.consumeItem(parentID)
else:
    sm.sendNext("Bạn không đủ ô chứa trong túi EQUIP để nhận thưởng.")