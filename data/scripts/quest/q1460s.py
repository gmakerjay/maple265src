sm.setSpeakerID(2140001)
sm.flipDialogue()

if chr.getFieldID() != 270010111:
    sm.sendNext("You have come far in the pursuit of rare and incredible power. But in your journeys, did you ever find yourself lost, or unsure of how to proceed?")
    sm.flipDialogue()
    response = sm.sendAskYesNo("We have meditated on this problem for ages, and at last we may have a solution. Not just for finding power, but for surpassing your limits. If you are interested, come find me in the Temple of Time.\r\n#b(Accepting will take you to The Temple of Time for your #e5th Job Advancement.)#k")
    if response:
        sm.warp(270010111)
else:
    choice = sm.sendNext("#hsm.getChr()#... Your reputation precedes you. I have called you here to share a discovery i have made. There is something... odd occurring in our world.\r\n\r\n#L0##bSomething...odd? With a dramatic pause?#k#l")
    if choice == 0:
        sm.flipDialogue()
        choice2 = sm.sendNext("Have you heard of the #bErda Flow#k, the energy that makes up this world?\r\n\r\n#L0##bErdas?#k#l")
        if choice2 == 0:
            sm.flipDialogue()
            choice3 = sm.sendNext("That is a no, then. Erdas are like living energy, undergoing a constant cycle of creation and destruction. They are the link between Maple World and other worlds, being the most basic building block of reality.\r\n\r\n#L0##bThat sounds super important.#k#l")
            if choice3 == 0:
                sm.flipDialogue()
                choice4 = sm.sendNext("Indeed. Without Erda, this world can't exist. A while ago, I've noticed this important Erda is vanishing little by little.\r\n\r\n#L0##bWait, what? Disappearing?#k#l")
                if choice4 == 0:
                    sm.flipDialogue()
                    sm.sendNext("You look doubtful. Seeing is believing. See for yourself, and your perspective of this world will change")
                    sm.flipDialogue()
                    if sm.sendAskYesNo("Allow me to teach you the art of observing Erdas. Please, close your eyes\r\n\r\n#b(Accepting will take you to a place beyond perception...)#k"):
                        sm.lockInGameUI(True)
                        sm.blind(1, 255, 0, 0)
                        sm.sendDelay(3000)
                        sm.removeEscapeButton()
                        sm.setSpeakerID(1540940)
                        sm.flipDialogue()
                        sm.sendNext("Hey, um, anybody? Can anybody hear me?")
                        sm.flipSpeaker()
                        sm.flipDialoguePlayerAsSpeaker()
                        sm.sendSay("Huh? This voice...")
                        sm.showFade(1000)
                        sm.spineScreen(False, True, True, 0, "Map/Effect2.img/ArcaneRiver/Flow/002", "animation", None)
                        sm.sendDelay(2000)
                        sm.setSpeakerID(1540940)
                        sm.flipDialogue()
                        sm.sendNext("Oh, yay! It's somebody!")
                        sm.flipDialogue()    
                        sm.sendSay("So...hi! I'm the...er, we're the Erdas! Me and my friends make up everything in the whole wide world. Is'nt that neat? We used to flow through the World Tree like syrup... But now that the World Tree is kinda gone, the Black Mage has been stealing us away, little by little.")
                        sm.flipDialogue() 
                        sm.sendSay("It's super scary! There's like, this big hand that comes out of #ra giant door#k, and it's all RAR IMMA TAKE YOU AWAY! I mean, it does'nt say that... 'cause it's a hand. That's just the vibe i get.")
                        sm.flipDialogue() 
                        choice6 = sm.sendNext("...Aww, nuts! We're out of time already? Quick, do you have any questions? Make them good ones!#b\r\n\r\n#L0#Why is the Black Mage trying to take you?#l\r\n#L1#What exactly ARE you?#l\r\n#L2#How do i accept your power?#l\r\n#L3#Nah, I'm good.#l#k")
                        if choice6 == 0:
                            sm.flipDialogue() 
                            sm.sendNext("I'm pretty sure the Black Mage wants to use us to create a #rwhole new world#k. I forgot how long things have been super crazy, but if it keeps up, we're all gonna be gone soon! And that means #byour world goes bye-bye#k too!")
                        elif choice6 == 1:
                            sm.flipDialogue() 
                            sm.sendNext("We're energy! Pure, formless power, propping up the whole wide world. Everything comes from us, animal, vegetable, or mineral, and returns to us when it's... y'know... done.")
                        elif choice6 == 2:
                            sm.flipDialogue() 
                            sm.sendNext("Just believe in yourself! Think happy thoughts! And talk to the #bgoddess#k of your world. She's super helpful.")
                        elif choice6 == 3:
                            sm.setSpeakerID(1540940)
                            sm.flipDialogue()
                            sm.sendNext("Okay, well, I'd better get back to... um, existing. Good talking to you!")
                            sm.setSpeakerID(1540940)
                            sm.flipDialogue()
                            sm.sendSay("Remember, the fate of all existence lies in your hands. So don't mess this up!")
                            sm.flipSpeaker()
                            sm.flipDialoguePlayerAsSpeaker()
                            sm.sendNext("What...was that i just saw? i need to talk to the #b#p2140001##k again.")
                            sm.startQuest(1460)
                        sm.lockInGameUI(False)
                        sm.warp(270010111)
                        #sm.dispose()


