reactor.incHitCount()

if reactor.getHitCount() == 1:
    sm.setMapTaggedObjectVisible("SunObj0", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj1", True, 0, 0)
elif reactor.getHitCount() == 2:
    sm.setMapTaggedObjectVisible("SunObj1", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj2", True, 0, 0)
elif reactor.getHitCount() == 3:
    sm.setMapTaggedObjectVisible("SunObj2", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj3", True, 0, 0)
elif reactor.getHitCount() == 4:
    sm.setMapTaggedObjectVisible("SunObj3", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj4", True, 0, 0)
elif reactor.getHitCount() == 5:
    sm.setMapTaggedObjectVisible("SunObj4", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj5", True, 0, 0)
elif reactor.getHitCount() == 6:
    sm.setMapTaggedObjectVisible("SunObj5", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj6", True, 0, 0)
elif reactor.getHitCount() == 7:
    sm.setMapTaggedObjectVisible("SunObj6", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj7", True, 0, 0)
elif reactor.getHitCount() == 8:
    sm.setMapTaggedObjectVisible("SunObj7", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj8", True, 0, 0)
elif reactor.getHitCount() == 9:
    sm.setMapTaggedObjectVisible("SunObj8", False, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj9", True, 0, 0)
elif reactor.getHitCount() == 10:
    sm.setMapTaggedObjectVisible("SunObj8", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj9", False, 0, 0)
elif reactor.getHitCount() == 11:
    sm.setMapTaggedObjectVisible("SunObj7", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj8", False, 0, 0)
elif reactor.getHitCount() == 12:
    sm.setMapTaggedObjectVisible("SunObj6", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj7", False, 0, 0)
elif reactor.getHitCount() == 13:
    sm.setMapTaggedObjectVisible("SunObj5", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj6", False, 0, 0)
elif reactor.getHitCount() == 14:
    sm.setMapTaggedObjectVisible("SunObj4", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj5", False, 0, 0)
elif reactor.getHitCount() == 15:
    sm.setMapTaggedObjectVisible("SunObj3", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj4", False, 0, 0)
elif reactor.getHitCount() == 16:
    sm.setMapTaggedObjectVisible("SunObj2", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj3", False, 0, 0)
elif reactor.getHitCount() == 17:
    sm.setMapTaggedObjectVisible("SunObj1", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj2", False, 0, 0)
else:
    sm.setMapTaggedObjectVisible("SunObj0", True, 0, 0)
    sm.setMapTaggedObjectVisible("SunObj1", False, 0, 0)
    reactor.setHitCount(0)
    