# ParentID: 620100022
# Character field ID when accessed: 620100022
# ObjectID: 0
BURKE = 9270083
BOUNTY_HUNTER_1 = 9201277
BOUNTY_HUNTER_2 = 9201270
BOUNTY_HUNTER_3 = 9201271
sm.lockInGameUI(True, False)
sm.hideUser(True)
sm.removeEscapeButton()
sm.spawnNpc(BURKE,590,-120)
sm.spawnNpc(BOUNTY_HUNTER_1,-200,-120)
sm.spawnNpc(BOUNTY_HUNTER_2,-100,-120)
sm.spawnNpc(BOUNTY_HUNTER_3,0,-120)
sm.flipNpcByTemplateId(BOUNTY_HUNTER_1, False)
sm.setSpeakerID(BOUNTY_HUNTER_1)
sm.setBoxChat() 
sm.sendNext("Jett was all sorts of awesome today. I've never seen anyone so strong.")
sm.setSpeakerID(BURKE)
sm.setBoxChat() 
sm.sendNext("?")
sm.setSpeakerID(BOUNTY_HUNTER_2)
sm.setBoxChat() 
sm.sendNext("Yeah,that Core thing is just amazing. Jett's unstoppable...I bet even Captain Burke couldn't win that fight.")
sm.setSpeakerID(BOUNTY_HUNTER_3)
sm.setBoxChat() 
sm.sendNext("Hah,that's kind of sad.")
sm.sendNext("I mean, maybe Jett should just be the captain. The king trusts Jett more anyway. We'd probably all be better off.")
sm.setSpeakerID(BOUNTY_HUNTER_1)
sm.setBoxChat() 
sm.sendNext("That's what everyone's been saying. Ah well,let's get to the party before all the food is gone.")
sm.setSpeakerID(BURKE)
sm.setBoxChat() 
sm.sendNext("........")
sm.warp(620100030,0)
sm.removeNpc(BOUNTY_HUNTER_1)
sm.removeNpc(BOUNTY_HUNTER_2)
sm.removeNpc(BOUNTY_HUNTER_3)
sm.removeNpc(BURKE)
