if chr.getField().getMobs().size() == 0:
    sm.showEffect("Map/EffectTW.img/arisan/clear")
    if chr.getFieldID() == 940200320:
        sm.giveExpNoAffectedByExpRate(7683396)
        sm.completeQuest(34476)
        sm.warpInstanceOut(chr, 450005000)
    else:
        sm.warp(chr.getFieldID() + 10)
else:
    sm.chatScript("You must eliminate all monsters on the field before moving to the next stage.")