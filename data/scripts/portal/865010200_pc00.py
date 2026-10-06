# 865010200
if sm.hasQuestCompleted(17612) and not sm.hasQuestCompleted(17613):
    sm.startQuest(17613) # [Commerci Republic] The Minister's Son
    sm.warpInstanceIn(chr, 865090001, 1)
else:
    sm.warpInstanceOut(chr, 100000000)