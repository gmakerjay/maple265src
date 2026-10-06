npc = 1401004

sm.setSpeakerID(npc)
if sm.sendAskAccept("#h0#, could you spare me a moment? I received a request for help, and I can't think of anyone better than you."):
    sm.sendNext("There has been an incident at the #bEllinel Fairy Academy#k. A human magician has trespassed in the sacred halls of the fairy school.")
    if sm.sendAskYesNo("Fanzy will take you into the land of the fairies. I can send you to him directly, if you'd like."):
        sm.startQuest(parentID)
        sm.warp(101030000)
