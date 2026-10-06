# Maps in Juliet PQ |  Used to show the Weather Notice on the maps
from net.swordie.ms.enums import WeatherEffNoticeType

# Field Messages
if chr.getFieldID() == 926110000:
    sm.showWeatherNoticeToField("Please search the laboratory and find the hidden door!", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110001:
    sm.showWeatherNoticeToField("Please defeat all the monsters!", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110100:
    sm.showWeatherNoticeToField("Please defeat the monster and fill the broken breaker with the liquid you have acquired!", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110200:
    sm.showWeatherNoticeToField("Obtain a Card Key from the monsters to enter the laboratory and find the experimental data!", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110201 or chr.getFieldID() == 926110202:
    sm.showWeatherNoticeToField("Find the experimental data in the laboratory and bring it to Juliet.", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110203:
    sm.showWeatherNoticeToField("Please defeat all the monsters!", WeatherEffNoticeType.JulietNPC)
elif chr.getFieldID() == 926110300:
    sm.showWeatherNoticeToField("Please go through the 4 security passages!", WeatherEffNoticeType.JulietNPC)
