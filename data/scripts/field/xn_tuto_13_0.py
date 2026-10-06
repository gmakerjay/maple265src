# Character field ID when accessed: 931060070
# ParentID: 931060070
# ObjectID: 0
ROOB_D = 2159380
CLAUDINE = 2151003
ELEX = 2159388
BRIGHTON = 2159386
CHECKY = 2159387
BELLE = 2159385

sm.lockInGameUI(True, False)

sm.setSpeakerID(BELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Claudine! We were worried sick.")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Thanks Belle")

sm.setSpeakerID(ELEX)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("But.... what's with Commander Glowstick over here? Looks friendly enought, I guess...")

sm.setSpeakerID(BRIGHTON)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I bet It's one of Gelimer's agents. They were going after you at first, Claudine. We can't trust anything that came out of that lab now...")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("These... robots saved my life. I heard the little one talking abou memories being wiped. I think Gelimer was controlling them....")

sm.setSpeakerID(CHECKY)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You KNOW Gelimer had control. You jnust saw it! We can't risk the safety of Secret Plaza because you're feeling charitable. That could be what Gelimer wants.")

sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000)
sm.sendDelay(500)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You can remove any control devices...")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CHECKY )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, BRIGHTON )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, ELEX )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, BELLE )
sm.sendDelay(1000)

sm.setSpeakerID(ELEX)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Then remove it immediately. It's dangerous.")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("It's not that simple. If i remove this, #h0# may be weakened to the point of near-deatth. The risks are too great to move ahead without careful consideration.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I'm willing to take the risk, Roo-D, do it if you can.")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Really? Are you sure?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("If Gelimer were to take control, I would be danger to everyone around me. I can't let that happen. I will never be controlled again.")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Okay, I'll remove it....")
sm.sendNext("You might fell a little dizzy at first... but I'm almost done.")

sm.levelUntil(10)
sm.jobAdvance(3600)
sm.giveSkill(30021238, -1)
sm.removeSkill(30021238)
sm.warpInstanceOut(chr, 310010000)
sm.giveItem(1142575)
sm.chatScript("<Memory Seeker> has been awarded.")
sm.chatScript("Earned Forever Single title!")





sm.lockInGameUI(False, False)