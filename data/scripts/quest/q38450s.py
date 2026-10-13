# [Daily Quest] Vanishing Journey Research
import time

RONA = 3003104
reqMob = 500

sm.setSpeakerID(RONA)
sm.sendNext("The Vanishing Journey is a mysterious place where everything seems to be in a constant state of decay.")
sm.setPlayerAsSpeaker()
sm.sendSay("What's going on?")
sm.setSpeakerID(RONA)
sm.sendSay("Help the Guardians of Time in their research by completing the request given each day.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(34331): # [Lachelein] Decisive Battle
        reqMob = 100
    elif sm.hasQuestCompleted(34218): # [Chu Chu] Goodbye, Chu Chu Island
        reqMob = 300
    if sm.sendAskAccept("Hello! I have an investigation request for today. Defeat " + str(reqMob) + " enemies in the #bVanishing Journey#k area."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38451)
        sm.removeQuest(38452)
        sm.removeQuest(38453)
        if reqMob == 100:
            sm.startQuest(38451)
        elif reqMob == 300:
            sm.startQuest(38452)
        else:
            sm.startQuest(38453)
        sm.setSpeakerID(RONA)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(RONA)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(RONA)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")