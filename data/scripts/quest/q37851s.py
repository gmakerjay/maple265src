# [Esfera] The Beginning of the End
# Quest 37851 (Start)
# Jean (3003406)

JEAN = 3003406

quests_classic = list(range(34561, 34586))
quests_streamlined = list(range(37851, 37872))

sm.setSpeakerID(JEAN)
sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(3) >= 1:
        for qid in quests_classic:
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        for qid in quests_streamlined:
            sm.startQuestNoCheck(qid)
            sm.completeQuestNoRewards(qid)
        sm.completeQuestNoRewards(34773)
        sm.giveSymbol(1712006, 1, 37871)
        sm.giveItem(2438411, 1)
        sm.giveItem(3018045, 1)
        sm.createQuestWithQRValue(34560, "30=h1;31=h1;32=h1;33=h1;40=h0;41=h0;42=h0;44=h0;45=h0;46=h0;47=h0;48=h0;49=h0;50=h0;51=h0;52=h0;53=h0;54=h0;55=h0;56=h0;57=h0;58=h0;77=h0;78=h0;79=h0;80=h0")
        sm.createQuestWithQRValue(37900, "01=h1")
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Esfera prequests and received your #b#i1712006# #z1712006##k!")
        sm.warp(450007040)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot each in your EQUIP, USE, and SETUP inventories.")
else:
    sm.setBoxChat()
    sm.sendNext("#face0##h0#! We have a problem! Where are you? You need to come to Morass Coral Colony right away.")
    sm.setPlayerBoxChat()
    sm.sendNext("What's going on?")
    sm.setSpeakerID(JEAN)
    sm.setBoxChat()
    sm.sendNext("#face0#Some suspicious figures are lingering around Coral Colony.")
    sm.sendNext("#face0#I think they are looking for signs of disturbed Erda caused by outside travelers.")
    sm.sendNext("#face0#They might not be dangerous, but you should speak with them before any trouble starts. I cannot leave Trueffet right now due to my unstable physical condition.")
    if sm.sendAskYesNo("#face0#At this rate, they will reach Trueffet soon. Please hurry!\r\n#b(Accepting will move you to Abandoned Area.)#k"):
        sm.setPlayerBoxChat()
        sm.sendNext("#b#eCutscene skipped.#n#k")
        sm.startQuest(37851)
        sm.completeQuest(37851)
        sm.createQuestWithQRValue(34560, "40=h1;77=h1;78=h1")
        sm.warp(450006330)
    else:
        sm.setSpeakerID(3003502) # Ollie
        sm.setBoxChat()
        sm.sendNext("#face0#Speak to me again whenever you are ready.")