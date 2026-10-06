# Afrien NPC (1033201) | Used for Mercedes storyline
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("Afrien? Freud? Are you okay?!")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("Mercedes... You survived.")

sm.setPlayerBoxChat()
sm.sendSay("Of course! I managed to seal him away. I can't let myself die after that! But what about you? And the others? Where are they?")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("We may have #bdefeated the Black Mage#k, but he sent everyone flying in different directions with that last spell. We're lucky we ended up in the same place.")

sm.setPlayerBoxChat()
sm.sendSay("You're right... I didn't realize how far away we ended up. At least we're safe.")

sm.setPlayerBoxChat()
sm.setBoxChat()
sm.sendSay("Now that the fight is over, I feel so weak... Not just that, but i feel so cold...")

sm.setPlayerBoxChat()
sm.sendSay("Come to think of it, has it always been snowy here? There's all this heat, and yet snow is falling... Strange...")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("You can't feel it, Mercedes? The #rgreat curse#k... It's been placed upon you, Freud, and the others.")

sm.setPlayerBoxChat()
sm.sendSay("C-curse?")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("There's an icy cold curse clinging to you. You might have been able to shrug it off if you weren't weak from fighting the Black Mage. It looks like he's not letting us off so easily...")

sm.setPlayerBoxChat()
sm.sendSay("You should be able to survive it, at least. But I'm worried about Freud... He's too weak.")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("I'll take care of him. For now, I'm more worried about you, Mercedes. #bYou're the ruler of the Elves#k. If the curse is on you, #rwon't it be placed upon all of the Elves#k?")

sm.setPlayerBoxChat()
sm.sendSay("...!")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("Hurry back to #bElluel#k. If the #bBlack Mage's curse is on all of the Elves#k, then you must return to your people.")

sm.setPlayerBoxChat()
sm.sendSay("All right! Afrien... We will meet again!")

sm.setSpeakerID(1033201)
sm.setBoxChat()
sm.sendSay("...I pray you're right.")

sm.setPlayerBoxChat()
if sm.sendAskYesNo("#b(The other heroes will make it through somehow. For now, return to town using your return skill.)"):
    sm.warpInstanceIn(chr, 910150001, 0)
else:
    sm.lockInGameUI(False, False)