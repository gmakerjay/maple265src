# ParentID: 620100026
# ObjectID: 0
# Character field ID when accessed: 620100026
BURKE = 9270083
BURKE_DIE = 9201289
GUARDS = 9420564
sm.spawnNpc(BURKE,400,-120)
sm.flipNpcByTemplateId(BURKE, False)
sm.hideNpcByTemplateId(BURKE,True)
sm.showNpcSpecialActionByTemplateId(BURKE, "say",50000)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.hideNpcByTemplateId(BURKE,False)
sm.setSpeakerID(BURKE)
sm.setBoxChat()
sm.sendNext("The guardsmen are already here! Does this mean our crew is...")
sm.setPlayerBoxChat()
sm.sendNext("No...They were good people! I;m innocent! WHY CAN'T YOU SEE THAT?!")
sm.showBalloonMsg("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/3",2000)
sm.sendDelay(2000)
sm.showEffect("Effect/DirectionNewPirate.img/newPirate/attack_tuto", 0, 0)
sm.chatScript("Eliminate all Guards.")
#TODO: START QUEST AND SPAWN MOB
sm.startQuestNoCheck(53245)
sm.spawnMob(GUARDS,-400,-120,False)
sm.spawnMob(GUARDS,-300,-120,False)
sm.spawnMob(GUARDS,-200,-120,False)
sm.sendDelay(2000)
sm.lockInGameUI(False, False)