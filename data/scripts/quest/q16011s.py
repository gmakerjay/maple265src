from net.swordie.ms.constants import QuestConstants

sm.setSpeakerID(9010106)
sm.sendNext("'Sup! How's your #bLegion#k?\r\nMaking decent gains? Either way, I'm sure it's a load off having people who've got your back.")
if sm.sendAskYesNo("Listen, the dragon population on the island is getting out of hand... WE NEED TO GO BACK!\r\n\r\n"
               "The #rHuge Dragons#k that live in the #rDragon's Domain#k are guarded by a horde of #bDragon Whelps#k. "
               "Exterminate #b100#k of them so they never grow big enough to cause trouble.\r\nConsider it a #rtraining "
               "mission#k for your Legion. Plus, I'll give you #b#i4310229:# #t4310229# x10#k as a reward.\r\n\r\nWhat "
               "do you say?\r\n\r\n#r#eNOTE:#n This quest can only be completed once per world per day.#k"):
    sm.deleteQuest(QuestConstants.UNION_FIRST_QUEST)
    sm.startQuest(QuestConstants.UNION_FIRST_QUEST)
else:
	sm.sendSayOkay("Come visit me whenever you're ready for a #bmission#k")