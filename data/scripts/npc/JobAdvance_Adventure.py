EXPLORER = 2470018
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
Req_Level_DualBlade_1 = 20
Req_Level_DualBlade_2 = 45
DualBlade = chr.getAvatarData().getCharacterStat().getSubJob()
sm.flipSpeaker()
def set_Npc():
    if (Job == 000 or 100 <= Job <= 132 or 200 <= Job <= 232 or 300 <= Job <= 322 or 400 <= Job <= 434 or 500 <= Job <= 532 or DualBlade == 1 ):
        sm.setSpeakerID(EXPLORER)
        sm.setBoxChat()
def Dual_Blade_1_1():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvanceForDB(430)
            sm.giveItem(1342000)
            sm.completeQuestNoRewards(2622)
            sm.completeQuestNoRewards(2623)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dual_Blade_2_1():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvanceForDB(431)
            sm.giveItem(1142108)
            sm.completeQuestNoRewards(2637)
            sm.completeQuestNoRewards(2638)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dual_Blade_2_2():#45
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvanceForDB(432)
        sm.completeQuestNoRewards(2641)
        sm.completeQuestNoRewards(2642)
        #sm.dispose()
    
def Dual_Blade_3_0():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvanceForDB(433)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1441)
            sm.completeQuestNoRewards(1443)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dual_Blade_4_0():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvanceForDB(434)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1456)
            sm.completeQuestNoRewards(1457)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Hero_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(110)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1410)
        sm.completeQuestNoRewards(1411)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()

def Paladin_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(120)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1410)
        sm.completeQuestNoRewards(1412)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()

def Dark_Knight_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(130)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1410)
        sm.completeQuestNoRewards(1413)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Fire_Poison_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(210)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1414)
        sm.completeQuestNoRewards(1415)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Ice_Lightning_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(220)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1414)
        sm.completeQuestNoRewards(1416)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Bishop_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(230)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1414)
        sm.completeQuestNoRewards(1417)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Bow_Master_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(310)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1418)
        sm.completeQuestNoRewards(1419)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Marksman_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(320)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1418)
        sm.completeQuestNoRewards(1420)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Night_Lord_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(410)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1421)
        sm.completeQuestNoRewards(1422)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Shadower_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(420)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1421)
        sm.completeQuestNoRewards(1423)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
#def Dual_Blade_2ndJob():

def Buccaneer_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(510)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1424)
        sm.completeQuestNoRewards(1425)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Conrsair_2ndJob():
    if sm.getEmptyInventorySlots(1)>= 1:
        sm.jobAdvance(520)
        sm.giveItem(1142108)
        sm.completeQuestNoRewards(1424)
        sm.completeQuestNoRewards(1426)
        #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()
def Cannoneer_2ndJob():
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(530)
            sm.giveItem(1142108)
            sm.completeQuestNoRewards(1427)
            sm.completeQuestNoRewards(1428)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Hero_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(111)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1430)
            sm.completeQuestNoRewards(1431)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Paladin_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(121)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1430)
            sm.completeQuestNoRewards(1432)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dark_Knight_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(131)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1430)
            sm.completeQuestNoRewards(1433)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Fire_Poison_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(211)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1434)
            sm.completeQuestNoRewards(1435)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Ice_Lightning_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(221)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1434)
            sm.completeQuestNoRewards(1436)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Bishop_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(231)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1434)
            sm.completeQuestNoRewards(1437)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Bow_Master_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(311)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1438)
            sm.completeQuestNoRewards(1439)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Marksman_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(321)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1438)
            sm.completeQuestNoRewards(1440)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Night_Lord_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(411)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1441)
            sm.completeQuestNoRewards(1442)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Shadower_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(421)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1441)
            sm.completeQuestNoRewards(1443)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Buccaneer_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(511)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1444)
            sm.completeQuestNoRewards(1445)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Conrsair_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(521)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1444)
            sm.completeQuestNoRewards(1446)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Cannoneer_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(531)
            sm.giveItem(1142109)
            sm.completeQuestNoRewards(1444)
            sm.completeQuestNoRewards(1448)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Hero_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(112)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1450)
            sm.completeQuestNoRewards(1451)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Paladin_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(122)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1450)
            sm.completeQuestNoRewards(1451)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dark_Knight_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(132)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1450)
            sm.completeQuestNoRewards(1451)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Fire_Poison_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(212)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1452)
            sm.completeQuestNoRewards(1453)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Ice_Lightning_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(222)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1452)
            sm.completeQuestNoRewards(1453)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Bishop_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(232)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1452)
            sm.completeQuestNoRewards(1453)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Bow_Master_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(312)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1454)
            sm.completeQuestNoRewards(1455)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Marksman_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(322)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1454)
            sm.completeQuestNoRewards(1455)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Night_Lord_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(412)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1456)
            sm.completeQuestNoRewards(1457)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Shadower_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(422)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1456)
            sm.completeQuestNoRewards(1457)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Buccaneer_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(512)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1458)
            sm.completeQuestNoRewards(1459)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Conrsair_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(522)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1458)
            sm.completeQuestNoRewards(1459)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Cannoneer_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(532)
            sm.giveItem(1142110)
            sm.completeQuestNoRewards(1458)
            sm.completeQuestNoRewards(1459)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
set_Npc()
sm.removeEscapeButton()
if (Job == 100):
    if (Level >= Req_Level_2ndJob):
        sm.flipSpeaker()
        if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Fighter","Page","Spearman"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                Hero_2ndJob()
            if selection == 1:
                Paladin_2ndJob()
            if selection == 2:
                Dark_Knight_2ndJob()
        else:
            #sm.dispose()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 200):
    if (Level >= Req_Level_2ndJob):
        sm.flipSpeaker()
        if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Fire-Posion Wizard","Ice-Lightning Wizard","Cleric"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                Fire_Poison_2ndJob()
            if selection == 1:
                Ice_Lightning_2ndJob()
            if selection == 2:
                Bishop_2ndJob()
        else:
            #sm.dispose()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 300):
    if (Level >= Req_Level_2ndJob):
        sm.flipSpeaker()
        if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Hunter","CrossBowman"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                Bow_Master_2ndJob()
            if selection == 1:
                Marksman_2ndJob()
        else:
            #sm.dispose()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 400 and DualBlade == 0):
    if (Level >= Req_Level_2ndJob):
        sm.flipSpeaker()
        if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Assassin","Bandit"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                Night_Lord_2ndJob()
            if selection == 1:
                Shadower_2ndJob()
        else:
            #sm.dispose()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 500):
    if (Level >= Req_Level_2ndJob):
        sm.flipSpeaker()
        if sm.sendAskYesNo("#eWould you like to skip the tutorial questline and select job?"):
            JOB = ["Brawler","Gunslinger"]
            dialog = "#eChoose the Best Job for You.\r\n"
            for i in range(len(JOB)): 
                dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
            selection = sm.sendNext(dialog)
            if selection == 0:
                Buccaneer_2ndJob()
            if selection == 1:
                Conrsair_2ndJob()
        else:
            #sm.dispose()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 501):
    if (Level >= Req_Level_2ndJob):
        Cannoneer_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 110):
    if (Level >= Req_Level_3rdJob):
        Hero_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 120):
    if (Level >= Req_Level_3rdJob):
        Paladin_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 130):
    if (Level >= Req_Level_3rdJob):
        Dark_Knight_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 210):
    if (Level >= Req_Level_3rdJob):
        Fire_Poison_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 220):
    if (Level >= Req_Level_3rdJob):
        Ice_Lightning_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 230):
    if (Level >= Req_Level_3rdJob):
        Bishop_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 310):
    if (Level >= Req_Level_3rdJob):
        Bow_Master_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 320):
    if (Level >= Req_Level_3rdJob):
        Marksman_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 410):
    if (Level >= Req_Level_3rdJob):
        Night_Lord_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 420):
    if (Level >= Req_Level_3rdJob):
        Shadower_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 510):
    if (Level >= Req_Level_3rdJob):
        Buccaneer_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 520):
    if (Level >= Req_Level_3rdJob):
        Conrsair_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 530):
    if (Level >= Req_Level_3rdJob):
        Cannoneer_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 111):
    if (Level >= Req_Level_4thJob):
        Hero_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 121):
    if (Level >= Req_Level_4thJob):
        Paladin_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 131):
    if (Level >= Req_Level_4thJob):
        Dark_Knight_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 211):
    if (Level >= Req_Level_4thJob):
        Fire_Poison_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 221):
    if (Level >= Req_Level_4thJob):
        Ice_Lightning_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 231):
    if (Level >= Req_Level_4thJob):
        Bishop_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 311):
    if (Level >= Req_Level_4thJob):
        Bow_Master_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 321):
    if (Level >= Req_Level_4thJob):
        Marksman_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 411):
    if (Level >= Req_Level_4thJob):
        Night_Lord_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 421):
    if (Level >= Req_Level_4thJob):
        Shadower_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 511):
    if (Level >= Req_Level_4thJob):
        Buccaneer_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 521):
    if (Level >= Req_Level_4thJob):
        Conrsair_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 531):
    if (Level >= Req_Level_4thJob):
        Cannoneer_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if ( DualBlade == 1 and Job == 400):
    if (Level >= Req_Level_DualBlade_1):
        Dual_Blade_1_1()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_DualBlade_1)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 430):
    if (Level >= Req_Level_2ndJob):
        Dual_Blade_2_1()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 431):
    if (Level >= Req_Level_DualBlade_2):
        Dual_Blade_2_2()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_DualBlade_2)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 432):
    if (Level >= Req_Level_3rdJob):
        Dual_Blade_3_0()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 433):
    if (Level >= Req_Level_4thJob):
        Dual_Blade_4_0()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 112 or Job == 122 or Job == 132 or Job == 212 or Job == 222 or Job == 232 or Job == 312 or Job == 322 or Job == 412 or Job == 422 or Job == 434 or Job == 512 or Job == 522 or Job == 532):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
