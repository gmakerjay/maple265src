sm.setSpeakerID(1540943)
if sm.getEmptyInventorySlots(2)>= 1:
    sm.flipDialogue()
    sm.sendPrev("You passed the test of the goddess, and received the Arcane Stone. Find the other goddesses.\r\n\r\n#p1540942#: Henersys's #m100000201#\r\n#p1540944#: Dark World Tree's #m105300000#")
    sm.completeQuest(1463)
else:
    sm.flipDialogue()
    sm.sendPrev("I have something to give you, but you're carrying too many items. Please empty 1 Use slot, and then talk to me again")
