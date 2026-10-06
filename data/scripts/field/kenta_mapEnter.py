# Maps in Kenta In Danger |  Used to show the Weather Notice on the maps
from net.swordie.ms.enums import WeatherEffNoticeType

stage = (sm.getFieldID() % 1000) / 100

# Field Messages
if stage == 1:
    sm.showWeatherNoticeToField("Can you hear my voice? If so. please help! I'm near the shipwreck...", WeatherEffNoticeType.KentaPQ)
elif stage == 2:
    sm.showWeatherNoticeToField("Eliminate all monsters and break all the chests!", WeatherEffNoticeType.KentaPQ)
elif stage == 3:
    sm.showWeatherNoticeToField("Eliminate all monsters and break all the chests!", WeatherEffNoticeType.KentaPQ)
elif stage == 4:
    sm.showWeatherNoticeToField("Unlock all the doors!", WeatherEffNoticeType.KentaPQ)
elif stage == 5:
    sm.showWeatherNoticeToField("Eliminate the Captain!", WeatherEffNoticeType.KentaPQ)
