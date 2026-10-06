sm.setSpeakerID(2140001)
sm.flipDialogue()

choice = sm.sendNext("Do you see now? Do you understand the importance of the Erdas?\r\n\r\n#L0##bI...talked to them.#k")
if choice == 0:
    sm.sendNext("You spoke to the Erdas? Can this be true? I have observed the Erdas my whole life, but never have i communicated with them in any way.")
    
    choice1 = sm.sendNext("If the Erdas spoke to you... Then you have a grander fate than i suspected. The Erdas wish to give you their power, so that you can protect them.\r\n\r\n#L0##bThat sounds sweet! How does it work?#k")
    if choice1 == 0:
        sm.sendSayOkay("I do not know, but i suspect that the #bgoddess#k do. They act as the conduit between the Erdas and the people of their respective worlds. I will show you the path. You will speak to them yourself.")
        sm.completeQuest(1460)
            