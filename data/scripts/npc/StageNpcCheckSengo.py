stage = chr.getFieldID() - 744000020

if chr.getInstance() is not None and not chr.getInstance().hasProperty("SengoClear" + str(stage)):
    sm.sendNext("You made it through all of the lessons? You may go back to where you were.")
    chr.getInstance().addProperty("SengoClear" + str(stage), True)
else:
    sm.sendSayOkay("Please use the portal on the right to enter the next stage, Hurry!")