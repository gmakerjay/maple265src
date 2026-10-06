# ObjectID: 0
# Character field ID when accessed: 931050950
# ParentID: 931050950
ROOB_D = 2159380
CLAUDINE = 2159384

sm.lockInGameUI(True, False)
sm.removeNpc(ROOB_D)
sm.spawnNpc(ROOB_D, 440,196)
sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.sendDelay(1000)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("#h0#,#h0#! What brings you here?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Roo-D, I must ask that prisoner a question. I need you to keep this a secret, okay?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You WERE acting funny when you saw her earlier, Dou you remember anything? Maybe something from your past?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("What are you talking about? Roo-D, what do you know about my past?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Ummm...take this for now.")

sm.showFieldEffect("Map/Effect.img/xenon/knife")
sm.sendDelay(2000)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("She had this on her when we put her in the cell. I think it's an important clue to finding out who you are. You should go talk to her. I'll keep an eye out for Gelimer.")
sm.sendDelay(1000)
sm.flipNpcByTemplateId(ROOB_D, False)
sm.moveNpcByTemplateId(ROOB_D, False, 500, 100)
sm.sendDelay(5000)
sm.removeNpc(ROOB_D)


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Excuse me... I have something to ask you.")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.sendDelay(2000)

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I'm not talking, you Black Wings scum!")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("(This sensation is familar, yet distant. I am sure I have met this woman before.)")
sm.sendNext("(And this dagger... Have I held it before?)")
sm.sendNext("Umm here")
sm.showFieldEffect("Map/Effect.img/xenon/knife")
sm.sendDelay(2000)

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.sendDelay(2000)

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("My dagger!")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Tell me about this weapon. Does it hold special powers? Where did you get it?")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Why do you want to know, Black Wing?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("This item has caused a strange fuctuation in my memory circuits. Roo-D tells me it may have something to do with my past.")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("What? I don't understand...")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.sendDelay(2000)

sm.sendNext("Wait, you said you recognize this dagger? Could you be...")

sm.spawnNpc(ROOB_D, 1164,196)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("#h0#, #h0#!")

sm.moveNpcByTemplateId(ROOB_D, False, 200, 100)
sm.sendDelay(500)
sm.sendNext("Gelimer is coming back! Did she tell you anything?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("No, nothing. And the ... glitch earlier will not return to my mind.")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Too bad... I was hoping that would trigger your memory.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("My memory? What are you talking about Roo-D?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("No time to explain now, #h0#. This might be your last chance. You need to join this lady and get out of here! Otherwise, Gelimer's going to erase what's left of your memory.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("He would erase my memory?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("Look, I know you're confused, but I made a promise to keep you safe!")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Promise? With who?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("With you...")

sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.sendDelay(2000)

sm.sendNext("Look, you came to me, before Gelimer took your memories. You wanted to leave! I know you don't remember that now, but you have to trust me.")
sm.sendNext("I've acted like Gelimer's loyal underling for a long time now, but today is our chance.")
sm.sendNext("I'm sure this lady is from your past. I could see it in your eyes.")
sm.sendNext("You have to get out of here, before you lose what little memory you have left.")


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("That flash before... was that a memory of my past?")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("I don't know, but you don't have time to think about it now. Gelimer is coming back here now, and when he gets here, he'll  wipe your memory and hurt that woman, You need to think about what you want.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I want to find my memories again.")
sm.sendNext("I don't even know why, but I know I want to protect her.")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000, CLAUDINE )
sm.sendDelay(2000)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("That's a good enough reason. Get out of here. I'll clean things up.")


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Roo-D, you should come with me. If Gelimer finds out you helped...")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("I'm not build for combat. I'd only slow you down.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("That's exactly why I can't leave you here by yourself. You're coming.")

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("... Fine, but we have to leave now!")
sm.showFade(500)
sm.warp(931050970)

sm.lockInGameUI(False, False)
#CON DI ME NEXON DIT ME