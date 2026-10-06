# End [Arcana] When the Spirit Tree Bloomed

SMALL_SPIRIT = 3003301

sm.lockUI()
sm.blind(1, 255, 0, 0)
sm.hideUser(True)
sm.sendDelay(1500)
sm.OnOffLayer_On(1000, "0", 0, 0, 0, "Effect/Direction19.img/effect/arcana_play/0", 4, 1, -1, 0)

sm.sendDelay(1000)

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face7#That tree you see in the distance once resonated with the song of a harmonious forest, and blossomed with beautiful flowers. We strolled beneath the Spirit Tree's branches and were happy.")

sm.OnOffLayer_On(1000, "1", 0, 0, 0, "Effect/Direction19.img/effect/arcana_play/4", 4, 1, -1, 0)
sm.sendDelay(1000)
sm.OnOffLayer_On(2000, "2", 0, 0, 0, "Effect/Direction19.img/effect/arcana_play/2", 4, 1, -1, 0)

sm.sendDelay(1000)

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face7#The Spirit Tree sheltered us from danger, and the places where its petals fell overfollowed with life.")

sm.OnOffLayer_On(1000, "3", 0, 0, 0, "Effect/Direction19.img/effect/arcana_play/1", 4, 1, -1, 0)
sm.sendDelay(1000)
sm.OnOffLayer_On(2000, "4", 0, 0, 0, "Effect/Direction19.img/effect/arcana_play/3", 4, 1, -1, 0)

sm.sendDelay(1000)

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face5#...")
sm.sendNext("#face5#...But the song of the forest grew silent, and tradegy befell us.")
sm.sendNext("#face5#Wild, discordant spirts began to appear, and the forest slowly began to die.")

sm.OnOffLayer_Off(1000, "4", 0)
sm.OnOffLayer_Off(1000, "2", 0)
sm.OnOffLayer_Off(1000, "1", 0)
sm.OnOffLayer_Off(1000, "3", 0)

sm.sendDelay(2000)

sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face5#So too did the Spirit Tree begin to wither...")
sm.sendNext("#face4#As the Spirit Tree withered, it became shrouded in an evil stench")
sm.sendNext("#face4#The Vortex of Light appeared shortly afterwards. It must be connected to the deterioration of the Spirit Tree.")

sm.OnOffLayer_Off(100, "0", 0)
sm.sendDelay(1000)

sm.blind(0, 0, 0, 300)
sm.hideUser(False)
sm.unlockUI()

sm.completeQuest(34452)