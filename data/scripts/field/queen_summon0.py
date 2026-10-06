# Root Abyss | Queen's Castle (Boss Map)
from net.swordie.ms.enums import WeatherEffNoticeType
if sm.getFieldID() == 105200310:
    sm.invokeAfterDelay(500, "showWeatherNotice", "Attempt to wake the Crimson Queen.", WeatherEffNoticeType.SnowySnowAndSprinkledFlowerAndSoapBubbles, 10000)
if sm.getFieldID() == 105200710:
    sm.invokeAfterDelay(500, "showWeatherNotice", "Attempt to wake the Chaos Crimson Queen.", WeatherEffNoticeType.SnowySnowAndSprinkledFlowerAndSoapBubbles, 10000)
