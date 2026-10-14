# [Daily Quest] Save the Morass
import time

JEAN = 3003432
reqMob = 500

sm.setSpeakerID(JEAN)
sm.sendNext("Oh #h0#, I've been looking everywhere for you! I have something I need your help with...")
sm.setPlayerAsSpeaker()
sm.sendSay("What's going on, Jean?")
sm.setSpeakerID(JEAN)
sm.sendSay("Please help us protect #bMorass#k so the Swamp of Memory doesn't become just a memory itself.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(35632): # [Moonbridge] Clear Path
        reqMob = 100
    elif sm.hasQuestCompleted(37871): # [Esfera] Mirrors in Mirrors
        reqMob = 300
    if sm.sendAskAccept("Hello! Please help me defeat " + str(reqMob) + " monsters in the #bMorass#k area."):
        sm.completeQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38467)
        sm.removeQuest(38468)
        sm.removeQuest(38469)
        if reqMob == 100:
            sm.startQuest(38467)
        elif reqMob == 300:
            sm.startQuest(38468)
        else:
            sm.startQuest(38469)
        sm.setSpeakerID(JEAN)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(JEAN)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(JEAN)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
