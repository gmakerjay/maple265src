# Start [Arcana] The Song of the Bramble Harp

SMALL_SPIRIT = 3003301
TREE_SPIRIT = 3003327
RESCUED_TREE_SPIRIT = 3003328

sm.lockUI()
sm.setNpcBoxChat(TREE_SPIRIT)
sm.sendNext("I knew it! You pretended not to be the same stranger, but you're clearly up to no good...")
sm.forcedInput(2)
sm.sendDelay(4000)
sm.forcedInput(0)
sm.setNpcBoxChat(TREE_SPIRIT)
sm.sendNext("The harp is dead! Just like this slowly-withering forest...\r\nThere is no hope, no coming back")
sm.sendNext("You ignored our warning, stranger. Now you will face the consequences.")
sm.sendDelay(1000)
sm.showEffectOnPosition("Effect/Direction19.img/effect/arcana_tree/0", 1000, chr.getPosition().getX(), chr.getPosition().getY())
sm.sendDelay(1000)
sm.showEffectOnPosition("Effect/Direction19.img/effect/arcana_tree/1", 10000, chr.getPosition().getX(), chr.getPosition().getY())
sm.setNpcBoxChat(RESCUED_TREE_SPIRIT)
sm.sendNext("#face0#No, stop!")
sm.sendDelay(1000)
sm.setNpcBoxChat(SMALL_SPIRIT)
sm.sendNext("#face5#Ah, that beautiful sound... How I've missed it.")
sm.unlockUI()
sm.startQuest(34469)
