MELANGE = 3003654

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#Hm.. Do you feel that? The #rmoon#k is getting closer.")
sm.setPlayerBoxChat()
sm.sendNext("Are you serious? Is... is that a thing that can happen?")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#Eh... Let's have a look at the next memory first.")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#You need to hunt #bDark Executor x200#k."):
    sm.startQuest(34584)