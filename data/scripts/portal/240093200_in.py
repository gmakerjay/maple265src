if sm.checkParty():
    if sm.hasQuest(31351): # [Stone Colossus] Colossal Clean Up 7
        sm.warpInstanceIn(chr, 240093310, 0, True)
    elif sm.hasQuestCompleted(31351):
        sm.warpInstanceIn(chr, 240093300, 0, True)
