# Fatigue Reset Drink | Using this drink will reset your fatigue to 0%. You can only use it when you have more than 0% fatigue.

from net.swordie.ms.enums import Stat

if chr.getStat(Stat.fatigue) > 0:
    chr.setStatAndSendPacket(Stat.fatigue, 0)
    sm.chatScript("Your fatigue has been reset to 0%.")
else:
    sm.chat("You can only use it when you have more than 0% fatigue.")