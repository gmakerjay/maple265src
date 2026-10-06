Angel = 9201428

sm.setSpeakerID(Angel)
sm.sendNext("#v3800858#\r\nHere's your first mission, recruit. It's a search and rescue of a scout we sent to eastern Blackgate.")

sm.setPlayerAsSpeaker()
sm.sendSay("You sure you want to send a recruit to save a recruit?")

sm.setSpeakerID(Angel)
sm.sendSay("#v3800859#\r\nDon't question your orders! We don't have the time. Our best officers need to hold the main defense lines.")

if sm.sendAskYesNo("But I'm sure you can slip into the central area and find our man!"):
    sm.setPlayerAsSpeaker()
    sm.sendNext("Okay, I get it.\r\nMaybe through the ourskirts...")
    sm.startQuest(parentID)