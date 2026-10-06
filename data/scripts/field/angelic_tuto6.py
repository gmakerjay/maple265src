# ParentID: 940011060
# ObjectID: 0
# Character field ID when accessed: 940011060
FENELLE = 3000106
CARTALION = 3000107
KYLAN = 3000152
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.removeNpc(KYLAN)
sm.removeNpc(FENELLE)
sm.removeNpc(CARTALION)

sm.spawnNpc(FENELLE,180,64)
sm.spawnNpc(CARTALION,150,64)
sm.spawnNpc(KYLAN,120,64)
sm.hideNpcByTemplateId(FENELLE,True)
sm.hideNpcByTemplateId(CARTALION,True)
sm.hideNpcByTemplateId(KYLAN,True)

sm.forcedInput(1)
sm.sendDelay(10)
sm.forcedInput(0)

sm.flipNpcByTemplateId(FENELLE, False)
sm.flipNpcByTemplateId(CARTALION, False)
sm.flipNpcByTemplateId(KYLAN, False)

sm.hideNpcByTemplateId(FENELLE,False)
sm.hideNpcByTemplateId(CARTALION,False)
sm.hideNpcByTemplateId(KYLAN,False)

sm.setPlayerBoxChat()
sm.sendNext("Umm, where am I?")

sm.setSpeakerID(FENELLE)
sm.setBoxChat()    
sm.sendNext("Pantheon. How do you feel?")

sm.setPlayerBoxChat()
sm.sendNext("My head feels like a ripe watermelon, but I think I'm okay otherwise.")
sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg1/0",3000)
sm.sendDelay(2000)

sm.setPlayerBoxChat()
sm.sendNext("Huh? Why is there a pink thing on my arm?")

sm.setSpeakerID(FENELLE)
sm.setBoxChat()    
sm.sendNext("I wish I had better news, child, but I fear you have been cursed by the East Sanctum Relic. In fact, it is quite stuck yo your arm.")

sm.setPlayerBoxChat()
sm.sendNext("What?! What do I do?! How do I get it off?!")

sm.setSpeakerID(CARTALION)
sm.setBoxChat() 
sm.sendNext("The security threat of having a young, defenseless girl wandering around with one of our relics strapped to her arm has not escaped me.")

sm.setSpeakerID(FENELLE)
sm.setBoxChat()  
sm.sendNext("Do not scold the girl, Cartalion. That relic would be entirely gone if it were not for Kaiser and #h0#.")

sm.setSpeakerID(CARTALION)
sm.setBoxChat() 
sm.sendNext("I suppose you are rightm as usual.")

sm.setPlayerBoxChat()
sm.sendNext("Ha... hahaha... what? I don't remember anything....")
sm.sendNext("Are you saying that the relic grabbed me and turned into a bracelet when I touched it? Who the heck is Kaiser? What is going on?!")

sm.setSpeakerID(KYLAN)
sm.setBoxChat() 
sm.sendNext("Hey,it's going to be okay. We don't have a way to remove that relic from your arm, but won't cause you any harm. Think of it like a nice accessory.")

sm.setPlayerBoxChat()
sm.sendNext("I-I didn't mean to take it! I don't even like pink!")

sm.setSpeakerID(FENELLE)
sm.setBoxChat() 
sm.sendNext("#h0#, no one is blaming you for this. Three relics remain in Pantheon. We are quite safe.")

sm.setPlayerBoxChat()
sm.sendNext("B-but,I...")

sm.setSpeakerID(CARTALION)
sm.setBoxChat() 
sm.sendNext("#h0#,please don't start crying. I'm a very sensitive sympathy-weeper.")

sm.setPlayerBoxChat()
sm.sendNext("Ugh...")


sm.setSpeakerID(FENELLE)
sm.setBoxChat() 
sm.sendNext("Cartalion!")

sm.setSpeakerID(CARTALION)
sm.setBoxChat()
sm.sendNext("I'm sorry. I have very little control over my tearducts.")

sm.warp(940011070,0)

sm.removeNpc(KYLAN)
sm.removeNpc(FENELLE)
sm.removeNpc(CARTALION)
