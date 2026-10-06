fieldID = chr.getField().getId()

if fieldID >= 993162500 and fieldID <= 993162700 or fieldID >= 993162900 and fieldID <= 993163100:
    if chr.getField().getMobs().size() == 0:
        sm.warp(fieldID + 100)
    else:
        sm.chat("Please eliminate all mobs in this map.")
else:
    sm.warp(fieldID + 100)