sm.setSpeakerID(1540942)
sm.flipDialogue()
sm.sendNext("It is a simple question, really.")

sm.flipDialogue()
selection = sm.sendNext("What is it that you want to protect the most in this world?\r\n\r\n#L0#Friends whom i went on adventures with#l\r\n#L1#The people of Maple World#l")

if selection == 0 or selection == 1:
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendNext("I've met many friends while travelling around Maple World. I could'nt have all these good memories or become so strong if it were'nt for them.")    
    
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendSay("They're somewhere in this world on their own adventure, even as we speak. I want to protect them.")
    
    sm.setSpeakerID(1540942)
    sm.flipDialogue()
    sm.sendSay("I see. That must not have been easy to answer. People have many things that are precious to them. There is no right answer... I simply wanted to know where your priorities lie.\r\n\r\n#i2435734##b#t2435734# x1#k")
    
    if sm.getEmptyInventorySlots(2)>= 1:
        sm.flipDialogue()
        sm.sendSay("This stone is called #bArcane Stone#k. Record your strength with the stone, and the energy of Erda will optimize itself for you and be absorbed into your body.")
        
        sm.flipDialoguePlayerAsSpeaker()
        sm.sendPrev("I've passed the goddess's test and obtained an Arcane Stone. I should go to another goddess.\r\n\r\n#p1540943#: Pantheon's #m400000001#\r\n#p1540944#: Dark World Tree's #m105300000#")
        sm.completeQuest(1462)
    else:
        sm.flipDialogue()
        sm.sendPrev("I have something to give you, but you're carrying too many items. Please empty 1 Use slot, and then talk to me again")
