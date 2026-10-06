Rabbit_Mask = 3003225
Cat_Mask = 3003226
Flutist_Mask = 3003227
Protective_Mask = 3003202

sm.setSpeakerID(Rabbit_Mask)
sm.flipDialogue()
sm.sendNext("I'm happy, HAPPY I tell you!")

sm.setSpeakerID(Cat_Mask)
sm.flipDialogue()
sm.sendNext("Fireworks, dancing, the sound of rushing water... I'm so excited!")

sm.setSpeakerID(Flutist_Mask)
sm.flipDialogue()
sm.sendNext("Ha ha ha. Come, celebrate with me!")

sm.setPlayerAsSpeaker()
sm.sendSay("This place is strange... Why is everyone wearing masks?")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("Are you from outside?")

sm.setPlayerAsSpeaker()
sm.sendSay("?")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("You must be careful, this place is dangerous. Oh no, they're here!")

sm.createQuestWithQRValue(parentID, "1")
sm.warpInstanceIn(chr, 450003000, 1)