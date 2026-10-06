sm.setBoxChat()
sm.sendNext("Magicians are armed with flashy element-based spells and secondary magic that aids party as a whole. After the 2nd job adv., the elemental-based magic will provide ample amount of damage to enemies of opposite element.")
response = sm.sendAskYesNo("Would you like to experience what it's like to be a Magician?")
if response:
    sm.warp(1020200)
else:
    sm.sendNext("If you wish to experience what it's like to be a Magician, come see me again.")