# Fast Job Advance Universal Script for MapleStory Server Runner
# Directly delegates to character's JobHandler to execute robust, 
# branch-aware job advancement and full 1st-4th skill unlocking.

def open_fast_job_advance(sm, chr):
    if chr != None and chr.getJobHandler() != None:
        chr.getJobHandler().handleJobAdvance()
    else:
        sm.sendSayOkay("Unable to process Job Advancement at this time.")

if 'sm' in globals() and 'chr' in globals():
    open_fast_job_advance(sm, chr)
