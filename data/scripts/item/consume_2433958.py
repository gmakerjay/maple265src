# Character field ID when accessed: 240010500
# ObjectID: 0
# ParentID: 2433958
from net.swordie.ms.constants import JobConstants
ITEM = 2433958
NPC = 9010048
REQ_LEVEL = 60
#WARRIOR:
#-WEAPON
SWORD_1H = 1302041
SWORD_2H = 1402011
POLE_ARM = 1442033
AXE_1H = 1312009
KATANA = 1542005
DESPERADO = 1232004
ARM_CANNON = 1582003
#-ARMOR
WARRIOR_GEAR_MALE = [1002029,1072149,1082059,1040091,1060080]
WARRIOR_GEAR_FEMALE = [1002029,1072149,1082059,1041092,1061091]
#______________________________________________________________
#MAGICAL:
#-WEAPON
SHINING_ROD = 1212004
STAFF = 1382113
FAN = 1552005
PHYS_LIMIT = 1262003
#-ARMOR
MAGICAL_GEAR_MALE = [1002243,1072139,1082086,1050053]
MAGICAL_GEAR_FEMALE = [1002243,1072139,1082086,1051044]
#______________________________________________________________
#ARCHER:
#-WEAPON
BOW = 1452004
XBOW = 1462026
DUAL_XBOW = 1522008
#-ARMOR
ARCHER_GEAR_MALE = [1002270,1072144,1082090,1050058]
ARCHER_GEAR_FEMALE = [1002270,1072144,1082090,1051042]
#______________________________________________________________
#THIEF:
#-WEAPON
WHIP_BLADE = 1242004
DAGGER = 1332017
KATARA = 1342004
CANE = 1362009
CLAW = 1472022
#-ARMOR
THIEF_GEAR_MALE = [1002249,1072152,1082093,1040100,1060089]
THIEF_GEAR_FEMALE = [1002249,1072152,1082093,1041096,1061095]
#______________________________________________________________
#PIRATE:
#-WEAPON
GUN = 1492008
KNUCK = 1482008
HAND_CANNON = 1532008
SOUL_SHOOTER = 1222004
#-ARMOR
PIRATE_GEAR_MALE = [1002634,1072306,1082201,1052712]
PIRATE_GEAR_FEMALE = [1002634,1072306,1082201,1052712]


JOB = chr.getJob()
GENDER = chr.getAvatarData().getAvatarLook().getGender() 

def check_show_item():
    dialog = "#r#eCongratulations on #h0# reaching Level Requirement#n#k\r\n#eWe'll give you some equipment "
    #WARRIOR
    if JobConstants.isAdventurerWarrior(int(JOB)) == True or JobConstants.isKaiser(int(JOB)) == True or JobConstants.isAran(int(JOB)) == True or JobConstants.isDemon(int(JOB)) == True or 1100 <= int(JOB) <= 1112 or 3700 <= int(JOB) <= 3712 or 5100 <= int(JOB) <= 5112 or 4100 <= int(JOB) <= 4112:
        dialog += "of Warrior.#n\r\n\r\n"
        #WEAPON
        if int(JOB) == 100 or 110<=int(JOB)<= 122 or 5100<=int(JOB)<=5112:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (SWORD_1H,SWORD_1H)
        elif int(JOB) == 4001 or 4100 <= int(JOB) <= 4112:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (KATANA,KATANA)
        elif int(JOB) == 3100 or int(JOB) == 3110 or int(JOB) == 3111 or int(JOB) == 3112:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (AXE_1H,AXE_1H)
        elif int(JOB) == 3101 or int(JOB) == 3120 or int(JOB) == 3121 or int(JOB) == 3122:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (DESPERADO,DESPERADO)
        elif int(JOB) == 2000 or 2100<=int(JOB)<=2112 or 130<=int(JOB)<=132:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (POLE_ARM,POLE_ARM)
        elif int (JOB) == 6000 or 6100<=int(JOB)<=6112 or 1100<=int(JOB)<=1112:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (SWORD_2H,SWORD_2H)
        elif 3700 <= int(JOB) <= 3712:
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (ARM_CANNON,ARM_CANNON)
        #ARMOR_MALE
        if int(GENDER) == 0:
            for i in range(len(WARRIOR_GEAR_MALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (WARRIOR_GEAR_MALE[i],WARRIOR_GEAR_MALE[i])
        #ARMOR_FEMALE
        if int(GENDER) == 1:
            for i in range(len(WARRIOR_GEAR_FEMALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (WARRIOR_GEAR_FEMALE[i],WARRIOR_GEAR_FEMALE[i])
    #MAGICAL    
    if JobConstants.isAdventurerMage(int(JOB)) == True or JobConstants.isEvan(int(JOB)) == True or JobConstants.isLuminous(int(JOB)) == True or JobConstants.isKinesis(int(JOB)) == True or 4200<=int(JOB)<=4212 or int(JOB) == 4002 or 3200<=int(JOB)<=3212 or 1200<=int(JOB)<=1212 :
        dialog += "of Magical.#n\r\n\r\n"
        #WEAPON
        if JobConstants.isAdventurerMage(int(JOB)) == True or JobConstants.isEvan(int(JOB)) == True or 3200<=int(JOB)<=3212 or 1200<=int(JOB)<=1212:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (STAFF,STAFF)
        elif JobConstants.isLuminous(int(JOB)) == True:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (SHINING_ROD,SHINING_ROD)
        elif JobConstants.isKinesis(int(JOB)) == True:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (PHYS_LIMIT,PHYS_LIMIT)
        elif 4200<=int(JOB)<=4212 or int(JOB) == 4002:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (FAN,FAN)
        #ARMOR_MALE
        if int(GENDER) == 0:
            for i in range(len(MAGICAL_GEAR_MALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (MAGICAL_GEAR_MALE[i],MAGICAL_GEAR_MALE[i])
        #ARMOR_FEMALE
        if int(GENDER) == 1:
            for i in range(len(MAGICAL_GEAR_FEMALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (MAGICAL_GEAR_FEMALE[i],MAGICAL_GEAR_FEMALE[i])
            
    #ARCHER
    if JobConstants.isAdventurerArcher(int(JOB)) == True or JobConstants.isMercedes(int(JOB)) == True or 1300<=int(JOB)<=1312 or 3300<=int(JOB)<=3312:
        dialog += "of Archer.#n\r\n\r\n"
        #WEAPON
        if int(JOB) == 300:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (BOW,BOW)  
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (XBOW,XBOW)
        elif 310<=int(JOB)<=312 or 1300<=int(JOB)<=1312:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (BOW,BOW)
        elif 320<=int(JOB)<=322 or 3300<=int(JOB)<=3312:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (XBOW,XBOW)
        elif JobConstants.isMercedes(int(JOB)) == True:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (DUAL_XBOW,DUAL_XBOW)
        #ARMOR_MALE
        if int(GENDER) == 0:
            for i in range(len(ARCHER_GEAR_MALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (ARCHER_GEAR_MALE[i],ARCHER_GEAR_MALE[i])
        #ARMOR_FEMALE
        if int(GENDER) == 1:
            for i in range(len(ARCHER_GEAR_FEMALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (ARCHER_GEAR_FEMALE[i],ARCHER_GEAR_FEMALE[i])
    #THIEF
    if JobConstants.isAdventurerThief(int(JOB)) == True or 3600<=int(JOB)<=3612 or 1400<=int(JOB)<=1412 or int(JOB) == 2003 or 2400<=int(JOB)<=2412:
        dialog += "of Thief.#n\r\n\r\n"
        #WEAPON
        if int(JOB) == 400:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (CLAW,CLAW)
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (DAGGER,DAGGER)
        if 410<=int(JOB)<=412 or 1400<=int(JOB)<1412:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (CLAW,CLAW)
        elif 420<=int(JOB)<=422:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (DAGGER,DAGGER)
        elif 430<=int(JOB)<= 434:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (DAGGER,DAGGER)
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (KATARA,KATARA)
        elif int(JOB) == 2003 or 2400<=int(JOB)<=2412:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (CANE,CANE)
        elif 3600<=int(JOB)<=3612:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (WHIP_BLADE,WHIP_BLADE)
        #ARMOR_MALE
        if int(GENDER) == 0:
            for i in range(len(THIEF_GEAR_MALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (THIEF_GEAR_MALE[i],THIEF_GEAR_MALE[i])
        #ARMOR_FEMALE
        if int(GENDER) == 1:
            for i in range(len(THIEF_GEAR_FEMALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (THIEF_GEAR_FEMALE[i],THIEF_GEAR_FEMALE[i])
    #PIRATE:
    if JobConstants.isAdventurerPirate(int(JOB)) == True or 1500<=int(JOB)<=1512 or 3500<=int(JOB)<=3512 or int(JOB) == 6001 or 6500<=int(JOB)<=6512 or int(JOB) == 2005 or 2500<=int(JOB)<=2512 or 570<=int(JOB)<=572 or int(JOB) == 508:
        dialog += "of Pirate.#n\r\n\r\n"
        #WEAPON
        if int(JOB) == 500:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (GUN,GUN)
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (KNUCK,KNUCK)
        elif 510<=int(JOB)<=512 or 570<=int(JOB)<=572 or int(JOB) == 508 or 3500<=int(JOB)<=3512:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (GUN,GUN)
        elif 520<=int(JOB)<=522 or 2500<=int(JOB)<=2512 or int(JOB) == 2005:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (KNUCK,KNUCK)
        elif int(JOB) == 501 or 530<=int(JOB)<532:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (HAND_CANNON,HAND_CANNON)
        elif int(JOB) == 6001 or 6500<=int(JOB)<=6512:
            dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (SOUL_SHOOTER,SOUL_SHOOTER)
        #ARMOR_MALE
        if int(GENDER) == 0:
            for i in range(len(PIRATE_GEAR_MALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (PIRATE_GEAR_MALE[i],PIRATE_GEAR_MALE[i])
        #ARMOR_FEMALE
        if int(GENDER) == 1:
            for i in range(len(PIRATE_GEAR_FEMALE)):
                dialog += "#b#e#z%s##n#k\t #i%s#\r\n" % (PIRATE_GEAR_FEMALE[i],PIRATE_GEAR_FEMALE[i])

    if sm.sendAskAccept(dialog):
        gain_item()
        sm.consumeItem(ITEM)
        
def gain_item():
    warrior_gain_item()
    magical_gain_item()
    archer_gain_item()
    thief_gain_item()
    pirate_gain_item()
def pirate_gain_item():
    if int(JOB) == 500:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(GUN)
                sm.giveItem(KNUCK)
                for i in range(len(PIRATE_GEAR_MALE)):
                    sm.giveItem(PIRATE_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(GUN)
                sm.giveItem(KNUCK)
                for i in range(len(PIRATE_GEAR_FEMALE)):
                    sm.giveItem(PIRATE_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 510<=int(JOB)<=512 or 570<=int(JOB)<=572 or int(JOB) == 508 or 3500<=int(JOB)<=3512:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(GUN)
                for i in range(len(PIRATE_GEAR_MALE)):
                    sm.giveItem(PIRATE_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(GUN)
                for i in range(len(PIRATE_GEAR_FEMALE)):
                    sm.giveItem(PIRATE_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif int(JOB) == 501 or 530<=int(JOB)<532:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(HAND_CANNON)
                for i in range(len(PIRATE_GEAR_MALE)):
                    sm.giveItem(PIRATE_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(HAND_CANNON)
                for i in range(len(PIRATE_GEAR_FEMALE)):
                    sm.giveItem(PIRATE_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif int(JOB) == 6001 or 6500<=int(JOB)<=6512:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(SOUL_SHOOTER)
                for i in range(len(PIRATE_GEAR_MALE)):
                    sm.giveItem(PIRATE_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(SOUL_SHOOTER)
                for i in range(len(PIRATE_GEAR_FEMALE)):
                    sm.giveItem(PIRATE_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    
def thief_gain_item():
    if int(JOB) == 400:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 7:
                sm.giveItem(CLAW)
                sm.giveItem(DAGGER)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 7:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 7:
                sm.giveItem(CLAW)
                sm.giveItem(DAGGER)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 7:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 410<=int(JOB)<=412 or 1400<=int(JOB)<1412:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(CLAW)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(CLAW)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 420<=int(JOB)<=422:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(DAGGER)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(DAGGER)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 430<=int(JOB)<= 434:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 7:
                sm.giveItem(DAGGER)
                sm.giveItem(KATARA)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 7:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 7:
                sm.giveItem(DAGGER)
                sm.giveItem(KATARA)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 7:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif int(JOB) == 2003 or 2400<=int(JOB)<=2412:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(CANE)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(CANE)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 3600<=int(JOB)<=3612:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(WHIP_BLADE)
                for i in range(len(THIEF_GEAR_MALE)):
                    sm.giveItem(THIEF_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(WHIP_BLADE)
                for i in range(len(THIEF_GEAR_FEMALE)):
                    sm.giveItem(THIEF_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
def archer_gain_item():
    if int(JOB) == 300:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(BOW)
                sm.giveItem(XBOW)
                for i in range(len(ARCHER_GEAR_MALE)):
                    sm.giveItem(ARCHER_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(BOW)
                sm.giveItem(XBOW)
                for i in range(len(ARCHER_GEAR_FEMALE)):
                    sm.giveItem(ARCHER_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 310<=int(JOB)<=312 or 1300<=int(JOB)<=1312:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(BOW)
                for i in range(len(ARCHER_GEAR_MALE)):
                    sm.giveItem(ARCHER_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(BOW)
                for i in range(len(ARCHER_GEAR_FEMALE)):
                    sm.giveItem(ARCHER_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 320<=int(JOB)<=322 or 3300<=int(JOB)<=3312:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(XBOW)
                for i in range(len(ARCHER_GEAR_MALE)):
                    sm.giveItem(ARCHER_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(XBOW)
                for i in range(len(ARCHER_GEAR_FEMALE)):
                    sm.giveItem(ARCHER_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 320<=int(JOB)<=322 or 3300<=int(JOB)<=3312:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(DUAL_XBOW)
                for i in range(len(ARCHER_GEAR_MALE)):
                    sm.giveItem(ARCHER_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(DUAL_XBOW)
                for i in range(len(ARCHER_GEAR_FEMALE)):
                    sm.giveItem(ARCHER_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
def magical_gain_item():
    if JobConstants.isAdventurerMage(int(JOB)) == True or JobConstants.isEvan(int(JOB)) == True or 3200<=int(JOB)<=3212 or 1200<=int(JOB)<=1212:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(STAFF)
                for i in range(len(MAGICAL_GEAR_MALE)):
                    sm.giveItem(MAGICAL_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(STAFF)
                for i in range(len(MAGICAL_GEAR_FEMALE)):
                    sm.giveItem(MAGICAL_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif JobConstants.isLuminous(int(JOB)) == True:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(SHINING_ROD)
                for i in range(len(MAGICAL_GEAR_MALE)):
                    sm.giveItem(MAGICAL_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(SHINING_ROD)
                for i in range(len(MAGICAL_GEAR_FEMALE)):
                    sm.giveItem(MAGICAL_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif JobConstants.isKinesis(int(JOB)) == True:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(PHYS_LIMIT)
                for i in range(len(MAGICAL_GEAR_MALE)):
                    sm.giveItem(MAGICAL_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(PHYS_LIMIT)
                for i in range(len(MAGICAL_GEAR_FEMALE)):
                    sm.giveItem(MAGICAL_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 4200<=int(JOB)<=4212 or int(JOB) == 4002:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(FAN)
                for i in range(len(MAGICAL_GEAR_MALE)):
                    sm.giveItem(MAGICAL_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 5:
                sm.giveItem(FAN)
                for i in range(len(MAGICAL_GEAR_FEMALE)):
                    sm.giveItem(MAGICAL_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 5:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    
def warrior_gain_item():
    if int(JOB) == 100 or 110<=int(JOB)<= 122 or 5100<=int(JOB)<=5112:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(SWORD_1H)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(SWORD_1H)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.") 

    elif int(JOB) == 4001 or 4100 <= int(JOB) <= 4112:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(KATANA)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(KATANA)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.") 

    elif int(JOB) == 3100 or int(JOB) == 3110 or int(JOB) == 3111 or int(JOB) == 3112:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(AXE_1H)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(AXE_1H)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.") 

    elif int(JOB) == 3101 or int(JOB) == 3120 or int(JOB) == 3121 or int(JOB) == 3122:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(DESPERADO)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(DESPERADO)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.") 


    elif int(JOB) == 2000 or 2100<=int(JOB)<=2112 or 130<=int(JOB)<=132:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(POLE_ARM)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(POLE_ARM)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")

    elif int (JOB) == 6000 or 6100<=int(JOB)<=6112 or 1100<=int(JOB)<=1112:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(SWORD_2H)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(SWORD_2H)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
    elif 3700 <= int(JOB) <= 3712:
        if int(GENDER) == 0:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(ARM_CANNON)
                for i in range(len(WARRIOR_GEAR_MALE)):
                    sm.giveItem(WARRIOR_GEAR_MALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")  
        elif int(GENDER) == 1:
            if sm.getEmptyInventorySlots(1)>= 6:
                sm.giveItem(ARM_CANNON)
                for i in range(len(WARRIOR_GEAR_FEMALE)):
                    sm.giveItem(WARRIOR_GEAR_FEMALE[i])
            elif not sm.getEmptyInventorySlots(1)>= 6:
                sm.sendSayOkay("Please make more space in your EQUIP inventory.")
                
sm.setSpeakerID(NPC)
sm.flipDialogue()
sm.flipSpeaker()
if chr.getLevel() >= int(REQ_LEVEL):
    check_show_item()
elif chr.getLevel() < int(REQ_LEVEL):
    CHECK_LEVEL = chr.getLevel()
    CHECK_LEVEL_DIALOG = "Your level is #r%d#k.\r\nYou need #r%d#k level more!" %(int(CHECK_LEVEL),(int(REQ_LEVEL)-int(CHECK_LEVEL)))
    sm.sendSayOkay(CHECK_LEVEL_DIALOG)
    