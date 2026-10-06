Pimi = 3003154

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sm.sendNext("Ah! Of course, you still have to gather the next ingredient.")

sm.setPlayerAsSpeaker()
sm.sendSay("Can't I rest a little bit?")

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sm.sendSay("Could you get #v4034952# #b#t4034952##k and #v4034953# #b#t##k items from #bRhyturtles#k and #bBoss Rhyturtles#k that live deep in Eree Valley?")

sm.setPlayerAsSpeaker()
sm.sendSay("Uhh... Shells? On a sandwich?")

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sm.sendSay("Are you doublting our #btaste#k?\r\nI can promise you, this sandwich will be delicious. So go and get them already... Please?")

sm.startQuest(parentID)
