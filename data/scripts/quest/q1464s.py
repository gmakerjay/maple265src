sm.setSpeakerID(1540944)
sm.flipDialogue()
sm.sendNext("Maple World is a world of order and rules whereas Masteria is a world of chaos and uncertainly. For a long time we've been acting as the shadows of this world.")

sm.flipDialogue()
sm.sendSay("Truth be told, i don't want to help Maple World, but our world is not complete without it. The Black Mage must be gone for our sake and for everyone else's.")

sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("So are you going to help me?")

sm.setSpeakerID(1540944)
sm.flipDialogue()
sm.sendSay("Huh? I did'nt say that.")

sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("...")

sm.setSpeakerID(1540944)
sm.flipDialogue()
sm.sendSay("...")

sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("...")

sm.setSpeakerID(1540944)
sm.flipDialogue()
selection = sm.sendNext("All right, all right, don't look at me like that. I'll help you. But i want to test you first.\r\n\r\n#L0#What test?#l")

if selection == 0:
    sm.flipDialogue()
    selection2 = sm.sendNext("It's a simple test to see how lucky you are. I'm going to send you out of this place. You'll have to come back, but the entrance to this place will have been moved someplace else.\r\n\r\n#L0#Wait, that's unfair?#l")
    if selection2 == 0:
        sm.flipDialogue()
        sm.sendNext("I'm not going to wait for you long. Prove to me how lucky you are.\r\n\r\n#b(Find a Horizon Portal near the upper side of the World Tree inside 5 minutes.)#k")
        
        sm.flipDialogue()
        sm.sendNext("Oh wow, you've found your way back in.")
        
        sm.flipDialoguePlayerAsSpeaker()
        sm.sendSay("...")
        
        sm.setSpeakerID(1540944)
        sm.flipDialogue()
        sm.sendSay("I was just messing with you. This is what you want, right? I was going to give it to you from the beginning. Here take it.\r\n\r\n#i2435735##b#t2435735# x1#k")
        
        if sm.getEmptyInventorySlots(2)>= 1:            
            sm.flipDialoguePlayerAsSpeaker()
            sm.sendPrev("I've passed the goddess's test and obtained an Arcane Stone. I should go to another goddess.\r\n\r\n#p1540942#: Henesys's #m100000201#\r\n#p1540943#: Pantheon's #m400000001#")
            sm.startQuest(1464)
            sm.completeQuest(1464)
    else:
        sm.flipDialogue()
        sm.sendPrev("I have something to give you, but you're carrying too many items. Please empty 1 Use slot, and then talk to me again")
