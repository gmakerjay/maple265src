if sm.getFieldID() == 931000020:
    sm.setBoxChat()
    sm.sendSayOkay("It's been...a really long time since I've been outside the laboratory.")
    #sm.dispose()
sm.setBoxChat()    
sm.sendNext("Whoa. Wh-what happened? The glass is broken... Did that vibration earlier break it?")

sm.setPlayerBoxChat()
sm.sendSay("Now, there's nothing stopping you right? Let's get out of here!")

sm.resetParam()
sm.setBoxChat()
sm.sendSay("But...")

sm.setPlayerBoxChat()
sm.sendSay("Do you WANT to stay here or something?")

sm.resetParam()
sm.setBoxChat()
sm.sendSay("Of course not!")

sm.setPlayerBoxChat()
sm.sendSay("Then hurry up! Let's go!")

sm.warp(931000020, 1)