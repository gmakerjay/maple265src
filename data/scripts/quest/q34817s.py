# id 34817 (Statue Remodeling), field 402000529
sm.lockInGameUI(True, False)
sm.removeAdditionalEffect()
sm.showFadeTransition(0, 1000, 3000)
sm.sendDelay(100)
sm.forcedFlip(True)
sm.sendDelay(100)
sm.spawnNpc(3001300, 150, 8)
sm.showNpcSpecialActionByTemplateId(3001300, "summon", 0)
sm.sendDelay(100)
sm.removeOverlapScreen(1000)
sm.sendDelay(1000)
sm.setSpeakerType(3)
sm.setParam(37)
sm.setColor(1)
sm.setSpeakerID(3001350) # Illium
sm.sendNext("#face6#What do you say, Ex? Want a friend?")
sm.setSpeakerID(3001300) # Ex
sm.sendSay("#face0#Friends are not essential to my functions.")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face7#You might like it! I was really happy to have you as a friend!")
sm.setSpeakerID(3001300) # Ex
sm.sendSay("#face0#That's very kind of you, Sir.")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face6#I wonder if I could streamline this statue and make a tiny robot out of it.")
sm.setSpeakerID(3001300) # Ex
sm.sendSay("#face0#Well, that would certainly be a better use for it than simply discarding it.")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face2#I hope you two get along! Shall I start converting it?")
sm.blind(1, 255, 0, 0, 0, 500)
sm.sendDelay(500)
sm.createQuestWithQRValue(parentID, "m=1")
sm.startQuest(parentID)
sm.sendDelay(500)
sm.sendNext("#face7#It's done!")
sm.blind(1, 255, 0, 0, 0, 0)
sm.sendDelay(1200)
sm.blind(0, 0, 0, 0, 0, 1000)
sm.sendDelay(1400)
sm.sendDelay(1000)
sm.setSpeakerID(3001312) # Machina
sm.sendNext("#face0#Hello! My name is Machina! What's your name?")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face5#Hi Machina! I'm Illium. And this is Ex.")
sm.setSpeakerID(3001312) # Machina
sm.sendSay("#face0#It's nice to meet you Illium and Ex!")
sm.setSpeakerID(3001300) # Ex
sm.sendSay("#face3#Well, he's certainly friendly.")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face0#Yeah. I guess he'll take some getting used to.")
sm.sendDelay(1000)
sm.sendDelay(500)
sm.sendNext("#face7#Huh? What's that sound?")
sm.sendDelay(1000)
sm.sendDelay(500)
sm.setSpeakerID(3001300) # Ex
sm.sendNext("#face0#It's really noisy outside.")
sm.setSpeakerID(3001350) # Illium
sm.sendSay("#face9# Let's take a look.")
sm.showFadeTransition(0, 1000, 3000)
sm.zoomCamera(0, 1000, 2147483647, 2147483647, 2147483647)
sm.moveCamera(True, 0, 0, 0)
sm.sendDelay(300)
sm.removeOverlapScreen(1000)
sm.sendDelay(1000)
sm.lockInGameUI(False, True)
