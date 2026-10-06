# ObjectID: 0
# ParentID: 940001200
# Character field ID when accessed: 940001200
TEAR = 3000103
VELDEROTH = 3000104


sm.lockInGameUI(True, False)

sm.removeNpc(TEAR)
sm.removeNpc(VELDEROTH)

sm.spawnNpc(TEAR,-1257,29)
sm.spawnNpc(VELDEROTH,-1670,29)

sm.flipNpcByTemplateId(VELDEROTH, False)

sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)
sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 20000)
sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Wow, what lovely weather!")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Get your head out of the clouds. #r#h0##k and I have already become knights. When are you going to become a knight?")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I dunno. I don't have magic power or anything. Maybe I should look for some!")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I'm pretty sure you've told me that one about a thousand times.")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Anyways, you guys are knights! That's so cool! You can ride on horses and wear shiny armor and stuff, right? I want in on that!")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I'm not sure you're cut out to be a knight, Tear.")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Do what ?! I thought we all promised to become knights! That's what the Heliseum Force is all about, right? Well, that and awesome cook-outs.")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Yeah, but you don't use magic. You have to face the truth sometime.")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Ugh, why do you keep bringing that up? Magic is no big thing.")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I just want you to think sometimes. Anyway, I gotta get back.")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Man, I wish I was going too.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Really? Because i don't feel so good about this.")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("What are you talking about? Come on, you can daydream about smooching with #r#h0##k on the way back to camp.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("No... Something's there. I think something is happening at the East Scanctum.")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Well, let's go check it out! I wonder what's going on?")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Tear, are you really going to fall for that rubbish?")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Well, #r#h0##k is pretty good guesser. And I don't have anything else to do.")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I wish I had the authority to overrule you people... Fine. Let's go.")


#sm.flipNpcByTemplateId(TEAR, False)
#sm.moveNpcByTemplateId(VELDEROTH, False, 400, 100)
#sm.moveNpcByTemplateId(TEAR, False, 400, 100)
#sm.sendDelay(2000)
#sm.forcedInput(2)
#sm.sendDelay(3000)
#sm.forcedInput(0)
sm.showFade(500)
sm.warp(940001210)

sm.lockInGameUI(False, False)
sm.removeNpc(TEAR)
sm.removeNpc(VELDEROTH)