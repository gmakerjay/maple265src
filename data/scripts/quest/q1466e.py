sm.setSpeakerID(2140001)
sm.flipDialogue()
if sm.sendNext("So, how was it facing those monsters?\r\n\r\n#b#L0#They're stronger than expected. I don't think I can take them alone.#l#k") == 0:
    sm.flipDialogue()
    sm.sendNext("Of course... The power of the body and the power of the soul are different. Without #bArcane Power#k, you stand no chance against the threats that lie ahead. And only one tapped into the Erda Flow can wield true #bArcane Power#k.")
    sm.flipDialogue()
    if sm.sendNext("But there is a way. You can forge the Erda within you into the shape of an #bArcane Symbol#k.\r\n\r\n#b#L0#Arcane Symbol?#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will give you the most basic symbol for now. It won't be complete at first. But after you gain enough experience there, #bthe symbol will grow more elaborate, and you will able to enhance its power#k. Don't rush the process... it will happen in time.\r\n#i1712000##b#t1712000# x1#k")
        if sm.getEmptyInventorySlots(1)>= 1:
            sm.giveSymbol(1712000, 1, 1466)
            sm.progressMessageFont("will deal more damage to monsters in the Arcane River with the Arcane Symbol equip")
            sm.completeQuestNoRewards(1466)
        else:
            sm.systemMessage("Make sure you have enough space in your inventory..")