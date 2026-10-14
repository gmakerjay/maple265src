# [Esfera] Mirrors in Mirrors (Start)
# Quest 37871
# Melange (3003501)

MELANGE = 3003501

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#I think I finally know everything I need to know.")
sm.sendNext("#face0#At this rate, the power of the #r#eTranscendents from two worlds#n#k will fuse. Facing a force of that magnitude would be hopeless.")
sm.setPlayerBoxChat()
sm.sendNext("...")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#The door Tana mentioned will lead us to another Mirror World inside the Mirror World.")
sm.sendNext("#face0#I cannot fight in his Mirror World, so I can only advise you from here.")
sm.setPlayerBoxChat()
if sm.sendAskYesNo("Looks like this is it. I'm going in."):
    sm.setSpeakerID(MELANGE)
    sm.setBoxChat()
    sm.sendNext("#face0#You'll still be able to hear my voice, so I'll guide you as much as I can.")
    sm.setPlayerBoxChat()
    sm.sendNext("(Enter the mirror and face Commander Will.)")
    sm.sendNext("#b#eCutscene skipped.#n#k")
    if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(3) >= 1:
        sm.startQuest(37871)
        sm.completeQuest(37871)
        sm.giveSymbol(1712006, 1, 37871)
        sm.giveItem(2438411, 1)
        sm.giveItem(3018045, 1)
        sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
        sm.createQuestWithQRValue(37900, "01=h1")
        sm.warp(450007040)
    else:
        sm.setSpeakerID(MELANGE)
        sm.setBoxChat()
        sm.sendNext("Please ensure you have at least 1 empty slot each in your EQUIP, USE, and SETUP inventories.")
else:
    sm.sendNext("#face0#(Hmm... Perhaps you need a little more time to prepare?)")