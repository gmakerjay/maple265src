# Character field ID when accessed: 100020000
# ParentID: 25511
# ObjectID: 0
VIEREN = 1032209
sm.removeEscapeButton()
sm.setSpeakerID(VIEREN)
sm.setBoxChat()   
sm.sendNext("Luminous, I've gathered the power of all the Auguries.")
sm.sendNext("Remember, it's up to you to conquer your darkness. The Auguries will only help so much.")

sm.setPlayerBoxChat()
sm.sendNext("Have faith. I won't let the Dark take me again!")

sm.setSpeakerID(VIEREN)
sm.setBoxChat()   
sm.sendNext("Focus on this saying: #b<The light shines brightest in the deepest dark.>#k Okay, here we go!")

sm.setPlayerBoxChat()
sm.sendNext("AAAUGH!")

sm.setSpeakerID(VIEREN)
sm.setBoxChat()   
sm.sendNext("You did it! That wasn't so bad, was it?")

sm.setPlayerBoxChat()
sm.sendNext("(What is this new energy that courses through my body? It's as though the Light and Dark merged into one...)")

sm.setSpeakerID(VIEREN)
sm.setBoxChat()   
sm.sendNext("You should rest up for now. We can talk later.")
sm.jobAdvance(2711)
sm.completeQuestNoRewards(25511)