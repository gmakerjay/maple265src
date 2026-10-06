
KINESIS_M = 1531000
KINESIS_F = 1531052
Job = sm.getChr().getJob()
Level = chr.getLevel()
Req_Level_1stJob = 10
Req_Level_2ndJob = 30
Req_Level_3rdJob = 60
Req_Level_4thJob = 100
def set_Npc():
    if (Job == 14000 or 14200 <= Job <= 14212):
        if chr.getAvatarData().getAvatarLook().getGender() == 0:
            sm.setSpeakerID(KINESIS_M)
            sm.setBoxChat()
        if chr.getAvatarData().getAvatarLook().getGender() == 1:
            sm.setSpeakerID(KINESIS_F)
            sm.setBoxChat()
def Kinesis_2ndJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(14210)
            sm.giveItem(1142864)
            sm.completeQuestNoRewards(22770)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Kinesis_3rdJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(14211)
            sm.giveItem(1142865)
            sm.completeQuestNoRewards(22800)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    
def Kinesis_4thJob():
    sm.flipSpeaker()
    if sm.sendAskYesNo("#e\tWould you like to skip the Job Advanced Quest(s)?"):
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.jobAdvance(14212)
            sm.giveItem(1142866)
            sm.completeQuestNoRewards(22850)
            #sm.dispose()
        else:
            sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
            #sm.dispose()
    

set_Npc()
sm.removeEscapeButton()
if (Job == 14200):
    if (Level >= Req_Level_2ndJob):
        Kinesis_2ndJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_2ndJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 14210):
    if (Level >= Req_Level_3rdJob):
        Kinesis_3rdJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_3rdJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 14211):
    if (Level >= Req_Level_4thJob):
        Kinesis_4thJob()
    else:
        sm.flipSpeaker()
        req = "#eThis jobs require the player to be at least level #r%s#k prior to advancement" %(Req_Level_4thJob)
        sm.sendSayOkay(req)
        #sm.dispose()
if (Job == 14212):
    sm.flipSpeaker()
    sm.sendSayOkay("#eYou may not advance at the current state.")
