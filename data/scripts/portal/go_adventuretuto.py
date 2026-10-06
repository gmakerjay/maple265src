# 106030201
fieldID = sm.getFieldID()
if fieldID < 4000014:
    sm.warp(sm.getFieldID() + 1)

elif sm.getFieldID() == 4000014:
    sm.warp(4000020, 0)


