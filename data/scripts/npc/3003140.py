# 3003140 - Kao (Cave of Repose: Arma's Hideout)
# Quest 34119: [Vanishing Journey] Defeat Arma

if sm.hasQuest(34119):
    if not sm.hasMobsInField():
        sm.sendNext("You were able to defeat Arma thanks to Kao's sacrifice. Take Kao and escape the Cave of Repose.")
        sm.completeQuest(34119)
        sm.warp(450001350)
    else:
        sel = sm.sendAskMenu("Ugh... Kao has collapsed...!\r\n\r\n#L0##bDefeat Arma on your own#k#l\r\n#L1##r[Skip] Defeat Arma and escape the cave immediately#k#l")
        if sel == 1:
            sm.completeQuest(34119)
            sm.warp(450001350)
elif sm.hasQuestCompleted(34119):
    sm.warp(450001350)
else:
    sm.sendNext(".......")
