# ParentID: 940011070
# ObjectID: 0
# Character field ID when accessed: 94001107
KYLAN = 3000152
sm.removeEscapeButton()
sm.hideNpcByTemplateId(KYLAN,False)    
sm.setSpeakerID(KYLAN)
sm.setBoxChat()  
sm.sendNext("#h0#, wait!")
    
sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)
    
sm.sendNext("This 'curse' is not as ominous as it sounds. That relic has never reacted to any other priest, yey it clung to you like nurturing mother.")
sm.setPlayerBoxChat()
sm.sendNext("But I don't want any of this! I didn't mean to take anything!")
    
sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/tuto/BalloonMsg0/6",2000,KYLAN)
sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.removeNpc(KYLAN)
sm.warp(940011080,0)
