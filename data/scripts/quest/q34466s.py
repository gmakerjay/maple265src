# Start [Arcana] Finding the Bramble Harp

SMALL_SPIRIT = 3003301

sm.lockUI()
sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face4#(Sniffs) I told myself I was done crying...")
sm.sendNext("#face5#But the tear wont stop dropping...")
sm.setPlayerBoxChat()
sm.sendNext("#b(The trail of light is back again... Is it trying to lead us somewhere?)#k")
sm.sendNext("#b(But that's back towards all the corrupted spirits...)#k")
sm.sendNext("Small Spirit, we should follow that trail of lights. It's led us this far...")
sm.unlockUI()
sm.startQuest(34466)