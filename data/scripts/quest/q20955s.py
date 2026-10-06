# Character field ID when accessed: 240010000
# ObjectID: 0
# ParentID: 20955
NPC = 1064022
MASTERY_LEVEL = 30
sm.removeEscapeButton()
sm.setSpeakerID(NPC)
sm.setBoxChat()
sm.sendNext("I almost forgot. I had something to give you.")
sm.sendNext("This will help you protect the Empress. Now I leave in search of answers. May fortune and blessings oe upon you.")
if (sm.getChr().getJob() == 1112):
    #chr.setMasterySkillLevel(11121000,30)
    sm.giveSkill(11121000, 0, 30)
    
elif (sm.getChr().getJob() == 1212):
    #chr.setMasterySkillLevel(12121000,30)
    sm.giveSkill(12121000, 0, 30)
    
elif (sm.getChr().getJob() == 1312):
    #chr.setMasterySkillLevel(13121000,30)
    sm.giveSkill(13121000, 0, 30)
    
elif (sm.getChr().getJob() == 1412):
    #chr.setMasterySkillLevel(14121000,30)
    sm.giveSkill(14121000, 0, 30)
    
elif (sm.getChr().getJob() == 1512):
    #chr.setMasterySkillLevel(15121000,30)
    sm.giveSkill(15121000, 0, 30)
sm.completeQuestNoRewards(parentID)