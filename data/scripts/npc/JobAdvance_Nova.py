NOVA = 9201535
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
def set_Npc():
    if (Job == 6000 or 6100 <= Job <= 6112):
        sm.setSpeakerID(NOVA)
        sm.setBoxChat()
def Kaiser_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(6110)
            sm.giveItem(1142485)
            sm.completeQuestNoRewards(25710)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Kaiser_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(6111)
            sm.giveItem(1142486)
            sm.completeQuestNoRewards(25711)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Kaiser_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(6112)
            sm.giveItem(1142487)
            sm.completeQuestNoRewards(25712)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
set_Npc()
sm.removeEscapeButton()
if (Job == 6100):
    if (Level >= Req_Level_2ndJob):
        Kaiser_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 6110):
    if (Level >= Req_Level_3rdJob):
        Kaiser_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 6111):
    if (Level >= Req_Level_4thJob):
        Kaiser_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 6112):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
