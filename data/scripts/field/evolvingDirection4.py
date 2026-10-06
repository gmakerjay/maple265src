sm.removeNpc(9075300)
sm.removeNpc(9075307)
sm.spawnNpc(9075300, -99, 136)
sm.flipNpcByTemplateId(9075300, False)
sm.lockInGameUI(True)
sm.removeEscapeButton()

sm.sendDelay(1)

sm.setSpeakerID(9075300)
sm.sendNext("Lotus? Lotus! It's you, right?")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay(" ")

sm.setSpeakerID(9075300)
sm.sendSay("Why aren't you answer me?")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("Checking user information.\r\n\r\n... ... ...\r\n\r\nOrchid, is not a registered user name.")

sm.setSpeakerID(9075300)
sm.sendSay("Lotus, What are you talking about? I can't understand a thing.")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("You must register to use the Evolution System. Would you like to register?")

sm.setSpeakerID(9075300)
sm.sendSay("You're not Lotus... Who are you? Who are you to take his form?")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("I am ESS, the artificial intelligence that regulates the Evolution System. I was designed for maximum efficiency.")

sm.setSpeakerID(9075300)
sm.sendSay("Artificial intelligence? Did Gelimer make you?")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("Due to a system reset, all previous user information has been deleted.")

sm.setSpeakerID(9075300)
sm.sendSay("I don't like it. I don't like one bit. Why do you look like Lotus? He is Orchid's twin. My twin! Why is Gelimer making robot brothers?!")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("Due to a system reset, all previous user information has been deleted.")

sm.removeNpc(9075300)
sm.spawnNpc(9075307, -99, 136)
sm.flipNpcByTemplateId(9075307, False)

sm.sendDelay(3)

sm.setSpeakerID(9075307)
sm.sendNext("Where is Lotus? Give him back, now! Bring back Lotus!")

sm.sendDelay(3)

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("System has detected attack. Activating the defense system.")

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("Orchid? She hasn't lost all her powers?")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("Switching to target tracking mode. Tracking target")

sm.sendDelay(3)

sm.flipDialogue()
sm.sendNext("Enemy regognition complete. Switching to attack mode. Initiating attacks. Attack... Starting.")

sm.showFieldEffect("Effect/Direction5.img/effect/attack/0", 5000)

sm.startQuest(1849)
sm.showNpcSpecialActionByTemplateId(9075307, "condition", 0)

sm.sendDelay(3)

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.sendNext("Orchid!")

sm.setSpeakerID(9075301)
sm.flipDialogue()
sm.sendSay("New target found. Enemy regognition initiated.")

sm.flipDialogue()
sm.sendNext("User name #h0#. User verified. Ending defense system.")

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.sendNext("Orchid! Wake up, Orchid!")

sm.setSpeakerID(9075307)
sm.sendSay("I miss Lotus")

sm.removeNpc(9075307)
sm.setQRValue(1846, "1")

sm.sendDelay(1)

sm.lockInGameUI(False)
sm.warp(957020004)