# [Commerci Republic] The Minister's Son

MAYOR_BERRY = 9390201
LEON_DANIELLA = 9390202

if sm.getFieldID() == 865010200:
    sm.setSpeakerID(MAYOR_BERRY) # Mayor Berry
    sm.sendSayOkay("Find #e#bLeon Daniella#k#n in the guest house on the east end of this village.")
    sm.startQuest(parentID)
    #sm.dispose()
else:
    sm.setSpeakerID(LEON_DANIELLA) # Leon Daniella
    sm.sendSayOkay("Oi")
    #sm.dispose()
