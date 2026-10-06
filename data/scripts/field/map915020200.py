# ParentID: 915020200
# ObjectID: 0
# Character field ID when accessed: 915020200
GUARDIOSO = 1403002
GUARDIOSO_MOB = 9001047
CHECK = 0
if chr.getJob()== 2411:
    if not sm.hasMobsInField() and CHECK == 0:
        sm.removeNpc(2159462)
        sm.lockInGameUI(True, False)
        sm.spawnNpc(GUARDIOSO,254,182)
        sm.removeEscapeButton()

        sm.setPlayerBoxChat()
        sm.sendNext("(I spent a fortune on that G?adioso, but it seems to have warded off any would-be poachers.)")
        sm.sendNext("Open the door.")

        sm.setSpeakerID(GUARDIOSO)
        sm.setBoxChat()    
        sm.sendNext("Voice... Check...")

        sm.setPlayerBoxChat()
        sm.sendNext("I thought you were faster. Are you getting rusty?")

        sm.setSpeakerID(GUARDIOSO)
        sm.setBoxChat()    
        sm.sendNext("Itruder! Intruder! Shifting to battle mode! Destroy the intruder!")

        sm.setPlayerBoxChat()
        sm.sendNext("W-what? Hey. what's wrong with you?! I own you!")

        sm.setSpeakerID(GUARDIOSO)
        sm.setBoxChat()    
        sm.sendNext("Intruder elimination in progress!")

        sm.setPlayerBoxChat()
        sm.sendNext(" Hey! Stop it!")

        sm.setSpeakerID(GUARDIOSO)
        sm.setBoxChat()    
        sm.sendNext("ELIMINATE!")

        sm.spawnMob(GUARDIOSO_MOB,254,182,False)

        CHECK = 1
        sm.removeNpc(GUARDIOSO)
        sm.lockInGameUI(False, False)