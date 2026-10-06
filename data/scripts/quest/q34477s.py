# Start [Arcana] The Evil Within

SMALL_SPIRIT = 3003301

sm.setSpeakerID(SMALL_SPIRIT)
sm.flipDialogue()
sm.sendNext("#face0#Ahhh! The evil in the tree... It feels like it's trying to spread!")

sm.setPlayerAsSpeaker()
sm.flipDialoguePlayerAsSpeaker()
if sm.sendAskYesNo("#b(There are no other options left. Will you confront the evil infecting the Spirit Tree?)#k"):
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendNext("#b(The Spirit Tree is coursing with evil energy... this can't be good.)#k")
    sm.startQuest(34477)
    sm.warpInstanceIn(chr, 940200280, False)
    sm.setInstanceTime(10 * 60, 450005000)