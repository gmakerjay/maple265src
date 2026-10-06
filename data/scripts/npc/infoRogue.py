sm.setBoxChat()
sm.sendNext("Thieves are a perfect blend of luck, dexterity, and power that are adept at the surprise attacks against helpless enemies. A high level of avoidability and speed allows Thieves to attack enemies from various angles.")
response = sm.sendAskYesNo("Would you like to experience what it's like to be a Thief?")
if response:
    sm.warp(1020400)
else:
    sm.sendNext("If you wish to experience what it's like to be a Thief, come see me again.")