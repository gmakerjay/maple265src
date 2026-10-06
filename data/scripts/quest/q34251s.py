# Start [Morass] Unexpected Enemy 2

FLYING_FISH = 3003409

sm.setNpcBoxChat(FLYING_FISH)
if sm.sendAskYesNo("#face0#You'll see soon enough. And now that you've decreased their numbers, let's continue onward. I'll meet you at the #b#m450006030##k"):
    sm.startQuest(34251)