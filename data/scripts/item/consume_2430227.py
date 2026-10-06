# Energy Drink - Bear Power | Are you tired? Try the only energy drink with the refined essence of bear, Bear Power! Restores 50 Fatigue. Cooldown is 30 minutes..

from net.swordie.ms.enums import Stat
from java.lang import Math

fatigue = chr.getStat(Stat.fatigue) - 50
chr.setStatAndSendPacket(Stat.fatigue, fatigue)
sm.consumeItem(2430227)