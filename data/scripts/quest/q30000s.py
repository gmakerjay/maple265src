# [Root Abyss] An Urgent Summons

NEINHEART = 1064026
EREVE = 913080000
SILENT_SWAMP = 105010000 # Map you get warped to after the conversation

if sm.getFieldID == SILENT_SWAMP:
    sm.setSpeakerID(NEINHEART)
    if sm.sendAskYesNo("#b#h0##k! Your presence is needed in Ereve right away. We haven't a second to lose"):
        sm.sendNext("I will transport you here.")
        sm.warpInstanceIn(chr, EREVE)
