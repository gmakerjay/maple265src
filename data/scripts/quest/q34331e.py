Protective_Mask = 3003251

sm.lockUI()
sm.removeEscapeButton()

sm.setPlayerBoxChat()
sm.sendNext("Is it over? Is that it?")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("#face0# I... think it's over. But the barrier around the city hasn't disappeared yet.")

sm.setPlayerBoxChat()
sm.sendNext("What are you going to do now?")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("#face0#Dreams and reality are separate once more. And now, just like any other, this dream will slowly fade away...")

sm.setPlayerBoxChat()
sm.sendNext("But if the dream end, then you'll...")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("#face0# The nightmare must vanish when the day breaks.")
sm.sendNext("#face0# If the people, or the Erdas are safe, then that means I've fullilled my purpose. It doesn't matter if I disappear.")

sm.setPlayerBoxChat()
sm.sendNext("...")

sm.setNpcBoxChat(Protective_Mask)
sm.sendNext("#face0# I guess you'll resume your guest when the fog is filled.")
sm.sendNext("#face0# It will be a difficult journey, but I hope you'll return safely.")

sm.completeQuest(34331)

sm.unlockUI()