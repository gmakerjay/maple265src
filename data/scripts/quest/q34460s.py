# Start [Arcana] Blooms Under the Moon

SMALL_SPIRIT = 3003303

sm.setSpeakerID(SMALL_SPIRIT)
sm.sendNext("...Let's move the Floral Flute to the place that gets the most moonlight! Well... the Floral Flute is way too big to transport as it stands.")
sm.sendSay("There's still life in these blossoms...We still have hope!")
if sm.sendAskYesNo("But we can cut a trimming from the withered Floral Flute and plant it in the place with the most moonlight!"):
    sm.setSpeakerID(SMALL_SPIRIT)
    sm.sendNext("Let's plant it in the place with the most moonlight! Go, go, go!")
    sm.startQuest(34460)
    sm.completeQuest(34460)
    sm.warp(450005000)