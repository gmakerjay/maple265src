sm.setBoxChat()
sm.sendNext("Pirates are blessed with outstanding dexterity and power, utilizing their guns for long-range attacks while using their power on melee combat situations. Gunslingers use elemental-based bullets for added damage, while Infighters transform to a different being for maximum effect.")
response = sm.sendAskYesNo("Would you like to experience what it's like to be a Pirate?")
if response:
    sm.warp(1020500)
else:
    sm.sendNext("If you wish to experience what it's like to be a Pirate, come see me again.")