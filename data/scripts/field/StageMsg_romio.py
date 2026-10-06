# Maps in Romeo PQ |  Used to show the Weather Notice on the maps
from net.swordie.ms.enums import WeatherEffNoticeType

# Field Messages
if chr.getFieldID() == 926100000:
    sm.showWeatherNoticeToField("Please search the laboratory and find the hidden door!", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100001:
    sm.showWeatherNoticeToField("Please defeat all the monsters!", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100100:
    sm.showWeatherNoticeToField("Please defeat the monster and fill the broken breaker with the liquid you have acquired!", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100200:
    sm.showWeatherNoticeToField("Obtain a Card Key from the monsters to enter the laboratory and find the experimental data!", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100201 or chr.getFieldID() == 926100202:
    sm.showWeatherNoticeToField("Find the experimental data in the laboratory and bring it to Juliet.", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100203:
    sm.showWeatherNoticeToField("Please defeat all the monsters!", WeatherEffNoticeType.RomeoNPC)
elif chr.getFieldID() == 926100300:
    sm.showWeatherNoticeToField("Please go through the 4 security passages!", WeatherEffNoticeType.RomeoNPC)
