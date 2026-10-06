sm.setNpcBoxChat(3001508)
sm.sendNext("#face0#Thank you for saving Mar. We really want to repay you, but we don't have much, as you can see from this shelter.")

sm.setNpcBoxChat(3001500)
sm.sendSay("#face0#Actually, there are some questions I'd like to ask you. Would you be willing to answer them?")


sm.setNpcBoxChat(3001508)
sm.sendSay("#face2#Well, I'm not sure I know anything you'd be interested in, but I'll do my best.")


sm.setNpcBoxChat(3001500)
sm.sendSay("#face0#(As you explain your predicament and insist that you need to find a way to get off the planet, Zippy looks crestfallen.)")


sm.setNpcBoxChat(3001508)
sm.sendSay("#face3#We don't know how to get out of here either. ")


sm.setNpcBoxChat(3001500)
sm.sendSay("#face2#What!?")


sm.setNpcBoxChat(3001508)
sm.sendSay("#face3#The other caravaners and I... we're not here by choice.")


sm.setNpcBoxChat(3001508)
if sm.sendAskAccept("#face0#I don't know much about this planet, but I can tell you more about our story."):
    sm.setNpcBoxChat(3001508)
    sm.sendNext("#face0#Just give me a moment to organize my thoughts.")
    sm.startQuest(34916)
