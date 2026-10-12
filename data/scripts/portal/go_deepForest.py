if sm.hasQuest(34215):
    sm.warpInstanceIn(chr, 450002250)
    sm.setInstanceTime(1200, sm.getReturnField())
else:
    sm.chat("This gate is locked.")
