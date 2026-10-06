from net.swordie.ms.enums import WeatherEffNoticeType
import random

Atilla = 9480235
Aragami = 9480236
Butcher = 9480237
Asura = 9480238
Khan = 9480239

PERCENT = random.randint(1,100)
if PERCENT <= 20:
    sm.invokeAfterDelay(2000, "showWeatherNotice", "The demons fear the boss and will no longer appear.", WeatherEffNoticeType.BlackGate)
    sm.invokeAfterDelay(5000, "spawnMob", Khan, chr.getPosition().getX(), chr.getPosition().getY(), False)
elif PERCENT <= 30:
    sm.invokeAfterDelay(2000, "showWeatherNotice", "The demons fear the boss and will no longer appear.", WeatherEffNoticeType.BlackGate)
    sm.invokeAfterDelay(5000, "spawnMob", Asura, chr.getPosition().getX(), chr.getPosition().getY(), False)
elif PERCENT <= 50:
    sm.invokeAfterDelay(2000, "showWeatherNotice", "The demons fear the boss and will no longer appear.", WeatherEffNoticeType.BlackGate)
    sm.invokeAfterDelay(5000, "spawnMob", Butcher, chr.getPosition().getX(), chr.getPosition().getY(), False)
elif PERCENT <= 70:
    sm.invokeAfterDelay(2000, "showWeatherNotice", "The demons fear the boss and will no longer appear.", WeatherEffNoticeType.BlackGate)
    sm.invokeAfterDelay(5000, "spawnMob", Aragami, chr.getPosition().getX(), chr.getPosition().getY(), False)
elif PERCENT <= 90:
    sm.invokeAfterDelay(2000, "showWeatherNotice", "The demons fear the boss and will no longer appear.", WeatherEffNoticeType.BlackGate)
    sm.invokeAfterDelay(5000, "spawnMob", Atilla, chr.getPosition().getX(), chr.getPosition().getY(), False)