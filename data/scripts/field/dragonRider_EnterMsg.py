# Maps in Dragon Rider PQ  |  Used to show the Weather Notice on the maps
from net.swordie.ms.enums import WeatherEffNoticeType

stage = (sm.getFieldID() % 1000) / 100

# Field Messages
if stage == 1:
    sm.showWeatherNoticeToField("Defeat all the Soaring Hawks and Soaring Eagles!", WeatherEffNoticeType.BossKillNotice)
elif stage == 2:
    sm.showWeatherNoticeToField("Defeat the Wyverns and Griffey!", WeatherEffNoticeType.BossKillNotice)
elif stage == 3:
    sm.showWeatherNoticeToField("Defeat Dragonoir and enter the Crimson Sky Nest!", WeatherEffNoticeType.BossKillNotice)
elif stage == 5:
    sm.showWeatherNoticeToField("Defeat the Dragon Riders that are wreaking havoc on Minar!", WeatherEffNoticeType.BossKillNotice)
