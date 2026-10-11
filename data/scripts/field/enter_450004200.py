# Lucid Cutscene Phase 1 -> 2
party = sm.getParty()
if party is not None:
    sm.warpParty(450004250, party)
else:
    sm.warp(450004250)
