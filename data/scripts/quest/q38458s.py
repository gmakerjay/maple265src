# [Daily Quest] A Night's Peace in Lachelein
import time

GRAY_MASK = 3003209
reqMob = 500

sm.setSpeakerID(GRAY_MASK)
sm.sendNext("I am growing weary of the never-ending festival here in Lachelein.")
sm.setPlayerAsSpeaker()
sm.sendSay("I hear you... What is going on?")
sm.setSpeakerID(GRAY_MASK)
sm.sendSay("To bring peace to this city of endless festivals, please help me bring some quiet to Lachelein, the Dreaming City.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(34272): # [Morass] The Swamp Remains
        reqMob = 100
    elif sm.hasQuestCompleted(34478): # [Arcana] The Harmony of the Forest
        reqMob = 300
    if sm.sendAskAccept("Hello! I have a task for you today. Defeat " + str(reqMob) + " monsters in the #bLachelein#k area."):
        sm.completeQuestNoRewards(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38459)
        sm.removeQuest(38460)
        sm.removeQuest(38461)
        if reqMob == 100:
            sm.startQuestNoCheck(38459)
        elif reqMob == 300:
            sm.startQuestNoCheck(38460)
        else:
            sm.startQuestNoCheck(38461)
        sm.setSpeakerID(GRAY_MASK)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(GRAY_MASK)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(GRAY_MASK)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
