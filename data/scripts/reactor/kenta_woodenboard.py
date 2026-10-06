from net.swordie.ms.enums import WeatherEffNoticeType

Kenta = 9020004

reactor.incHitCount()
if reactor.getHitCount() == reactor.getMaxHitCount():
    sm.spawnNpc(Kenta, 181, 1810)
    sm.showWeatherNoticeToField("Boys, I sure could go for some air to breathe right now! Could you maybe defeat some monsters and get me 10 Air Bubbles? Maybe in a hurry?", WeatherEffNoticeType.KentaPQ)
    sm.removeReactor()
