sm.setSpeakerID(3003125)
sm.sendNext("The extinction Zone is much more dangerous than any place you've ever encountered.")
sm.sendSay("Never let your guard down, no matter what, if you touch the flames here, you body will vanish forever. There is a safe path through...")
if sm.sendAskYesNo("But first promise me that you won't do anything this reckless again, and that you will follow my instructions. Can you do that? "):
    sm.sendNext("You can trust in me. I'll guide you and Kao to safety. Let me know when you're ready to go.")
    sm.startQuest(parentID)