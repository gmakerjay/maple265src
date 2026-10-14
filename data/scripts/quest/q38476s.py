# [Daily Quest] Limina Research
import time

VELIVAH = 3003810
reqMob = 100

sm.setSpeakerID(VELIVAH)
sm.sendNext("There you are!")
sm.setPlayerAsSpeaker()
sm.sendSay("What's going on, Velivah?")
sm.setSpeakerID(VELIVAH)
sm.sendSay("We received a request from the Guardians of Time. They want us to conduct #bresearch on Limina#k.")
sm.setPlayerAsSpeaker()
sm.sendSay("Research?")
sm.setSpeakerID(VELIVAH)
sm.sendSay("Yes! This research involves #rhunting monsters#k to examine the changes taking place across the area.")
if sm.sendAskAccept("It would be wonderful if you could help us, #h0#. Of course, we'll provide rewards that you will find very useful."):
    if sm.sendAskAccept("Hello! I have an investigation order for today. Defeat " + str(reqMob) + " monsters in the #bLimina#k area."):
        sm.startQuest(parentID)
        sm.setQRValueByKey(parentID, "date", time.strftime("%y/%m/%d"))
        sm.setSpeakerID(VELIVAH)
        sm.sendNext("Please return to me once you have finished the mission. Don't forget to report back #r#ebefore midnight#n#k!\r\nCurrent time is #r#e" + str(sm.getCurrentTime()) + "#k.")
    else:
        sm.setSpeakerID(VELIVAH)
        sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
else:
    sm.setSpeakerID(VELIVAH)
    sm.sendNext("It looks like you're not ready yet. Please let me know when you're ready.")
