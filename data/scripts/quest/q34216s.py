Lyon = 3003150
Master_Lyck = 3003152

sm.removeEscapeButton()
sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("It's #rGulla#k! #rGulla has begun his assault#k!")
sm.sendNext("#bMaster Lyck#k! Have you completed your meal for Muto?")

sm.setSpeakerID(Master_Lyck)
sm.setBoxChat()
sm.sendNext("Of course! Just you watch, Muto will be #bjumping for joy#k because it's so good!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Oh! What a relief! But what happened to that #bstrange little traveler#k who went off to make their own dish?")

sm.setSpeakerID(Master_Lyck)
sm.setBoxChat()
sm.sendNext("Slurp-slurp! Surely off cowering in fear! Hmph.\r\nThat runt doesn't know a thing about taste, and they dared to lecture ME about flavor! Well, now their true colors are showing!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Um. Anyways Master Lyck, we should take your masterpiece to Muto!")

sm.setPlayerBoxChat()
sm.sendNext("W-wait! I'm here! (Huffs) The food... It's ready!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Oh! You're back!")

sm.setPlayerBoxChat()
sm.sendNext("(Pants) Yes! Let's go to Muto...")

sm.setSpeakerID(Master_Lyck)
sm.setBoxChat()
sm.sendNext("What? Where is this food you speak of? Don't tell me you made something small... Your last offering was smaller than one of Muto's boogers!")

sm.setPlayerBoxChat()
sm.sendNext("(Breathes heavily) I prepared #ban amazing dish#k... and I had #bhelp from an excellent chef#k...")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Oh! An #bassistant#k? Well that's nice. Who are they?")

sm.setSpeakerID(Master_Lyck)
sm.setBoxChat()
sm.sendNext("Slurp-slurp! Liar! There's no one on Chu Chu Island that cooks half as well as me!")

sm.setPlayerBoxChat()
sm.sendNext("Hey, uh, aren't we a little short on time here? We should get to Muto! My #bassistant#k is already bringing our dish there!")

sm.startQuest(34216)
sm.completeQuest(34216)
sm.warp(450002021)