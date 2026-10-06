sm.lockInGameUI(True)
sm.removeEscapeButton()
sm.showFieldEffect("Map/Effect.img/evolving/mapname")

sm.sendDelay(5)

sm.setSpeakerID(9075005)
sm.sendNext("Gelimer! Why did you move Lotus here without my authorization?!")

sm.setSpeakerID(9075004)
sm.sendSay("M-madame Orchid. You are... early...")

sm.setSpeakerID(9075005)
sm.sendSay("Shut your trap, you greasy old nerd! YOu don't move my brother unless I tell you to move my brother! My little Lotus needs to be near me or he'll get scared!")

sm.setSpeakerID(9075004)
sm.sendSay("Please lower your voice, dear. There have been some developments...")

sm.setSpeakerID(9075005)
sm.sendSay("I'm developing a need to set your mustache on fire, Gelimer. How long do you think you can keep delaying these experiments?\r\nLotus should have been awake months ago. You know what i'm going to do to you if you don't succeed, don't you?")

sm.setSpeakerID(9075004)
sm.sendSay("Lotus will awaken soon, i assure you. He will wake up, very soon...")

sm.setSpeakerID(9075005)
sm.sendSay("You want more time? Then buy a new watch! I want my brother awake now!")

sm.setSpeakerID(9075004)
sm.sendSay("Perhaps he only needs to hear your voice... Come, take a look.")

sm.showFieldEffect("Map/Effect.img/evolving/swoo1")

sm.sendDelay(5)

sm.lockInGameUI(False)
sm.warp(957020002)