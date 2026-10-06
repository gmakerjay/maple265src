Protective_Mask = 3003251

sm.lockUI()
sm.removeEscapeButton()

sm.blind(1, 255, 0, 1000)

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("#h0#! #h0#! I'm coming to save you!")
sm.sendNext("Argh My head... So many memories, flowing in...\r\nAhh... This is... A nightmare... #eThe#n nightmare...")
sm.sendNext("(Then... The one she's been looking for...?)")

sm.blind(0, 0, 0, 1000)

sm.setPlayerBoxChat()
sm.sendNext("Protective Mask? You saved me!")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("...")

sm.setPlayerBoxChat()
sm.sendNext("But... I thought those that fell into the Arcane River... dissolve into Erdas?")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("A being that is neither human nor Erdas would not be destroyed.")
sm.sendNext("I am what Lucid seeks.\r\nThe nightmare that Lucid fears, #bis me.#k")

sm.setPlayerBoxChat()
sm.sendNext("What?!")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("I was the only one who could peer into Lucid's memories.\r\nI was the only one who grew weak when the dream weakened.")
sm.sendNext("Back then, when I was agonizing over whether I had a 'soul'... It looks like I finally have my answer.")

sm.setPlayerBoxChat()
sm.sendNext("Protective Mask...")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("Leave, #h0#. Just leave me alone.")
sm.sendNext("I'm just another #billusion#k conjured up by Lucid's subconscious.")

sm.setPlayerBoxChat()
sm.sendNext("...")
sm.sendNext("Look. I don't know much about souls, but I do know one thing.")
sm.sendNext("The way you struggled to survive, just to save others... It's proof you were never an illusion.")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("The final music box is at the clocktower. You know what must be done.")

sm.forcedInput(1)
sm.sendDelay(4000)
sm.unlockUI()
sm.forcedInput(0)
sm.warpInstanceOut(chr, 450003000)

sm.setPlayerAsSpeaker()
sm.sendSayOkay("The Clocktower is to the far right. I need to get there, now.")