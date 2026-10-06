# End [Arcana] Reviving the Bramble Harp 1

SMALL_SPIRIT = 3003301

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face3#You gathered the Deathcries! Let's smash them over on this side of the tree...")
sm.lockUI()
sm.sendDelay(3000)
sm.sendNext("It didn't work. #b(Signs)#k\r\nIt look like the noise wasn't loud enough.")
sm.unlockUI()
sm.completeQuest(34467)