from net.swordie.ms.enums import WeatherEffNoticeType

Kenta = 9020004

sm.removeNpc(Kenta)
sm.showWeatherNoticeToField("We sure cut that one close! We've got enough air to get to a safe place, so let's go.", WeatherEffNoticeType.KentaPQ)
sm.spawnMob(9300460, 180, 1810, False)