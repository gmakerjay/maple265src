# 37620 - [Reverse City] Surviving in the Reversed City
sm.setSpeakerID(3004602)
sm.sendNext("Talk to #bRasol#k in #rSubway Tunnel Refuge#k.")
if sm.getEmptyInventorySlots(2) >= 1:
    sm.startQuest(37620)
    sm.completeQuest(37620)
    sm.giveItem(2635509, 20)
    sm.sendSayOkay("You have completed the #bReverse City#k storyline and received #b#i2635509# #z2635509# x 20#k!")
else:
    sm.sendSayOkay("Please make at least 1 empty slot in your USE inventory.")
