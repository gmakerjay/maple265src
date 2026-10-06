# Magatia (261000000) => Alcadno Society

forbiddenBook = 23270
chaseAndConspiracy = 23271

# Demon story quest junctions
if sm.hasQuest(forbiddenBook):
    sm.warpInstanceIn(chr, 926150000)
elif sm.hasQuestCompleted(forbiddenBook) and not sm.hasQuest(chaseAndConspiracy) and not sm.hasQuestCompleted(chaseAndConspiracy):
    sm.warpInstanceIn(chr, 926150010)
elif sm.hasQuest(chaseAndConspiracy):
    sm.warpInstanceIn(chr, 926150020)
else:
    sm.warp(261000020, 1)