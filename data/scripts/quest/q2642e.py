#   [Job Adv] (Lv.30)   Becoming a Blade Acolyte
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1056000)
if sm.hasQuest(parentID):
    if sm.canHold(1132021):
        sm.giveItem(1132021)
        sm.jobAdvanceForDB(432)
        sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
        sm.completeQuest(parentID)
        sm.lockInGameUI(False, False)
    else:
        sm.sendSay("Empty one or more Equip slots before you can advance to Blade Acolyte.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()