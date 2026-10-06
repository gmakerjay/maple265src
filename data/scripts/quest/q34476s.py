# Start [Arcana] The Sickly Spirit Tree

ROCK_SPIRIT = 3003314

sm.setSpeakerID(ROCK_SPIRIT)
if sm.sendAskYesNo("Fowwoe me! I know a showtcut!"):
    sm.startQuest(34476)
    sm.warpInstanceIn(chr, 940200300, False)
    sm.setInstanceTime(20 * 60, 450005400)