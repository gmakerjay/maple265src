sm.setSpeakerID(2140001)
sm.flipDialogue()
sm.sendNext("Wait. I have something to tell you before you head for Arcane River.")
sm.flipDialogue()
if sm.sendNext("Do you remember one of the things that Erdas told you?\r\n#b#L0#I remember.#l#k") == 0:
    sm.flipDialogue()
    sm.sendNext("#fNpc/3003113.img/stand/0#\r\nThat poor child could not discover their identity in the end. I imagine one would do anything to know. Anything.")
    sm.flipDialogue()
    if sm.sendNext("When the temple keepers went through the Gate of the Present to investigate the abnormal flow of Erda, that child disappeared with them.\r\nI wanted to dissuade them, but I was too late.\r\n\r\n#b#L0#I will go through the Gate of the Present and find them.#l#k") == 0:
        sm.flipDialogue()
        if sm.sendNext("Wait. The monsters in Arcane River are born from a river that flows with the highest concentration of Erdas we have ever seen...\r\n\r\nYou must possess #eArcane Power#n, or all your strength with come to nothing.\r\n\r\n#b#L0#Arcane Power?#l#k") == 0:
            sm.flipDialogue()
            sm.startQuest(1466)
            sm.startNavigation(parentID, 270010111)
            sm.sendSayOkay("Seeing is believing. Go and hunt some of the monsters there. Return when you've had enough.\r\n\r\n#b(Hunt some of the monsters you first encounter at Arcane River, beyond the Gate of the Present, and then go back to the Memory Keeper.)#k")