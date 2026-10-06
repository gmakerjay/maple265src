# Energy Drink - Red Moo | Are you tired? Try the new fresh, minty energy drink, Red Moo! Restores 5 Fatigue. You can drink 3 energy drinks per day.

from net.swordie.ms.enums import Stat
from java.lang import Math

fatigue = chr.getStat(Stat.fatigue) - 5
chr.setStatAndSendPacket(Stat.fatigue, fatigue)
sm.consumeItem(2430212)