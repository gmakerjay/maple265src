Beauty_Mask = 3003236
Classy_Cat_Mask = 3003229
Shrimp_Mask = 3003254
Protective_Mask = 3003202

sm.setSpeakerID(Beauty_Mask)
sm.flipDialogue()
sm.sendNext("Eating is happiness. Eating constantly is constant happiness. I eat constantly in the midst of happiness. My life is unending happiness.")

sm.setSpeakerID(Classy_Cat_Mask)
sm.flipDialogue()
sm.sendNext("Dance, dance, dance! That is true joy. A world without misery, without worries. A world of dance is a world of bliss.")

sm.setSpeakerID(Shrimp_Mask)
sm.flipDialogue()
sm.sendNext("(Bleches) I am h-happy. I'm happy because I'm full.")

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendSayOkay("There's been no signs of the Dreamkeepers yet.")

sm.completeQuest(34307)
