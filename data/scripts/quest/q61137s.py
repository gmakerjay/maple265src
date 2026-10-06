# ParentID: 61137
# ObjectID: 0
Inferno = 9201433

sm.setSpeakerID(Inferno)
sm.sendNext("Demons pledge to the First that they will not trife with the mortal world.")
sm.sendSay("#v3800861#\r\nThose demons that disobey the pact must answer to the demon knights. These fools here in Blackgate must be dealt with.")
if sm.sendAskYesNo("You. Mortal. Will you aid the demon knights in punishing those keo have disobeyed the First?"):
    sm.setPlayerAsSpeaker()
    sm.sendNext("Um, sure.")
    sm.setSpeakerID(Inferno)
    sm.sendSay("Then make your way to the heart of their camp and annihilate them.")
    sm.startQuest(parentID)