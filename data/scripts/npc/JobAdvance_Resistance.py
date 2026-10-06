CLAUDIN = 1540452
MECHANIC = 1540613
BATTLE_MAGE = 1540640
WILD_HUNTER = 1540612
DEMON = 9400073
XENON = 1540452
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
def set_Npc():
    if (3200 <= Job <= 3212):
        sm.setSpeakerID(BATTLE_MAGE)
        sm.setBoxChat()
    if (3300 <= Job <= 3312):
        sm.setSpeakerID(WILD_HUNTER)
        sm.setBoxChat()
    if (3500 <= Job <= 3512):
        sm.setSpeakerID(MECHANIC)
        sm.setBoxChat()
    if (3700 <= Job <= 3712):
        sm.setSpeakerID(CLAUDIN)
        sm.setBoxChat()
    if (Job == 3002 or 3600 <= Job <= 3612):
        sm.setSpeakerID(XENON)
        sm.setBoxChat()
    if (3100 <= Job <= 3112 or 3120 <= Job <= 3122):
        sm.setSpeakerID(DEMON)
        sm.setBoxChat()
def BattleMage_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3210)
            sm.giveItem(1142243)
            sm.completeQuestNoRewards(23020)
            sm.completeQuestNoRewards(23023)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def BattleMage_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3211)
            sm.giveItem(1142244)
            sm.completeQuestNoRewards(23030)
            sm.completeQuestNoRewards(23033)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def BattleMage_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3212)
            sm.giveItem(1142245)
            sm.completeQuestNoRewards(23040)
            sm.completeQuestNoRewards(23043)
            sm.completeQuestNoRewards(23046)
            sm.completeQuestNoRewards(23049)
            sm.completeQuestNoRewards(23052)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def WildHunter_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3310)
            sm.giveItem(1142243)
            sm.completeQuestNoRewards(23021)
            sm.completeQuestNoRewards(23024)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def WildHunter_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3311)
            sm.giveItem(1142244)
            sm.completeQuestNoRewards(23031)
            sm.completeQuestNoRewards(23034)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def WildHunter_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3312)
            sm.giveItem(1142245)
            sm.completeQuestNoRewards(23041)
            sm.completeQuestNoRewards(23044)
            sm.completeQuestNoRewards(23047)
            sm.completeQuestNoRewards(23050)
            sm.completeQuestNoRewards(23053)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mechanic_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3510)
            sm.giveItem(1142243)
            sm.completeQuestNoRewards(23022)
            sm.completeQuestNoRewards(23025)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mechanic_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3511)
            sm.giveItem(1142244)
            sm.completeQuestNoRewards(23032)
            sm.completeQuestNoRewards(23035)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mechanic_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3512)
            sm.giveItem(1142245)
            sm.completeQuestNoRewards(23042)
            sm.completeQuestNoRewards(23045)
            sm.completeQuestNoRewards(23048)
            sm.completeQuestNoRewards(23051)
            sm.completeQuestNoRewards(23054)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaster_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3710)
            sm.giveItem(1142243)
            sm.completeQuestNoRewards(23161)
            sm.completeQuestNoRewards(23162)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaster_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3711)
            sm.giveItem(1142244)
            sm.completeQuestNoRewards(23163)
            sm.completeQuestNoRewards(23164)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Blaster_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3712)
            sm.giveItem(1142245)
            sm.completeQuestNoRewards(23165)
            sm.completeQuestNoRewards(23166)
            sm.completeQuestNoRewards(23167)
            sm.completeQuestNoRewards(23168)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Xenon_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3610)
            sm.giveItem(1142576)
            sm.completeQuestNoRewards(23610)
            sm.completeQuestNoRewards(23611)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Xenon_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3611)
            sm.giveItem(1142577)
            sm.completeQuestNoRewards(23612)
            sm.completeQuestNoRewards(23613)
            sm.completeQuestNoRewards(23614)
            sm.completeQuestNoRewards(23615)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Xenon_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(3612)
            sm.giveItem(1142578)
            sm.completeQuestNoRewards(23616)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonSlayer_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3110)
            sm.giveItem(1142342)
            sm.giveAndEquip(1099002) 
            sm.completeQuestNoRewards(23210)
            sm.completeQuestNoRewards(23211)
            sm.completeQuestNoRewards(23212)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonSlayer_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3111)
            sm.giveItem(1142343)
            sm.giveAndEquip(1099003) 
            sm.completeQuestNoRewards(23213)
            sm.completeQuestNoRewards(23214)
            sm.addQRValue(23206, "1")
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonSlayer_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3112)
            sm.giveItem(1142344)
            sm.giveAndEquip(1099004) 
            sm.completeQuestNoRewards(23215)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonAvenger_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3120)
            sm.giveItem(1142554)
            sm.giveAndEquip(1099007) 
            sm.completeQuestNoRewards(23210)
            sm.completeQuestNoRewards(23211)
            sm.completeQuestNoRewards(23212)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonAvenger_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3121)
            sm.giveItem(1142555)
            sm.giveAndEquip(1099008) 
            sm.completeQuestNoRewards(23213)
            sm.completeQuestNoRewards(23218)
            sm.addQRValue(23206, "1")
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def DemonAvenger_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(3122)
            sm.giveItem(1142556)
            sm.giveAndEquip(1099009) 
            sm.completeQuestNoRewards(23221)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
set_Npc()
sm.removeEscapeButton()
if (Job == 3200):
    if (Level >= Req_Level_2ndJob):
        BattleMage_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3210):
    if (Level >= Req_Level_3rdJob):
        BattleMage_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3211):
    if (Level >= Req_Level_4thJob):
        BattleMage_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3300):
    if (Level >= Req_Level_2ndJob):
        WildHunter_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3310):
    if (Level >= Req_Level_3rdJob):
        WildHunter_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3311):
    if (Level >= Req_Level_4thJob):
        WildHunter_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3500):
    if (Level >= Req_Level_2ndJob):
        Mechanic_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3510):
    if (Level >= Req_Level_3rdJob):
        Mechanic_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3511):
    if (Level >= Req_Level_4thJob):
        Mechanic_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3700):
    if (Level >= Req_Level_2ndJob):
        Blaster_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3710):
    if (Level >= Req_Level_3rdJob):
        Blaster_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3711):
    if (Level >= Req_Level_4thJob):
        Blaster_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3600):
    if (Level >= Req_Level_2ndJob):
        Xenon_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3610):
    if (Level >= Req_Level_3rdJob):
        Xenon_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3611):
    if (Level >= Req_Level_4thJob):
        Xenon_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3100):
    if (Level >= Req_Level_2ndJob):
        DemonSlayer_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3110):
    if (Level >= Req_Level_3rdJob):
        DemonSlayer_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3111):
    if (Level >= Req_Level_4thJob):
        DemonSlayer_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3101):
    if (Level >= Req_Level_2ndJob):
        DemonAvenger_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3120):
    if (Level >= Req_Level_3rdJob):
        DemonAvenger_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3121):
    if (Level >= Req_Level_4thJob):
        DemonAvenger_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 3122 or Job == 3112 or Job == 3612 or Job == 3712 or Job == 3512 or Job == 3312 or Job == 3212):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
