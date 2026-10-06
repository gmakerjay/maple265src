CYGNUS = 1540451
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
def set_Npc():
    if( Job == 1000 or 1100 <= Job <= 1512 or Job == 5000 or 5100 <= Job <= 5112):
        sm.setSpeakerID(CYGNUS)
        sm.setBoxChat()
def Cygnus():    
    JOB = ["Dawn Warrior","Blaze Wizard","Wind Archer","Night Walker","Thunder Breaker"]
    dialog = "#eChoose the Best Job for You."
    for i in range(len(JOB)): 
        dialog += "#L%d# #e%s#l\r\n"%(i,JOB[i])
    selection = sm.sendNext(dialog)
    if selection == 0:
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(1100)  # Dawn Warrior 1st Job
            sm.resetAP(False, 1100)
            sm.giveItem(1402001)  # Wooden Sword (2H)
            sm.giveItem(1142066)
            sm.completeQuestNoRewards(20860)
            sm.completeQuestNoRewards(20861)
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")
            #sm.dispose()
    if selection == 1:
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(1200)  # Blaze Wizard 1st Job
            sm.resetAP(False, 1200)
            sm.giveItem(1382000)  # Wooden Staff
            sm.giveItem(1142066)
            sm.completeQuestNoRewards(20860)
            sm.completeQuestNoRewards(20862)
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")
            #sm.dispose()
    if selection == 2:
        if sm.getEmptyInventorySlots(1)>= 2 and sm.getEmptyInventorySlots(2)>= 1:
            sm.jobAdvance(1300)  # Wind Archer 1st Job
            sm.resetAP(False, 1300)
            sm.giveItem(1452002)  # War Bow
            sm.giveItem(2060000, 1000)  # Bow Arrow
            sm.giveItem(1142066)
            sm.completeQuestNoRewards(20860)
            sm.completeQuestNoRewards(20863)
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your EQUIP and USE inventory.")
            #sm.dispose()
    if selection == 3:
        if sm.getEmptyInventorySlots(1)>= 2 and sm.getEmptyInventorySlots(2)>= 1:
            sm.jobAdvance(1400)  # Night Walker 1st Job
            sm.resetAP(False, 1400)
            sm.giveItem(1472000)  # Garnier
            sm.giveItem(2070000, 500)  # Subi Throwing Stars
            sm.giveItem(1142066)
            sm.completeQuestNoRewards(20860)
            sm.completeQuestNoRewards(20864)
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your EQUIP and USE inventory.")
            #sm.dispose()
    if selection == 4:
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(1500)  # Thunder Breaker 1st Job
            sm.resetAP(False, 1500)
            sm.giveItem(1482000)  # Steel Knuckler
            sm.giveItem(1142066)
            sm.completeQuestNoRewards(20860)
            sm.completeQuestNoRewards(20865)
            #sm.dispose()
        else:
            sm.sendSayOkay("Please make more space in your EQUIP inventory.")
            #sm.dispose()
def Dawn_Warrior_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1110)
            sm.giveItem(1142067)
            sm.completeQuestNoRewards(20870)
            sm.completeQuestNoRewards(20871)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dawn_Warrior_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1111)
            sm.giveItem(1142068)
            sm.completeQuestNoRewards(20880)
            sm.completeQuestNoRewards(20881)
            sm.completeQuestNoRewards(20882)
            sm.completeQuestNoRewards(20883)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Dawn_Warrior_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1112)
            sm.giveItem(1142069)
            sm.completeQuestNoRewards(20890)
            sm.completeQuestNoRewards(20891)
            sm.completeQuestNoRewards(20892)
            sm.completeQuestNoRewards(20893)
            sm.completeQuestNoRewards(20894)
            sm.completeQuestNoRewards(20895)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaze_Wizard_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1210)
            sm.giveItem(1142067)
            sm.completeQuestNoRewards(20870)
            sm.completeQuestNoRewards(20872)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaze_Wizard_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1211)
            sm.giveItem(1142068)
            sm.completeQuestNoRewards(20880)
            sm.completeQuestNoRewards(20881)
            sm.completeQuestNoRewards(20882)
            sm.completeQuestNoRewards(20883)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaze_Wizard_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1212)
            sm.giveItem(1142069)
            sm.completeQuestNoRewards(20890)
            sm.completeQuestNoRewards(20891)
            sm.completeQuestNoRewards(20892)
            sm.completeQuestNoRewards(20893)
            sm.completeQuestNoRewards(20894)
            sm.completeQuestNoRewards(20895)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Wind_Archer_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1310)
            sm.giveItem(1142067)
            sm.completeQuestNoRewards(20870)
            sm.completeQuestNoRewards(20873)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Wind_Archer_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1311)
            sm.giveItem(1142068)
            sm.completeQuestNoRewards(20880)
            sm.completeQuestNoRewards(20881)
            sm.completeQuestNoRewards(20882)
            sm.completeQuestNoRewards(20883)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Wind_Archer_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1312)
            sm.giveItem(1142069)
            sm.completeQuestNoRewards(20890)
            sm.completeQuestNoRewards(20891)
            sm.completeQuestNoRewards(20892)
            sm.completeQuestNoRewards(20893)
            sm.completeQuestNoRewards(20894)
            sm.completeQuestNoRewards(20895)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Night_Walker_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1410)
            sm.giveItem(1142067)
            sm.completeQuestNoRewards(20870)
            sm.completeQuestNoRewards(20874)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Night_Walker_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1411)
            sm.giveItem(1142068)
            sm.completeQuestNoRewards(20880)
            sm.completeQuestNoRewards(20881)
            sm.completeQuestNoRewards(20882)
            sm.completeQuestNoRewards(20883)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Night_Walker_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1412)
            sm.giveItem(1142069)
            sm.completeQuestNoRewards(20890)
            sm.completeQuestNoRewards(20891)
            sm.completeQuestNoRewards(20892)
            sm.completeQuestNoRewards(20893)
            sm.completeQuestNoRewards(20894)
            sm.completeQuestNoRewards(20895)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Thunder_Breaker_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1510)
            sm.giveItem(1142067)
            sm.completeQuestNoRewards(20870)
            sm.completeQuestNoRewards(20875)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Thunder_Breaker_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1511)
            sm.giveItem(1142068)
            sm.completeQuestNoRewards(20880)
            sm.completeQuestNoRewards(20881)
            sm.completeQuestNoRewards(20882)
            sm.completeQuestNoRewards(20883)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Thunder_Breaker_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(1512)
            sm.giveItem(1142069)
            sm.completeQuestNoRewards(20890)
            sm.completeQuestNoRewards(20891)
            sm.completeQuestNoRewards(20892)
            sm.completeQuestNoRewards(20893)
            sm.completeQuestNoRewards(20894)
            sm.completeQuestNoRewards(20895)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mihile_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(5110)
            sm.giveItem(1302038)
            sm.giveItem(1142400)
            sm.completeQuestNoRewards(20806)
            sm.completeQuestNoRewards(20807)
            sm.completeQuestNoRewards(20808)
            sm.completeQuestNoRewards(20809)
            sm.completeQuestNoRewards(20810)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mihile_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("\t#eWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(5111)
            sm.giveItem(1142401)
            sm.completeQuestNoRewards(20320)
            sm.completeQuestNoRewards(20321)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mihile_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(5112)
            sm.giveItem(1142402)
            sm.completeQuestNoRewards(20411)
            sm.completeQuestNoRewards(20412)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
set_Npc()
sm.removeEscapeButton()
if (Job == 1000):
    if (Level >= Req_Level_1stJob):
        Cygnus()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_1stJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1100):
    if (Level >= Req_Level_2ndJob):
        Dawn_Warrior_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1200):
    if (Level >= Req_Level_2ndJob):
        Blaze_Wizard_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1300):
    if (Level >= Req_Level_2ndJob):
        Wind_Archer_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1400):
    if (Level >= Req_Level_2ndJob):
        Night_Walker_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1500):
    if (Level >= Req_Level_2ndJob):
        Thunder_Breaker_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1110):
    if (Level >= Req_Level_3rdJob):
        Dawn_Warrior_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1210):
    if (Level >= Req_Level_3rdJob):
        Blaze_Wizard_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1310):
    if (Level >= Req_Level_3rdJob):
        Wind_Archer_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1410):
    if (Level >= Req_Level_3rdJob):
        Night_Walker_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1510):
    if (Level >= Req_Level_3rdJob):
        Thunder_Breaker_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1111):
    if (Level >= Req_Level_4thJob):
        Dawn_Warrior_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1211):
    if (Level >= Req_Level_4thJob):
        Blaze_Wizard_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1311):
    if (Level >= Req_Level_4thJob):
        Wind_Archer_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1411):
    if (Level >= Req_Level_4thJob):
        Night_Walker_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 1511):
    if (Level >= Req_Level_4thJob):
        Thunder_Breaker_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 5100):
    if (Level >= Req_Level_2ndJob):  
        Mihile_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 5110):
    if (Level >= Req_Level_3rdJob):
        Mihile_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 5111):
    if (Level >= Req_Level_4thJob):
        Mihile_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 5112 or Job == 1112 or Job == 1212 or Job == 1312 or Job == 1412 or Job == 1512):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
