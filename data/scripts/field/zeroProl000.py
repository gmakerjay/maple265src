#Map: Shadowvale: Conference Chambers (321000000)  Map for Zero Tutorial
ADMIN_NPC = 2007
JOB_ADVANCE = 10112
TARGET_MAP = 320000000
if chr.getJob() == 10000:
    sm.setSpeakerID(ADMIN_NPC)
    sm.removeEscapeButton()
    sm.lockInGameUI(True,False)
    sm.hideUser(True)

    sm.flipSpeaker()

    sm.sendNext("Zero will automatic skip Intro Quest at this moment.")

    sm.hideUser(False)
    sm.jobAdvance(JOB_ADVANCE)
    sm.warp(TARGET_MAP)

    sm.lockInGameUI(False,False)
    chr.sendLevelRewardToChar(30);
    chr.sendLevelRewardToChar(60);
    chr.sendLevelRewardToChar(100);
    #sm.dispose()