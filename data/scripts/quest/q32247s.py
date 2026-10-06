Rondo = 1520001

sm.setSpeakerID(Rondo)
sm.sendNext("Mumble...mumble...")

sm.setPlayerAsSpeaker()
sm.sendSay("Excuse me.")

sm.setSpeakerID(Rondo)
sm.sendSay("Mumble...mumble...")

sm.setPlayerAsSpeaker()
sm.sendSay("Excuse me.")

sm.sendSay("There's a Suspicious Person wearing a hat in front of the Interdimensional Portal. He looks totally out of it, like he doesn't even hear you. You can't get into the portal with him the way...")

if sm.sendAskYesNo("Tapping on his shoulder doesn't seem to faze him.\r\nMaybe try hitting him harder?"):
    sm.startQuest(32247)
    sm.completeQuest(32247)
    sm.setSpeakerID(Rondo)
    sm.sendNext("My hat! WHY DID YOU TOUCH MY HAT?!")
    
    sm.setPlayerAsSpeaker()
    sm.sendSay("Oh, hats within hats? Clever.")
    
    sm.setSpeakerID(Rondo)
    sm.sendNext("Argh, you've ruined everything! I can't be seen like this. Gotta hide!")
else:
    sm.setPlayerAsSpeaker()
    sm.sendNext("Wait, that's a terrible idea! How rude are you? Instead...")
    
    