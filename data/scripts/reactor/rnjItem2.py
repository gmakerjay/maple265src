from net.swordie.ms.enums import WeatherEffNoticeType


sm.changeReactorState(2618003, 1)
if chr.getField().getId() == 926100201:
    sm.dropItem(4001133, chr.getPosition().getX(), chr.getPosition().getY())
    sm.showWeatherNoticeToField("You've obtained the Zenumist's Experiment Files. Please bring the data to Romeo.", WeatherEffNoticeType.RomeoNPC)
elif chr.getField().getId() == 926110201:
    sm.dropItem(4001134, chr.getPosition().getX(), chr.getPosition().getY())
    sm.showWeatherNoticeToField("You've obtained the Alcadno's Experiment Files. Please bring the data to Juliet.", WeatherEffNoticeType.JulietNPC)
sm.removeReactor()
    