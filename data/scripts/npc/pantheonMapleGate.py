from net.swordie.ms.enums import DimensionalPortalType

response = sm.sendAskSlideMenu(3)
mapID = DimensionalPortalType.getByValWithType(response, 3).getMapID()

if mapID != 0 and sm.getFieldID() == sm.getFieldID():
    sm.setReturnField(sm.getFieldID())
    sm.warp(mapID)
# response = sm.sendAskYesNo("Would you like to go back to Victoria Island?")
#
# if response:
#     if sm.hasQuest(38030):
#         sm.setQRValue(38030, "clear", False)
#         sm.warp(100000000, 23)
#         #sm.dispose()
#     sm.warp(104020000, 0)
