# Universal Job Advance Script
# Automatically delegates to character's JobHandler to handle all classes (including all new jobs)
if chr != None and chr.getJobHandler() != None:
    chr.getJobHandler().handleJobAdvance()
else:
    sm.sendSayOkay("Unable to process Job Advancement at this time.")