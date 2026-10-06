# [The Afterlands] A Cry for Help
from net.swordie.ms.constants import JobConstants

Senior = 9400200
JOB = chr.getJob()

sm.setSpeakerID(Senior)
sm.flipDialogue()
sm.sendNext("Hello! is anybody out there?")

sm.flipDialogue()
sm.sendSay("Can anybody hear me...?")

sm.setPlayerAsSpeaker()
sm.sendSay("#bWho are you? Where are you?#k")

sm.setSpeakerID(Senior)
sm.flipDialogue()
sm.sendSay("Somebody please help me! #eIs there anyone?#n")

sm.setPlayerAsSpeaker()
if sm.sendAskAccept("#b(I don't think he can hear me. He sounds pretty distressed. I'd better follow his voice.)#k"):
    sm.setPlayerAsSpeaker()
    sm.sendNext("(No, I shouldn't ignore people when they're in distress!)")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)
    
    # [The Afterlands] The Old Man's Request | SKIPPED
    if JobConstants.isAdventurerArcher(int(JOB)) == True or JobConstants.isMercedes(int(JOB)) == True or 1300<=int(JOB)<=1312 or 3300<=int(JOB)<=3312:
        sm.startQuest(63021)
        sm.completeQuest(63021)
    elif JobConstants.isAdventurerWarrior(int(JOB)) == True or JobConstants.isKaiser(int(JOB)) == True or JobConstants.isAran(int(JOB)) == True or JobConstants.isDemon(int(JOB)) == True or 1100 <= int(JOB) <= 1112 or 3700 <= int(JOB) <= 3712 or 5100 <= int(JOB) <= 5112 or 4100 <= int(JOB) <= 4112:
        sm.startQuest(63022)
        sm.completeQuest(63022)
    elif JobConstants.isAdventurerMage(int(JOB)) == True or JobConstants.isEvan(int(JOB)) == True or JobConstants.isLuminous(int(JOB)) == True or JobConstants.isKinesis(int(JOB)) == True or 4200<=int(JOB)<=4212 or int(JOB) == 4002 or 3200<=int(JOB)<=3212 or 1200<=int(JOB)<=1212:
        sm.startQuest(63023)
        sm.completeQuest(63023)
    else:
        sm.startQuest(63024)
        sm.completeQuest(63024)

    sm.startQuest(63025)
    sm.completeQuest(63025)
    sm.warp(867113101)