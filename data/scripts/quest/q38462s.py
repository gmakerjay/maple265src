# [Daily Quest] Peace in Arcana
import time

TREE_SPIRITS = 3003322
reqMob = 500

sm.setSpeakerID(TREE_SPIRITS)
sm.sendNext("You hear the whispers of the Tree Spirits on the gentle breeze. They seem to need your help once again.")
sm.setPlayerAsSpeaker()
sm.sendSay("I hear them too... What is happening?")
sm.setSpeakerID(TREE_SPIRITS)
sm.sendSay("Please help restore balance and harmony to the forest of Arcana around the Spirit Tree.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.hasQuestCompleted(37871): # [Esfera] Mirrors in Mirrors
        reqMob = 100
    elif sm.hasQuestCompleted(34272): # [Morass] The Swamp Remains
        reqMob = 300
    if sm.sendAskAccept("Hello! I have a task for you today. Defeat " + str(reqMob) + " monsters in the #bArcana#k area."):
        sm.completeQuestNoRewards(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.removeQuest(38463)
        sm.removeQuest(38464)
        sm.removeQuest(38465)
        if reqMob == 100:
            sm.startQuestNoCheck(38463)
        elif reqMob == 300:
            sm.startQuestNoCheck(38464)
        else:
            sm.startQuestNoCheck(38465)
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(TREE_SPIRITS)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
