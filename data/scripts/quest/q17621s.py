# [Commerci Republic] Gilberto Daniella

sm.showFade(1000)
sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("Time is money, and my time is worth a million mesos a minute. Now, please make an appointment.")

sm.spawnNpc(9390225, -104, 75) # Spawn Tepes
sm.flipNpcByTemplateId(9390225, False)

sm.setSpeakerID(9390225) # Tepes
sm.setBoxChat()
sm.sendNext("Actually, sir, this young Explorer got our stolen goods back")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("Excuse me? Our goods were stolen?")

sm.setSpeakerID(9390225) # Tepes
sm.setBoxChat()
sm.sendNext("Er, you see, sir, these cutthroat bandits stole the goods right out of my hands. I fought back and even fore my pants, but it was this young Explorer who saved me. I'll... be on my way now.")
            
sm.removeNpc(9390225) # Remove Tepes

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("#b(Tepes is a pretty convincing liar.)")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("Ah, well, in that case, I thank you for your help, young Explorer.")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Aw, shucks. Tepes is exaggerating.. a lot.")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("It is a pleasure to meet you. I am #e#bGilberto Daniella#k#n, prime minister of the Commerci Republic and owner of the Daniella Merchant Union.")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("The pleasure is mine. My name is #h0# and I am here on vacation.")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("Ah, to be young and free again! But why did you want to see me?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("um... Well... (Okay, I'm going to have to word this carefully)")

sm.spawnNpc(9390256, 21, 75) # Spawn Leon Daniella
sm.flipNpcByTemplateId(9390256, False)

sm.setSpeakerID(9390256) # Leon Daniella
sm.setBoxChat()
sm.sendNext("Father! I'm hooooooome!")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("How many times do I need to remind you to call me 'prime minister' in public, Leon?")

sm.setSpeakerID(9390256) # Leon Daniella
sm.setBoxChat()
sm.sendNext("Sorry pops, I mean prime minister pops. I'm back from my voyage. Didn't even bruise my knees this time.")

sm.setSpeakerID(9390256) # Leon Daniella
sm.setBoxChat()
sm.sendNext("Yo! #h0#, my best frined sidekick. You made it!")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("You two know each other? This young traveler retrieved some stolen goods for us... Or defeated some bandits? I'm still not clear on the story.")

sm.setSpeakerID(9390256) # Leon Daniella
sm.setBoxChat()
sm.sendNext("Way to go, #b#h0##k, buddy! First you saved me in Berry, like the excellent sidekick you are, and now you're impressing my daddy!")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("You exhibit magnificent skills for a mere traveler, #h0#. The union is in your debt.")

sm.setSpeakerID(9390256) # Leon Daniella
sm.setBoxChat()
sm.sendNext("A mere traveler? but #h0# is from beyond the barrier.")
sm.sendNext("Mere traveler? Puh-lease, daddy-o. #b#h0##k's an ambassador of peace in place of Empress Cygnus AND my sidekick. At first I thought he was from the #bHeaven#k Empire. Pfft, 'traveler'.")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("#h0# is...what?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("(Yikes!) Er, yeah, I TRAVELING here in place of Empress Cygnus, in the interest of peace...")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("Just a moment ago, you clearly said you were a tourist...")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Look, I'm gonna level with you Prime Minister. Commerci hasn't had much in the way of interaction with the rest of Maple World and suddenly you guys are sending ships around the globe. Empress Cygnus is understandably concerned...")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("And why, precisely, are you here?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Like Leon said, I'm here as an ambassador of peace, on behalf of Empress Cygnus.")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("An ambassador of peace, you say?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Yes. Empress Cygnus wants to establish a treaty of peace and mutual cooperation with the Commerci Republic.")

sm.setSpeakerID(9390203) # Gilberto Daniella
sm.setBoxChat()
sm.sendNext("I see. Well then, you've traveled a long way. Please make yourself at home and rest. The Union is still in your debt.")

sm.removeNpc(9390256) # Remove Leon Daniella
sm.startQuest(17621)
sm.completeQuest(17621)
sm.warp(865000002, 0)
