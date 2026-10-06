OLLIE = 3003652
LIGHT_EXECUTOR = 3003504

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#I can tell the mirror's power is getting stronger as we move on. We must be getting closer to where Tana ended up!")
sm.setPlayerBoxChat()
sm.sendNext("Is that a bookshelf?")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("Your staff. Use it on the bookshelf.")
sm.completeQuest(34575)
