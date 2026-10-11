# Zakum Gatekeeper (NPC 2030013)
# In waiting rooms, warp directly into the corresponding difficulty battle map.
# Otherwise, open the Boss UI for Zakum.

field_id = sm.getFieldID()
if field_id == 211042402:
    sm.enterBoss("ZAKUM_EASY")
elif field_id == 211042400:
    sm.enterBoss("ZAKUM_NORMAL")
elif field_id == 211042500:
    sm.enterBoss("ZAKUM_CHAOS")
else:
    sm.startBossUI("Zakum")