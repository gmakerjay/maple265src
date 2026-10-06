Dark_Mask = 3003218
Protective_Mask = 3003205

sm.setPlayerAsSpeaker()
sm.sendNext("Where is that music coming from?")

sm.setSpeakerID(Dark_Mask)
sm.flipDialogue()
sm.sendSay("Aren't you afraid? Leave me alone, I want to live!")

sm.setPlayerAsSpeaker()
sm.sendNext("#rYou're the awakened one!#k")

sm.setSpeakerID(Dark_Mask)
sm.flipDialogue()
sm.sendSay("What's the point of being awake if we're still trapped inside their dream?!")

sm.flipDialogue()
sm.sendSay("Do you think that woman doesn't know what you're up to? It's just a matter of time...")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("Did you see Lucid? You know something, don't you?")

sm.setSpeakerID(Dark_Mask)
sm.flipDialogue()
sm.sendSay("Pshh. I'm out of here. Getting caught with you is a one-way ticket to an afterlife!")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("Wait, it's dangerous to skulk around carelessly. It's better to hide in plain sight among those who still sleep...")

sm.setSpeakerID(Dark_Mask)
sm.flipDialogue()
sm.sendSay("Execuse me. Don't mind me, just passing through.")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("I'll go after him.")

sm.setPlayerAsSpeaker()
sm.sendSay("(Both of them disappeared to the right. You should follow them!)")

sm.startQuest(parentID)