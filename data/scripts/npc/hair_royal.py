# Big Headward | Henesys Hair Salon
from net.swordie.ms.enums import Stat

selection = sm.sendNext("Hi, #h0#. I'm Big Headward. What would you like to do?\r\n" +
                       "#b" +
                       "#L0#Gain Excessively Charming Quest for special job.#l\r\n" +
                       "#k")

if selection == 0:
    charm_level = chr.getTraitLevelByExp(chr.getStat(Stat.charmEXP))
    if charm_level < 30:
        sm.sendNext("Your charm level is not enough")
    else:
        if sm.hasQuestCompleted(6500):
            sm.sendNext("You have completed the mission")
        elif sm.hasQuest(6500):
            sm.sendNext("You have already accepted this quest")
        else:
            sm.startQuestNoCheck(6500)
