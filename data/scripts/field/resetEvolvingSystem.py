if sm.hasQuest(1802):
    sm.flipSpeaker()
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendSayOkay("#b(So, this is Gelimer's laboratory. These machines look so weird... I wonder what they do.)")
    sm.completeQuest(1802)
elif sm.hasQuest(1846):
    sm.warpInstanceIn(chr, 957020005)