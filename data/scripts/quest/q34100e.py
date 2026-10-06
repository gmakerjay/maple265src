kao = 3003131

sm.setSpeakerID(kao)
if sm.hasQuestCompleted(1466):
    sm.setSpeakerID(3003113)
    sm.lockInGameUI(True, False)
    sm.removeEscapeButton()
    sm.sendDelay(2000)
    sm.setBoxChat()
    sm.sendNext("There's something I have warn you about. Have you seen the large lake at the outskirts of town? The townspeople call it the Lake of Oblivion. If you fall in, you'll forget everything. Every last memory.")
    sm.sendNext("And... maybe it's due to living so close to the lake, but the people around here have been gradually losing their memory every day.")
    sm.showFieldEffect("Map/Effect2.img/ArcaneRiver1/tree1")
    sm.sendNext("That why this Tree of Memory was created. Precious memories are hung on this tree. The townspeople can come by to look at them every day until the memories wither and vanish...")
    sm.sendNext("When I heard about the tree from the townspeople, my heart started racing. I thought there might be memories related to me there, so I came to investigate. But...")
    sm.sendNext("I still don't know why. The moment I touched the tree...")
    sm.showFieldEffect("Map/Effect2.img/ArcaneRiver1/tree2")
    sm.sendDelay(500)
    sm.showFieldEffect("Map/Effect2.img/ArcaneRiver1/tree3")
    sm.sendNext("All those memories... The precious memories of the townspeople... They all scattered.")
    sm.sendNext("Everyone was heartbroken. Their daily routines came to a half. Even the boat that sails across Lake of Oblivion stopped running.")
    sm.completeQuest(34100)
    sm.lockInGameUI(False, False)
else:
    sm.sendSayOkay("...There must be some way to calm them down...\r\n\r\n#b(You must complete the quest '<A Great Power>', and obtain the Arcane Symbol.)#k")