#
# @author baking legion needs
# @npc Dame Appropiation - Legion Manager
# @quest [Legion] Defeat the Golden Wyvern
#

sm.setSpeakerID(9010106)
sm.sendNext("Hey!\r\nHow's your #bLegion#k?\r\nWatching your Legion grow in strength fills me with pride.")
if sm.sendAskYesNo("I have a #rtraining mission#k for you and your legion.\r\n\r\nSometimes, when you've defeated "
                       "enough #bDragon Whelps#k, a rare #rGolden Wyvern#k appears. Defeat #b20#k of them and I'll give "
                       "you #b#i4310229:# #t4310229# x20#k as a reward.\r\n\r\nThink you're up for the challenge?"
                       "\r\n\r\n#r#eNote:#k This quest can only be completed once per world per day.#k"):
    sm.deleteQuest(16012)
    sm.startQuest(16012)
else:
    sm.sendSayOkay("Come visit me whenever you're ready for a #bmission#k")