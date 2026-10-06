from net.swordie.ms.constants import JobConstants

if sm.getFieldID() == 450002201:
    sm.startQuest(34200)
    sm.completeQuest(34200)
    sm.warpInstanceOut(chr, 450002000)
else:
    if JobConstants.isDemonAvenger(chr.getJob()):
        sm.warpInstanceIn(chr, 450002201)
    else:
        sm.warpInstanceIn(chr, 450002200)
