sm.lockInGameUI(True)
sm.removeEscapeButton()

sm.sendDelay(1)

sm.setSpeakerID(9075209)
sm.sendNext("Welcome to connecting to the Evolution System Enhancement Mode. This mode supports a stronger training program. Beginning guide now.")

sm.sendSay("There are 9 links in the Evolution System Enhancement Mode.\r\nYou can enter each link through the 'Center Control System'. The training program will begin immediately upon entry, and you will get a better reward upon completion.")

sm.sendSay("You can check your progress on the program through the link portal image. Available links will be displayed like this.")

sm.sendNext("If you have completed the program, the link portal will change like this. You can re-enter those programs if you wish.")

sm.sendNext("Unavailable links will be displayed as follows. This link can be expanded through the Core, a link expansion program.")

sm.sendNext("You can carry out additional programs when you expand the link through the core. You can get the Core by completing programs, or as a reward for eliminating monsters. You can aslo purchase them with Evoling Coins.")

sm.sendSay("This concludes the guide to the Enhanced Evolution System. Use the Warm-Up program to experience the new Evolution System for yourself.")

sm.lockInGameUI(False)

sm.completeQuest(1847)

