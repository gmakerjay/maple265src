# [Lachelein] Festival of Dreams
# Quest 34300 (Start)

sel = sm.sendAskMenu("Would you like to experience the storyline or skip the prequests and receive your Arcane Symbol immediately?\r\n\r\n#L0##bExperience the storyline#k#l\r\n#L1##rSkip the prequests and receive your Arcane Symbol immediately#k#l")
if sel == 1:
    if sm.getEmptyInventorySlots(1) >= 1:
        for qid in range(34300, 34332):
            sm.startQuest(qid)
            sm.completeQuest(qid)
        sm.completeQuest(34377)
        sm.giveSymbol(1712003, 1, 34331)
        chr.initDailyQuestSymbol()
        sm.sendSayOkay("You have skipped the Lachelein prequests and received your #b#i1712003# #z1712003##k!")
        sm.warp(450003000)
    else:
        sm.sendSayOkay("Please make sure you have at least 1 empty slot in your EQUIP inventory.")
else:
    sm.startQuest(34300)
    sm.setSpeakerType(3)
    sm.setParam(2)
    sm.sendSayOkay("There are humans in the Arcane River? I should talk to them.")
    sm.setParam(4)
    sm.setSpeakerID(3003225) # Rabbit Mask
    sm.sendNext("I'm happy, HAPPY I tell you!")
    sm.createQuestWithQRValue(34300, "NpcSpeech=30032251")
    sm.setSpeakerID(3003226) # Cat Mask
    sm.sendNext("Fireworks, dancing, the sound of rushing water... I'm so excited!")
    sm.createQuestWithQRValue(34300, "NpcSpeech=30032251/30032262")
    sm.setSpeakerID(3003227) # Flutist Mask
    sm.sendNext("Ha ha ha. Come, celebrate with me!")
    sm.setParam(2)
    sm.sendSay("This place is strange... Why is everyone wearing masks?")
    sm.createQuestWithQRValue(34300, "NpcSpeech=30032251/30032262/30032273")
