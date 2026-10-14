# [Esfera] Mirrors in Mirrors (End)
# Quest 34585
# Will's Mirror Room Exit (3003559)

EXIT_NPC = 3003559

sm.setSpeakerID(EXIT_NPC)
if sm.getEmptyInventorySlots(1) >= 1:
    sm.sendNext("Will has been defeated, but the ritual could not be prevented. We must return to the Base Camp and prepare for the final battle with the Black Mage.")
    sm.completeQuest(34585)
    sm.giveSymbol(1712006, 1, 34585)
    sm.warp(450007040)
else:
    sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
