# Hayato Tutorial Clipsence | Momijigaoka : Unfamiliar Hillside (807040000)
# Author: Tiger
if (sm.getChr().getJob() == 4001):
    #sm.giveExp(3500)
    sm.levelUntil(10)
    sm.jobAdvance(4100)
    sm.giveSkill(40011183, -1)
elif (sm.getChr().getJob() == 4002):
    sm.levelUntil(10)
    sm.jobAdvance(4200)
sm.resetAP(False, chr.getJob())
