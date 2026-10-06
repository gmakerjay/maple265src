# End [Arcana] Reviving the Bramble Harp 2

SMALL_SPIRIT = 3003301
TREE_SPIRIT = 3003327

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face1#You brought the Volatile Shrieks! Quickly, place them on this side of the tree...")
sm.completeQuest(34468)
sm.lockUI()
sm.sendDelay(3000)
sm.setNpcBoxChat(TREE_SPIRIT)
sm.sendNext("Whatever you're doing, stop it right now!")
sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face1#Uh oh... those shrieks got the attention of the Tree Spirits...")
sm.unlockUI()