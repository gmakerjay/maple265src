Balloon_Mask = 3003234
Protective_Mask = 3003202
Beauty_Mask = 3003236
Huge_Watermelon_Mask = 3003238
Pie_Mask = 3003223
Music_Box = 3003258
Dreamkeeper = 3003257
Watermelon_Mask = 3003220
Lucid = 3003250

sm.setSpeakerID(Balloon_Mask)
sm.flipDialogue()
sm.sendNext("And the winner is... Pie Mask!")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("They held the eating contest while you were gone.")

sm.setSpeakerID(Beauty_Mask)
sm.flipDialogue()
sm.sendSay("Wow! Did you see that? That was a lot of food!")

sm.setSpeakerID(Huge_Watermelon_Mask)
sm.flipDialogue()
sm.sendSay("I lost? How could I lose? I was so sure this would be my first victory!")

sm.setPlayerAsSpeaker()
sm.sendSay("I still don't understand how me breaking all the plates would have helped him win his first victory.")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("It's not like you broke ALL the plates anyway.")

sm.setSpeakerID(Pie_Mask)
sm.flipDialogue()
sm.sendSay("I did it... Look at me. I'm the winner! Admire me. I'm so happy ... Aren't I?")

sm.flipDialogue()
sm.sendSay("I don't understand... I should feel happy right now, shouldn't I? Ah!")

sm.lockUI()
sm.removeAdditionalEffect()
sm.removeEscapeButton()

sm.zoomCamera(0, 2000, 0, 624, 78)

sm.setSpeakerID(Music_Box)
sm.setBoxChat()
sm.sendNext("Ugh... I don't feel so---")

sm.setPlayerBoxChat()
sm.sendNext("He turned into a music box?!")

sm.setSpeakerID(Protective_Mask)
sm.setBoxChat()
sm.sendNext("It's just as I suspected. The music boxes are what's maintaining this dreamworld!")

sm.setSpeakerID(Dreamkeeper)
sm.setBoxChat()
sm.sendNext("The music box... Hands off...")

sm.setSpeakerID(Protective_Mask)
sm.setBoxChat()
sm.sendNext("I'll buy you some time, destroy the music box!")

sm.setPlayerBoxChat()
sm.sendNext("(It's more durable than you expected...)")

sm.setSpeakerID(Dreamkeeper)
sm.setBoxChat()
sm.sendNext("Move... You're in the way.")

sm.setSpeakerID(Protective_Mask)
sm.setBoxChat()
sm.sendNext("Destroy the music box, #h0#!")

sm.setPlayerBoxChat()
sm.sendNext("It did it!")
sm.sendNext("Protective Mask!")

sm.setSpeakerID(Dreamkeeper)
sm.setBoxChat()
sm.sendNext("We're too late... The music box...")
sm.sendNext("The dream is... fading...")

sm.resetCamera()
sm.unlockUI()

sm.setSpeakerID(Huge_Watermelon_Mask)
sm.flipDialogue()
sm.sendNext("What's going on?")

sm.setSpeakerID(Beauty_Mask)
sm.flipDialogue()
sm.sendSay("What was I doing just now?")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("My memories... Arghh! My head...")

sm.setPlayerAsSpeaker()
sm.sendSay("Protective Mask? Are you okay? What is going on?")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("Don't worry about me... Take them to safety. But where is safe...?")

sm.setPlayerAsSpeaker()
sm.sendSay("Should I take them back to the hideOut?")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSay("No. You saw how the Dreamkeepers vanished when the music box was destroyed... This place may actually be safer than the hideout.")

sm.setPlayerAsSpeaker()
sm.sendSay("Then we should return to the hideout alone.")

sm.setSpeakerID(Watermelon_Mask)
sm.flipDialogue()
sm.sendSay("Hey! let me come too!")

sm.blind(1, 255, 0, 0)

sm.lockUI()
sm.removeAdditionalEffect()
sm.removeEscapeButton()

sm.setSpeakerID(Lucid)
sm.setBoxChat()
sm.sendNext("#face0# Let me guess, you're here to say you let them interfere with my plan. Am I right?")

sm.setSpeakerID(Dreamkeeper)
sm.setBoxChat()
sm.sendNext("Awakened One... Strong... The others... Incompetent. Have mercy...")

sm.playSound("Sound/Voice3.img/Lucid/Q2/0")
sm.setSpeakerID(Lucid)
sm.setBoxChat()
sm.sendNext("#face0#I see. You must be the one my master has chosen.")

sm.playSound("Sound/Voice3.img/Lucid/Q2/1")
sm.setSpeakerID(Lucid)
sm.setBoxChat()
sm.sendNext("#face2#Or... are you here for #eme#n? Either way... It changes nothing.")

sm.playSound("Sound/Voice3.img/Lucid/Q2/2")
sm.setSpeakerID(Lucid)
sm.setBoxChat()
sm.sendNext("#face1#So go ahead, struggle with all your might. Cling to that false hope. Just as I did within that block of frigid ice. Just like me, in that unending dream...")

sm.blind(0, 0, 0, 1000)
sm.unlockUI()
sm.completeQuest(parentID)
sm.startQuest(34316)
sm.warp(450003100)

