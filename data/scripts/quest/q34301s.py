Gray_Mask = 3003209
Protective_Mask = 3003201

sm.setSpeakerID(Gray_Mask)
sm.flipDialogue()
sm.sendNext("Protective Mask, you sure are fearless for one so young. You were almost in big trouble.")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("I couldn't leave that person at her mercy.")

sm.setSpeakerID(Gray_Mask)
sm.flipDialogue()
sm.sendSay("Indeed. You sure have a lot of guts to get so close to her, stranger. Of course maybe you don't know any better...\r\nWell, you're safe now.")

sm.setPlayerAsSpeaker()
sm.sendSay("Who was that woman?")

sm.setSpeakerID(Gray_Mask)
sm.flipDialogue()
sm.sendSay("Her name is '#bLucid#k'. Her power is unlike anything I've ever seen. She has the ability to manipulate dreams. In fat, #bLachelein#k is really just one great big prison plucked from her own dreams. And we're the prisoners.")

sm.setPlayerAsSpeaker()
sm.sendSay("I see. So that's why they call it the Dreaming City...")

sm.setSpeakerID(Gray_Mask)
sm.flipDialogue()
sm.sendSay("Hah. For us, it's a city of nightmares.")

sm.startQuest(parentID)
sm.completeQuest(parentID)