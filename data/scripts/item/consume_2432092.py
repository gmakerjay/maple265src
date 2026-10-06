# 2432092 - Gollux Left-Shoulder Teleport Rock
GOLLUX_MAPS = [863010100, 863010200, 863010210, 863010220, 863010230, 863010240, 863010300, 863010310,
               863010320, 863010330, 863010400, 863010410, 863010420, 863010430, 863010500, 863010600]
sm.setSpeakerID(9390124) #Heart Tree Guardian
if sm.getInstance() is not None and chr.getFieldID() in GOLLUX_MAPS:
    if chr.getFieldID() == 863010430:
        sm.sendSayOkay("You are already within the map requested.\r\nYou must enter another map if you wish to use the item.")
    else:
        sm.warp(863010430)
        sm.consumeItem(2432092)
else:
    sm.sendSayOkay("You're not currently fighting the Gollux Boss.\r\nThe item has been maintained and you have not been teleported.")