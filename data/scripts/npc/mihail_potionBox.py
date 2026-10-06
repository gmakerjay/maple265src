# General Store Attic (913070010)
sm.lockInGameUI(True,False)  
sm.removeEscapeButton()
# Constants
QUEST = 20031
ITEM1 = 4033194
ITEM2 = 4033195
sm.setBoxChat()
if (not sm.hasQuest(QUEST) or (sm.hasItem(ITEM1) or sm.hasItem(ITEM2))):
    sm.sendSayOkay("I'd better get back downstairs with the potion box before old-man Limbert's heart finally explodes with rage.")
    sm.lockInGameUI(False,False)
    #sm.dispose()
else:
    if sm.sendAskYesNo("All these potions are disgusting! Should we even be selling them?\r\nTake the Potion Box?"):
        sm.giveItem(ITEM1)
        sm.giveItem(ITEM2)
        sm.sendNext("Is this a letter? Must be held together by all the dust...\r\n From 'Chromile'... It doesn't say who it's for... Maybe Limbert will want it.")
        sm.lockInGameUI(False,False)
        #sm.dispose()
    else:
        sm.sendNext("This has gotta be the box...")
        sm.lockInGameUI(False,False) 
        #sm.dispose()