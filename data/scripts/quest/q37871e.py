# [Esfera] Mirrors in Mirrors (End)
# Quest 37871
# Exit NPC (3003559)

EXIT_NPC = 3003559

sm.setSpeakerID(EXIT_NPC)
sm.sendNext("The mirror within the mirror has shattered. Take the Arcane Symbol of Esfera and prepare for the final battle.")
if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(3) >= 1:
    sm.completeQuest(37871)
    sm.giveSymbol(1712006, 1, 37871)
    sm.giveItem(2438411, 1)
    sm.giveItem(3018045, 1)
    sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
    sm.createQuestWithQRValue(37900, "01=h1")
    sm.warp(450007040)
else:
    sm.sendSayOkay("Please ensure you have at least 1 empty slot each in your EQUIP, USE, and SETUP inventories.")
