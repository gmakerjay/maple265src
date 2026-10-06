# Start [Arcana] The Spirit Tree's Return

sm.setPlayerAsSpeaker()
sm.flipDialogue()
if sm.sendAskYesNo("#b(Every minute the missing spirit is out here, it's in danger. You should escort it to safety immediately.)#k"):
    sm.chat("All monsters must be eliminated before you can move to the next area.")
    sm.startQuest(34464)
    sm.warpInstanceIn(chr, 940200220, False)
    sm.setInstanceTime(20 * 60, 450005220)