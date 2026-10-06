from net.swordie.ms.enums import DimensionalPortalType

return_field = sm.getFieldID()
current = sm.getFieldID()
response = sm.sendAskSlideMenu(6)
mapID = DimensionalPortalType.getByValWithType(response, 6).getMapID()

if mapID != 0 and sm.getFieldID() == current:
    sm.setReturnField(return_field)
    sm.warp(mapID)