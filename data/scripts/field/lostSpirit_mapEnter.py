sm.chatScript("All monsters must be eliminated before you can move to the next area.")
if chr.getFieldID() == 940200220:
    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/stageEff/stage")
    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/stageEff/number_0/1")
elif chr.getFieldID() == 940200230:
    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/stageEff/stage")
    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/stageEff/number_0/2")
elif chr.getFieldID() == 940200240:
    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/stageEff/final")