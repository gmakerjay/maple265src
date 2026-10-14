# Arcane Stone of Tynerum Completion Script (Quest 1464)
# Goddess of Tynerum (1540944)

sm.setSpeakerID(1540944)
if sm.getEmptyInventorySlots(2) >= 1:
    sm.flipDialogue()
    sm.sendPrev("You passed the test of the goddess, and received the Arcane Stone. Find the other goddesses.\r\n\r\n#p1540942#: Henesys's #m100000201#\r\n#p1540943#: Pantheon's #m400000001#")
    if not sm.hasItem(2435736):
        sm.giveItem(2435736)
    sm.completeQuest(1464)
else:
    sm.flipDialogue()
    sm.sendPrev("I have something to give you, but you're carrying too many items. Please empty 1 Use slot, and then talk to me again.")
