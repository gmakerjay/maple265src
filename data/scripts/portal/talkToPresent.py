# Gate of the Present | Three Doors (270000000)
if sm.hasQuest(1466) or sm.hasQuestCompleted(1466):
    sm.setSpeakerID(1520021)
    sm.flipDialogue()
    if sm.sendNext("At the center of the Temple of Time stands an enormous door, the Gate of the Present.\r\n\r\n#b#L0#Step through into the Arcane River.#l#k") == 0:
        sm.warp(450001003)
else:
    sm.chat("The Gate of the Present looms in the middle of the Temple of Time.")