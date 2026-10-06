sm.setSpeakerID(9390009)
sm.sendNext("Hey there, powerful adventuner. I am Dr. Bing.\r\nAre you aware of the recent spaceship crash? It's caused quite a stir, what with the strange energy coming from it...")
selection = sm.sendNext("Will you come and help me with my research? You'll get loads of EXP if you can clear all 5 stages.\r\n(You will be moved directly to the map if you accept.)\r\n#b#L0#Yes, I am on my way.#l\r\n#L1#Nah, I'll pass.#l#k")
if selection == 0:
    sm.sendNext("Good thingking! I will teleport you here right away!")
    sm.warp(861000000)