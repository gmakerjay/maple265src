# Echoes of the Mysterious Voice
# Auto-pick Explorer 4th job NPC by job + gender

explorer_npc = {
    112: (1541035, 1541037),  # Hero
    122: (1541036, 1541038),  # Paladin
    132: (1541039, 1541040),  # Dark Knight
    212: (1541041, 1541042),  # Arch Mage FP
    222: (1541043, 1541044),  # Arch Mage IL
    232: (1541045, 1541046),  # Bishop
    312: (1541047, 1541048),  # Bowmaster
    322: (1541049, 1541050),  # Marksman
    412: (1541051, 1541052),  # Night Lord
    422: (1541053, 1541054),  # Shadower
    434: (1541059, 1541060),  # Dual Blade
    512: (1541055, 1541056),  # Buccaneer
    522: (1541057, 1541058),  # Corsair
    532: (1541061, 1541062),  # Cannoneer
}

job = chr.getJob()
gender = chr.getAvatarData().getCharacterStat().getGender()  # 0 male, 1 female

NPC = explorer_npc.get(job, (1541035, 1541035))[gender]

sm.setSpeakerID(NPC)
sm.setBoxChat()
sm.sendNext("#face0##fc0xFFbfbfbf#(Tôi nghe thấy gì đó trong đầu...)")
if sm.sendAskAccept("#face0##fc0xFFbfbfbf#(Phải tập trung vào giọng nói.)"):
    sm.createQuestWithQRValue(parentID, "rMap=" + str(chr.getFieldID()))
    sm.warp(993166033, 0)