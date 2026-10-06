# Start [Morass] Unexpected Enemy 3

FLYING_FISH = 3003409

sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#These enemies must hold some signficance for you if this is the form the Erda chose to mimic from your memory.")
sm.setPlayerBoxChat()
sm.sendNext("Well...")
sm.sendNext("I have to fight them more often than I'd like, year.")
sm.setNpcBoxChat(FLYING_FISH)
if sm.sendAskYesNo("#face0#They're clearly a very prominent figure in your mind.\r\nFor the time being, reduce their numbers by 200 as before."):
    sm.startQuest(34252)