# Will Cutscene Phase 1 -> 2
party = sm.getParty()
nextField = sm.getFieldID() + 50
if party is not None:
    sm.warpParty(nextField, party)
else:
    sm.warp(nextField)
