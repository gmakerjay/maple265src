# Title - Medal of the Razor Gale (61238)

medal = 1142494
onikageh = 80001156
sacredOnikageh = 80001179
echo = 40011005

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.removeSkill(onikageh)
    sm.giveSkill(sacredOnikageh)
    sm.giveSkill(echo)
    sm.startQuest(parentID)
    sm.completeQuest(parentID)