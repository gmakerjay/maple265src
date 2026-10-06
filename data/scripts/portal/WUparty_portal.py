# Portals in  First Time Together PQ
from net.swordie.ms.enums import WeatherEffNoticeType

stage = (sm.getFieldID() % 10000) / 1000

if stage == 1 and sm.getInstance() is not None and sm.getInstance().hasProperty("kpq" + str(stage) + "clear"):
    sm.warp(sm.getFieldID() + 1000)
elif stage == 2 and sm.getInstance() is not None and sm.getInstance().hasProperty("kpq" + str(stage) + "clear"):
    sm.warp(sm.getFieldID() + 1000) 
elif stage == 3 and sm.getInstance() is not None and sm.getInstance().hasProperty("kpq" + str(stage) + "clear"):
    sm.warp(sm.getFieldID() + 1000) 
elif stage == 4 and sm.getInstance() is not None and sm.getInstance().hasProperty("kpq" + str(stage) + "clear"):
    sm.warp(sm.getFieldID() + 1000)
else:
    sm.chat("The portal is blocked.")