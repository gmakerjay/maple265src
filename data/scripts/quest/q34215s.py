Simia = 3003151
Pimi = 3003153

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendNext("We couldn't have made it without you!")

sm.flipDialogue()
sm.sendSay("Why don't you give it a try?")

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sm.sendSay("How is it? Will Muto like it?")

sm.setPlayerAsSpeaker()
sm.sendSay("Huh. This is actually pretty okay, considering the horrible things we put inside it. But...")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("But?!")

sm.setPlayerAsSpeaker()
sm.sendSay("It's... A little on the #bbland#k side.")

sm.setPlayerAsSpeaker()
sm.sendSay("The sandwich I gave Muto was a lot more flavorful. It wasn't extactly health food.")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("Let me try a bite...\r\nHmm... I think I see what you mean.")

sm.flipDialogue()
sm.sendSay("I've never made a dish this large... so there probably #risn't enough seasonning#k...")

sm.setPlayerAsSpeaker()
sm.sendSay("Then what would you suggest..? We don't have alot of time here.")

sm.setSpeakerID(Simia)
sm.flipDialogue()
sm.sendSay("I know something that would add a lot of flavor... But it's not easy to come by.")

sm.flipDialogue()
sm.sendSay("Well, we have to grind up the #rfruit of the Slurpy Tree#k.")

sm.flipDialogue()
sm.sendSay("The #rSlurpy Tree#k is a big, scary #rman-eating tree#k... That's part of why it's hard to get harvest the #rSlurpy Fruit#k...")

sm.flipDialogue()
sm.sendSay("Wait! #h0#! I'm sorry for making such a difficult request, but...")

sm.startQuest(parentID)
