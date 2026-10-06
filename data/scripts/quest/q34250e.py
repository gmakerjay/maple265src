# End [Morass] Unexpected Enemy 1

FLYING_FISH = 3003409

sm.setPlayerBoxChat()
sm.sendNext("They're much stronger than Xenoroids!")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#The Erda will take whatever form it thinks it needs to protect itself.\r\nSometimes that includes incredible strength.")
sm.setPlayerBoxChat()
sm.sendNext("That incredible strength is slowing us down. Where are we going, anyway?")
sm.completeQuest(34250)
sm.createQuestWithQRValue(34271, "20=h1")