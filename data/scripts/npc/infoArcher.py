sm.setBoxChat()
sm.sendNext("Bowmen are blessed with dexterity and power, taking charge of long-distance attacks, providing support for those at the front line of the battle. Very adept at using landscape as part of the arsenal.")
response = sm.sendAskYesNo("Would you like to experience what it's like to be a Bowman?")
if response:
    sm.warp(1020300)
else:
    sm.sendNext("If you wish to experience what it's like to be a Bowman, come see me again.")