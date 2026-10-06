ARAN = 1540802
MERCEDES = 1540801
SHADE = 1540806
EVAN = 1540805
LUMINOUS = 1540804
PHANTOM = 1540803
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
def set_Npc():
    if (Job == 2000 or 2100 <= Job <= 2112):
        sm.setSpeakerID(ARAN)
        sm.setBoxChat()
    if (Job == 2001 or 2210 <= Job <= 2218):
        sm.setSpeakerID(EVAN)
        sm.setBoxChat()
    if (Job == 2002 or 2300 <= Job <= 2312):
        sm.setSpeakerID(MERCEDES)
        sm.setBoxChat()
    if (Job == 2003 or 2400 <= Job <= 2412):
        sm.setSpeakerID(PHANTOM)
        sm.setBoxChat()
    if (Job == 2005 or 2500 <= Job <= 2512):
        sm.setSpeakerID(SHADE)
        sm.setBoxChat()
    if (Job == 2004 or 2700 <= Job <= 2712):
        sm.setSpeakerID(LUMINOUS)
        sm.setBoxChat()
def Aran_1stJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.removeSkill(20000297)
            sm.jobAdvance(2100)
            sm.giveItem(1142129)
            sm.resetAP(False, 2100)
            sm.removeSkill(20001296)
            sm.giveSkill(20001296)
            sm.completeQuestNoRewards(21101)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Aran_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2110)
            sm.giveItem(1142130)
            sm.completeQuestNoRewards(21200)
            sm.completeQuestNoRewards(21201)
            sm.completeQuestNoRewards(21202)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Aran_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2111)
            sm.giveItem(1142131)
            sm.completeQuestNoRewards(21300)
            sm.completeQuestNoRewards(21301)
            sm.completeQuestNoRewards(21302)
            sm.completeQuestNoRewards(21303)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP and USE inventory.")
            #sm.dispose()
    
def Aran_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2112)
            sm.giveItem(1142132)
            sm.completeQuestNoRewards(21400)
            sm.completeQuestNoRewards(21401)
            sm.openAranSkillGuide()
            #sm.addPopUpSay(ARAN, 10000, "#Text", "FarmSE.img/boxResult")
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
    
def Evan_1stJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvance(2210)
        #sm.dispose()
    
def Evan_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvance(2212)
        #sm.dispose()
    
def Evan_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2214)
            sm.giveItem(1142156)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Evan_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2218)
            sm.giveItem(1142157)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mercedes_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2310)
            sm.giveItem(1142337)
            sm.completeQuestNoRewards(24010)
            sm.completeQuestNoRewards(24011)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mercedes_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2311)
            sm.giveItem(1142338)
            sm.completeQuestNoRewards(24012)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Mercedes_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2312)
            sm.giveItem(1142339)
            sm.completeQuestNoRewards(24013)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Phantom_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2410)
            sm.giveItem(1142376)
            sm.completeQuestNoRewards(25100)
            sm.completeQuestNoRewards(25101)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Phantom_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2411)
            sm.giveItem(1142377)
            sm.completeQuestNoRewards(25110)
            sm.completeQuestNoRewards(25111)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Phantom_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2412)
            sm.giveItem(1142378)
            sm.completeQuestNoRewards(25120)
            sm.completeQuestNoRewards(25121)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Shade_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvance(2510)
            #sm.giveItem(1142672)
        sm.completeQuestNoRewards(38028)
        sm.completeQuestNoRewards(38029)
        sm.completeQuestNoRewards(38030)
        #sm.dispose()
       
    
def Shade_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvance(2511)
            #sm.giveItem(1142672)
        sm.completeQuestNoRewards(38074)
        sm.completeQuestNoRewards(38075)
        sm.completeQuestNoRewards(38076)
        #sm.dispose()
    
def Shade_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        sm.jobAdvance(2512)
            #sm.giveItem(1142672)
        sm.completeQuestNoRewards(38072)
        sm.completeQuestNoRewards(38073)
        #sm.dispose()
    
# LuMINOUS
def Luminous_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(2)>= 1 and sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2710)
            sm.giveItem(1142480)
            sm.giveItem(2430874)
            sm.completeQuestNoRewards(25510)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP and USE inventory.")
            #sm.dispose()
    
def Luminous_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2711)
            sm.giveItem(1142481)
            sm.completeQuestNoRewards(25511)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Luminous_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(2712)
            sm.giveItem(1142482)
            sm.completeQuestNoRewards(25512)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
set_Npc()
sm.removeEscapeButton()
if (Job == 2000):
    if (Level >= Req_Level_1stJob):
        Aran_1stJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_1stJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2100):
    if (Level >= Req_Level_2ndJob):
        Aran_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2110):
    if (Level >= Req_Level_3rdJob):
        Aran_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2111):
    if (Level >= Req_Level_4thJob):
        Aran_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2001):
    if (Level >= Req_Level_1stJob):
        Evan_1stJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_1stJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2210):
    if (Level >= Req_Level_2ndJob):
        Evan_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2212):
    if (Level >= Req_Level_3rdJob):
        Evan_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2214):
    if (Level >= Req_Level_4thJob):
        Evan_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2300):
    if (Level >= Req_Level_2ndJob):
        Mercedes_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2310):
    if (Level >= Req_Level_3rdJob):
        Mercedes_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2311):
    if (Level >= Req_Level_4thJob):
        Mercedes_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
        
if (Job == 2400):
    if (Level >= Req_Level_2ndJob):
        Phantom_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2410):
    if (Level >= Req_Level_3rdJob):
        Phantom_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2411):
    if (Level >= Req_Level_4thJob):
        Phantom_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2500):
    if (Level >= Req_Level_2ndJob):
        Shade_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2510):
    if (Level >= Req_Level_3rdJob):
        Shade_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2511):
    if (Level >= Req_Level_4thJob):
        Shade_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()

if (Job == 2700):
    if (Level >= Req_Level_2ndJob):
        Luminous_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2710):
    if (Level >= Req_Level_3rdJob):
        Luminous_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2711):
    if (Level >= Req_Level_4thJob):
        Luminous_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 2112 or Job == 2218 or Job == 2312 or Job == 2512 or Job == 2412 or Job == 2712):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
