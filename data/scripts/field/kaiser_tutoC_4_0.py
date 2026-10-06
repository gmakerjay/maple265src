# Character field ID when accessed: 940001240
# ObjectID: 0
# ParentID: 940001240
FENELLE = 3000106
CARTALION = 3000107

sm.lockInGameUI(True, False)
sm.removeNpc(CARTALION)
sm.removeNpc(FENELLE)

sm.spawnNpc(CARTALION,7,64)
sm.spawnNpc(FENELLE,121,64)
sm.flipNpcByTemplateId(CARTALION, False)
sm.flipNpcByTemplateId(FENELLE, False)
sm.showNpcSpecialActionByTemplateId(CARTALION, "say", 50000)

sm.forcedInput(1)
sm.sendDelay(500)
sm.forcedInput(0)

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Are you awake?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Fenelle? Urgh.... Where am I? Am I still alive?")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You're fine now.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Cartalion Oh, man. And Tear! What happened to Tear?")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("She is safe, though not quite the same...")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Wait.... why are you guys looking at me funny? Do I have something on my face?")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You are Kaiser now. We have awaited Kaiser's return for so long.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Kaiser? Me? That makes no sense.")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Velderoth told us about the attack on the East Sanctum. When Fenelle and I arrived, we found you in tour Kaiser form.")
sm.sendNext("You had defeated the Nefarious Priests yourself, and lost conscibusness.")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Don't worry about Tear. She's fine, though.... She's been cursed by the Relic.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Cursed? Is that better or worse than me being Kaiser? Because I'm having trouble believing any of this.")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("This is no joke. Your aura and the transformation sigil you left make it clear you are Kaiser. YOu are the chosen one.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("All right, then. What do I do now?")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Accept your destiny. Act with courage and compassion.")
sm.sendNext("It will be toughpath for a young person like you, but that is the price of great power.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Hey, I'm all about great power. The greater, the better. However, I don't really feel all that different.")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Kaiser is being that reincarnates, but loses all previous abilities and memories. You are like a rough gemstone with unlimited potential.")
sm.sendNext("You must train hard to live up to the previous Kaiser. This is your burden now.")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Don't push the young one too hard, Cartalion. There is plenty of time to grow.")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("It may be best for you to hide your awakening for now. Kaiser. Our enemies may try to take advantage of your inexperience.")


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I'll fight anyone who comes looking for trouble. But I'm wondering about Tear. Where is she?")

sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("She woke up before you did and ran off. She's somewhat distressed about her condition. Kylan went after her, so don't worry yourself too much.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("My brain feels all fuzzy. I feel plenty strong, but I need to get everything straight.")

sm.setSpeakerID(FENELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Don't force yourself.")

sm.sendDelay(1000)
sm.forcedInput(1)
sm.sendDelay(500)
sm.forcedInput(0)
sm.sendDelay(1000)
sm.lockInGameUI(False, False)
sm.removeNpc(CARTALION)
sm.removeNpc(FENELLE)
sm.showFade(500)
sm.warpInstanceOut(chr, 400000000)
