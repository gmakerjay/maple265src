# ParentID: 940011080
# ObjectID: 0
# Character field ID when accessed: 940011080
KYLE = 3000140
sm.removeEscapeButton()
sm.forcedInput(0)

sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.setPlayerBoxChat()
sm.sendNext("Bwaaaa....why...does....nothing....ever....work for me?!!")

sm.sendDelay(1000)
sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg1/0",2000)

sm.forcedInput(1)
sm.moveNpcByTemplateId(KYLE, False, 1000, 100)
sm.hideNpcByTemplateId(KYLE,False)
sm.sendDelay(1500)
sm.showNpcSpecialActionByTemplateId(KYLE, "say", 20000)
sm.forcedInput(0)

sm.sendNext("oH, kYLE! *sniff* I-I heard you were some kind of superhero now... That's great. Great for you *sniff*")

sm.setSpeakerID(KYLE)
sm.setBoxChat()    
sm.sendNext("#h0#, I was looking for you. A-are you all right?")


sm.setPlayerBoxChat()
sm.sendNext("Me? Why do you wanna see me? Is it this thing on my arm? I didn't mean to get it stuck on there but then it just...")
sm.sendNext("I should known something bad was gonna happen to me...")

sm.setSpeakerID(KYLE)
sm.setBoxChat()    
sm.sendNext("#h0#")

sm.setPlayerBoxChat()
sm.sendNext("I...I just thought maybe I'd finally get to use magic like you guys. Instead, I get a big stupid pink bracelet and a whole lot of people mad at me... I never should come with you guys")

sm.setSpeakerID(KYLE)
sm.setBoxChat()   
sm.sendNext("#h0#, I...I mean, me and Velderoth are worried about you.")

sm.setPlayerBoxChat()
sm.sendNext("I'm sorry. I'm so sorry you two always have to worry about me. I'm just gonna stay here so you never have to worry about me again.")
sm.sendNext("You should go on, Okay? I need some time alone.")

sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.removeNpc(KYLE)
sm.warp(940011090,0)
