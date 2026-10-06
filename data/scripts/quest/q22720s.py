# ParentID: 22720
# Character field ID when accessed: 331001000
# ObjectID: 0
JAY = 1531001
KINESIS = 1531000
sm.lockInGameUI(True, False)

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("Your system is running well, and there wasn't a big problem this time. For now focus on accumulating data. We'll upgrade you when you've accumulated enough data.")

sm.setSpeakerID(KINESIS)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("You'd better start preparing the next version. I've been doing so well these days that I'll need another upgrade soon.")

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("Kinesis. I'm up to my neck in work because of you. I spent yesterday deleting your shadows in th surveilance videos of three different neighborhoods.")
sm.sendNext("If you're going to play hero, then please, at least cover your face, will you?")
selection = sm.sendNext("What do you think about hiding your face?\r\n"
                        "#L0##bNo. Why should I?#l \r\n" 
                        "#L1#I don't have time for that.#l \r\n"
                        "#L2#The world has a right to see this handsome face.#l")
if selection == 2:
    sm.sendNext("Sigh, so that's your answer. I should've know.")
    sm.setSpeakerID(KINESIS)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("If you really want me to hide my face, then maybe you should let me borrow your silly mask.\r\n I don't mind being a cat-man for a day.")
    
    sm.setSpeakerID(JAY)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("No. You're my friend, but even you can't touch my things. You'll contaminate them with gems form the outside world.")
    #TODO show effect Jay card.
    sm.sendNext("Oh, right. While you were away, #bYoona#k came by, angry. She asked me to give this to you.")
    
    
    sm.setSpeakerID(KINESIS)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("Ack, what's this boring-looking thing? It's the Student Council minutes.")
    
    sm.setSpeakerID(JAY)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("Yoona said she'd be waiting for you at school. You'd better hurry before she gets angrier.")

    sm.setSpeakerID(KINESIS)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("#b(Get out of here and look for Yoona.)")
    sm.startQuest(parentID)
elif selection == 1 or selection == 0:
    sm.lockInGameUI(False, False)
    #sm.dispose()
    
sm.lockInGameUI(False, False)