# Character field ID when accessed: 931050910
# ObjectID: 0
# ParentID: 931050910
CHILHOOD_SELF_M = 2159368
CHILHOOD_SELF_F = 2159369
CLAUDINE = 2159372
GELIMER = 2159376
CHILHOOD_SELF_M_ANDROID = 2159370
CHILHOOD_SELF_F_ANDROID = 2159371
if (sm.getChr().getJob() == 3002):
    sm.lockInGameUI(True, False)
    sm.hideUser(True)
    if chr.getAvatarData().getAvatarLook().getGender() == 0:
        sm.spawnNpc(GELIMER, -1783,-14)
        sm.showNpcSpecialActionByTemplateId(GELIMER, "say", 90000)
        sm.flipNpcByTemplateId(GELIMER, False)
       
        
        sm.spawnNpc(CHILHOOD_SELF_M, -1123,-14)
        sm.moveNpcByTemplateId(CHILHOOD_SELF_M, True, 280, 100)
        sm.setCameraOnNpc(CHILHOOD_SELF_M)
        sm.sendDelay(5000)
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CHILHOOD_SELF_M )
        sm.sendDelay(2000)
        
        sm.setSpeakerID(CHILHOOD_SELF_M)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("who's that guy???")
        
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/6", 2000, GELIMER )
        sm.sendDelay(2000)
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/3", 2000, CHILHOOD_SELF_M )
        sm.sendDelay(2000)
        sm.showFade(500)
        sm.spawnNpc(CHILHOOD_SELF_M_ANDROID,-1400,-14)
        sm.removeNpc(CHILHOOD_SELF_M)
        
        sm.setSpeakerID(GELIMER)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("Finally, I find what I'm looking for....it's a good thing i looked all over town.")
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 2000, GELIMER )
        sm.sendDelay(2000)
        
        sm.flipNpcByTemplateId(GELIMER, True)
        sm.sendDelay(2000)
        sm.spawnNpc(CLAUDINE, -585,-14)
        sm.setCameraOnNpc(CLAUDINE)
        sm.moveNpcByTemplateId(CLAUDINE, True, 100, 100)
        sm.sendDelay(2000)
        sm.flipNpcByTemplateId(CLAUDINE, False)
        sm.moveNpcByTemplateId(CLAUDINE, False, 50, 100)
        sm.sendDelay(2000)
        sm.flipNpcByTemplateId(CLAUDINE, True)
        sm.moveNpcByTemplateId(CLAUDINE, True, 50, 100)
        sm.sendDelay(2000)
        
        sm.setSpeakerID(CLAUDINE)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("Did #r#h0##k already go home I was going to return the dagger I borrowed")
        sm.sendDelay(2000)
        sm.showFade(500)
        sm.warp(931050920)
        sm.removeNpc(GELIMER)
        sm.removeNpc(CHILHOOD_SELF_M_ANDROID)
        sm.removeNpc(CLAUDINE)
        sm.lockInGameUI(False, False)
        
        
        
        
    if chr.getAvatarData().getAvatarLook().getGender() == 1:
        sm.spawnNpc(GELIMER, -1783,-14)
        sm.showNpcSpecialActionByTemplateId(GELIMER, "say", 90000)
        sm.flipNpcByTemplateId(GELIMER, False)
       
        
        sm.spawnNpc(CHILHOOD_SELF_F, -1123,-14)
        sm.moveNpcByTemplateId(CHILHOOD_SELF_F, True, 280, 100)
        sm.setCameraOnNpc(CHILHOOD_SELF_F)
        sm.sendDelay(5000)
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CHILHOOD_SELF_F )
        sm.sendDelay(2000)
        
        sm.setSpeakerID(CHILHOOD_SELF_F)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("who's that guy???")
        
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/6", 2000, GELIMER )
        sm.sendDelay(2000)
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/3", 2000, CHILHOOD_SELF_F )
        sm.sendDelay(2000)
        sm.showFade(500)
        sm.spawnNpc(CHILHOOD_SELF_F_ANDROID,-1400,-14)
        sm.removeNpc(CHILHOOD_SELF_F)
        
        sm.setSpeakerID(GELIMER)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("Finally, I find what I'm looking for....it's a good thing i looked all over town.")
        sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 2000, GELIMER )
        sm.sendDelay(2000)
        
        sm.flipNpcByTemplateId(GELIMER, True)
        sm.sendDelay(2000)
        sm.spawnNpc(CLAUDINE, -585,-14)
        sm.setCameraOnNpc(CLAUDINE)
        sm.moveNpcByTemplateId(CLAUDINE, True, 100, 100)
        sm.sendDelay(2000)
        sm.flipNpcByTemplateId(CLAUDINE, False)
        sm.moveNpcByTemplateId(CLAUDINE, False, 50, 100)
        sm.sendDelay(2000)
        sm.flipNpcByTemplateId(CLAUDINE, True)
        sm.moveNpcByTemplateId(CLAUDINE, True, 50, 100)
        sm.sendDelay(2000)
        
        sm.setSpeakerID(CLAUDINE)
        sm.removeEscapeButton()
        sm.setBoxChat()    
        sm.sendNext("Did #r#h0##k already go home I was going to return the dagger I borrowed")
        sm.sendDelay(2000)
        sm.showFade(500)
        sm.warp(931050920,0)
   
        sm.removeNpc(GELIMER)
        sm.removeNpc(CHILHOOD_SELF_F_ANDROID)
        sm.removeNpc(CLAUDINE)
        sm.lockInGameUI(False, False)