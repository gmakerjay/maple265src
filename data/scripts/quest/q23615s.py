# Character field ID when accessed: 310040000
# ObjectID: 0
# ParentID: 23615
STEPHAN = 2153000    
sm.removeEscapeButton()
    sm.setPlayerBoxChat()
if sm.sendAskYesNo("The guard is approaching. Seems like he felt something... Maybe I should try dissembling him."):
    sm.sendNext("There's nothing I should be afraid of. I just have to talk to him composedly. I just have to autohypnosis myself. I'm a Black Wing. I'm a Black Wing...")
    if not sm.isEquipped(1003134):
        sm.setSpeakerID(STEPHAN)
        sm.setBoxChat()   
        sm.sendNext("Where is your hat?")
    else:
        sm.warp(931060030)
        sm.startQuest(parentID)