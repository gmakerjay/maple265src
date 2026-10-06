Choy = 9201429

sm.setSpeakerID(Choy)
sm.sendNext("Still, thanks for coming out to find me. Unfortunately, I can't leave yet. I have a mission to complete.")
sm.sendSay("#v3800848#\r\nI've been tracking the demons, and I need to report back on their movements, but my communication device is broken.")
if sm.sendAskYesNo("#v4034508# #v4034509# #v4034510#\r\nCan you take out some of the demons nearby and look for parts for the device?"):
    sm.sendNext("Thanks! You seem pretty reliable. Ah, maybe I should say that after you finish.")
    sm.startQuest(parentID)