sm.removeNpc(9075005)
sm.removeNpc(9075001)
sm.removeNpc(9075002)
sm.removeNpc(9075004)
sm.spawnNpc(9075005, 143, 136)
sm.spawnNpc(9075001, 215, 136)
sm.spawnNpc(9075004, 473, 136)
sm.flipNpcByTemplateId(9075005, False)
sm.lockInGameUI(True)
sm.removeEscapeButton()

sm.sendDelay(1)

sm.setSpeakerID(9075005)
sm.sendNext("Lotus? Lotus! Are you awake?!")

sm.setSpeakerID(9075001)
sm.sendSay(".....")

sm.setSpeakerID(9075005)
sm.sendSay("Oh, brother, I've missed you so much! You've been napping all this time and I've had to blow up SO many people.")

sm.setSpeakerID(9075001)
sm.sendSay(".....")

sm.setSpeakerID(9075005)
sm.sendSay("Now we can be together again! We can take over this whole planet of stupid monkeys and rule it like we're supposed to!")

sm.setSpeakerID(9075001)
sm.sendSay(".....")

sm.setSpeakerID(9075005)
sm.sendSay("Lotus? Can you hear me? Remember your sister, Orchid?")

sm.setSpeakerID(9075001)
sm.sendSay(".....")

sm.setSpeakerID(9075005)
sm.sendSay("I thought you said he was waking up, Gelimer! If you scrambled his brains, I'm going to turn you inside out!")

sm.setSpeakerID(9075004)
sm.sendSay("I assure you, Commander Orchid. Lotus is perfectly fine. Do you wish to see? Here... Execute Program Alpha-97.")

sm.removeNpc(9075005)
sm.spawnNpc(9075002, -93, 136)
sm.flipNpcByTemplateId(9075002, False)

sm.sendDelay(3)

sm.setSpeakerID(9075002)
sm.sendNext("L...Lotus? What's going on?!")

sm.setSpeakerID(9075004)
sm.sendSay("Perhaps it need a little more juice, but the controls seem to be functional. My hypothesis was correct. His spirit could not withstand the impulses of his physical form.")

sm.setSpeakerID(9075002)
sm.sendSay("Gelimer... You...")

sm.setSpeakerID(9075004)
sm.sendSay("Have completed my experiments, yes. Your brother's body is awake once more. It does not yet have volition, but that is only a small inconvenience.")

sm.setSpeakerID(9075002)
sm.sendSay("What... did you do... to Lotus?!")

sm.setSpeakerID(9075004)
sm.sendSay("I have take control of the man who has the ability to control others, foolish girl. Unfortunately, his brain is still in hibernation, but his powers are all that are truly important.")

sm.setSpeakerID(9075002)
sm.sendSay("Why? Why Lotus?")

sm.setSpeakerID(9075004)
sm.sendSay("The Black Mage requires a vessel, child, not another follower. Do be a good girl and die now, won't you? I doubt we will be needing your services any more. Hahahaha!")

sm.setSpeakerID(9075002)
sm.sendSay("No... No... Not Lotus! Stop!")

sm.showFieldBackgroundEffect("Effect/Direction5.img/effect/Evolving/back/0")
sm.showFieldEffect("Effect/Direction5.img/effect/Evolving/swoo/0", 5000)

sm.setQRValue(1801, "end")

sm.sendDelay(2)

sm.lockInGameUI(False)
sm.modifiedCharacter()
sm.warpInstanceOut(chr, 310010000)