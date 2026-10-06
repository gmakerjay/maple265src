Muto = 3003156

if chr.getLevel() < 220 and sm.hasQuestCompleted(34218):
    sm.progressMessageFont("Only those Lv. 220 and above can proceed to the next area.")
else:
    sm.setSpeakerID(Muto)
    if sm.sendAskYesNo("#bMuto#k... Full now... #bMove#k?\r\n\r\n(You can follow the Arcane River to its next stop when Muto moves.)"):
        sm.warp(450003000)
