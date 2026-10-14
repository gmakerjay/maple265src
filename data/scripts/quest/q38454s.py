# [Daily Quest] Chu Chu's Finest Cuisine
import time

MASTER_LYCK = 3003152
reqMob = 500

sm.setSpeakerID(MASTER_LYCK)
sm.sendNext("Please help me cook some delicious cuisine to treat everyone here on Chu Chu Island!")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(34478): # [Arcana] The Harmony of the Forest
        reqMob = 100
    elif sm.hasQuestCompleted(34331): # [Lachelein] Decisive Battle
        reqMob = 300
    if sm.sendAskAccept("Hello! I have a task for you today. Defeat " + str(reqMob) + " monsters in the #bChu Chu Island#k area."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38455)
        sm.removeQuest(38456)
        sm.removeQuest(38457)
        if reqMob == 100:
            sm.startQuest(38455)
        elif reqMob == 300:
            sm.startQuest(38456)
        else:
            sm.startQuest(38457)
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(MASTER_LYCK)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
