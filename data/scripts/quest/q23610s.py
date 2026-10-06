# Character field ID when accessed: 310010000
# ParentID: 23610
# ObjectID: 0
#XENON 2ND JOB ADV
TONERO = 3001004
CLAUDINE = 2151003
sm.setSpeakerID(TONERO)
sm.setBoxChat()    
sm.sendNext("Hello to you #r#h0##k! The name's Tonero, commissionner of instructions most discreet. I have a little something for you!.")

sm.setPlayerBoxChat()
sm.sendNext("What is this?")

sm.setSpeakerID(TONERO)
sm.setBoxChat()    
sm.sendNext("I was instructed, and persuaded with monetary incentive, to bring this #bResistance Orders#k to you, no questions asked, Now then, I'm off.")


sm.setPlayerBoxChat()
sm.sendNext("What the ?? He just disappeared!\r\n Who sent me secret instructions?")

sm.setSpeakerID(CLAUDINE)
sm.setBoxChat()    
sm.sendNext("Dear #r#h0##k, I hope you're doing well. It hasn't been easy to track you down, but I think that's probably good, all things considered. I apologize for the odd man we had to choose as a messenger, but I assure you ,he is trustworthy enought.")
sm.sendNext("I'm sending you this message because the Resistance has formed a secret research to investiagate strange occurrences in Maple World. With the help of the Alliance, our #bnew research agency#k is up and running, but slightly understaffed. I would like for you to go and help.")
sm.sendNext("I'm sure they would be more than happy to help you with your problems as well, I believe it may be excatly the sort of support you need right now, I'm sorry that I can't be there to give it to you my self, but I am needed here. May fortune smile on you.")

sm.setBoxChat()

sm.setPlayerBoxChat()
if sm.sendAskAccept("Now that #bGelimer#k is off my tail, these people may be just what i need, It couldn't hurt to visit, at least.\r\n\r\n#r(Press Yes to accept and automatically.)"):
    sm.warp(230050000)
    sm.startQuest(parentID)
    #sm.dispose()