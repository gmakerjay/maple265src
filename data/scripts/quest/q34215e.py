Simia = 3003151
Pi = 3003152
Pimi = 3003153
Pidol = 3003154

sm.lockUI()
sm.removeAdditionalEffect()
sm.removeEscapeButton()

sm.setSpeakerID(Simia)
sm.setBoxChat()
sm.sendNext("Oh, #h0#! You're okay, and you brought us a #bSlurpy Fruit#k!")
sm.sendNext("Okay, lemme just grind up some Slurpy Fruit, smear it around the top, and... It's done! Who's ready to try the #b" + str(sm.getQRValue(34207)) + " Sandwich#k?")

sm.setSpeakerID(Pidol)
sm.setBoxChat()
sm.sendNext("I... I want to... eat... first. Heheheh")
sm.sendNext("Om, nom... Gulp...")
sm.sendNext("BEEELCH! Ohh.... Ooooooohhhh!")

sm.setSpeakerID(Simia)
sm.setBoxChat()
sm.sendNext("Pidol, what's wrong?")

sm.setSpeakerID(Pidol)
sm.setBoxChat()
sm.sendNext("This taste... It's simply divine... That heavenly harmony of flavors... That crisp, yet chewy texture... It's as though the five tastes were having a party, and there comes a knock at the door... And in walks a sixth, as-yet undiscovered flavor...! My taste buds are overwhelmed!")

sm.setSpeakerID(Pimi)
sm.setBoxChat()
sm.sendNext("Pidol! You're back to normal!")

sm.setSpeakerID(Pidol)
sm.setBoxChat()
sm.sendNext("Huh? What you mean? I always normal... Heheeheh.")

sm.setSpeakerID(Simia)
sm.setBoxChat()
sm.sendNext("I guess the intense flavor must have momentarily #bshocked Pidol back to his senses#k. I think it's safe to say that our sandwich is a success!")
sm.sendNext("I hope that Muto likes our #b" + str(sm.getQRValue(34207)) + " Sandwich#k....")

sm.setSpeakerID(Pidol)
sm.setBoxChat()
sm.sendNext("Why shake?!")

sm.setSpeakerID(Pimi)
sm.setBoxChat()
sm.sendNext("Oh no! #rGulla#k Is surfacing!")

sm.setSpeakerID(Simia)
sm.setBoxChat()
sm.sendNext("We don't have much time! Hurry and find Chief #bLyon#k! The Pi siblings and I will carry the sandwich to Muto!")

sm.completeQuest(34215)
sm.unlockUI()