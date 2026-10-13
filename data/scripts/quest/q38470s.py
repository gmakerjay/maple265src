# [Daily Quest] Esfera Research Orders
import time

OLLIE = 3003530
reqMob = 500

sm.setSpeakerID(OLLIE)
sm.sendNext("There you are!")
sm.setPlayerAsSpeaker()
sm.sendSay("What's going on, Ollie?")
sm.setSpeakerID(OLLIE)
sm.sendSay("We received orders from Command. They want us to conduct #bresearch on Esfera#k.")
sm.setPlayerAsSpeaker()
sm.sendSay("Research?")
sm.setSpeakerID(OLLIE)
sm.sendSay("Yes! This research involves #rhunting monsters#k to examine changes in the region.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(35731) or sm.hasQuestCompleted(36772): # [Labyrinth of Suffering] Source of Suffering
        reqMob = 100
    elif sm.hasQuestCompleted(35632): # [Moonbridge] Clear Path
        reqMob = 300
    if sm.sendAskAccept("Hello! I have an investigation order for today. Defeat " + str(reqMob) + " monsters in the #bEsfera#k area."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38471)
        sm.removeQuest(38472)
        sm.removeQuest(38473)
        if reqMob == 100:
            sm.startQuest(38471)
        elif reqMob == 300:
            sm.startQuest(38472)
        else:
            sm.startQuest(38473)
        sm.setSpeakerID(OLLIE)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(OLLIE)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(OLLIE)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")