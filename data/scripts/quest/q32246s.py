sm.setPlayerAsSpeaker()
sm.sendNext("Hmm... So, what to do now... ?")
sm.setPlayerAsSpeaker()
sel = sm.sendNext("#b#L0#Eat.#l\r\n#L1#Level Up.#l\r\n#L2#Sleep.#l\r\n#L3#Study.#l\r\n#L4# Look for other missions.#l#k")
if sel == 0:
    sm.setPlayerAsSpeaker()
    sm.sendSayOkay("Okay, first thing's first. Let's eat now and think later.")
elif sel == 1:
    sm.setPlayerAsSpeaker()
    sm.sendSayOkay("Okay! I should level up first. Can't afford to sleep at this level!")
elif sel == 2:
    sm.setPlayerAsSpeaker()
    sm.sendSayOkay("Oh well, who cares? I should get some sleep. Can't fight when I'm pooped.")
elif sel == 3:
    sm.setPlayerAsSpeaker()
    sm.sendSayOkay("I can't believe I decided to study! I must be losing my mind.")
elif sel == 4:
    sm.setPlayerAsSpeaker()
    sm.sendNext("Yeah, why waste time? I should look for some other missions!\r\nBut... where? I want to try something new.")
    sm.setPlayerAsSpeaker()
    if sm.sendAskYesNo("Maybe I should head to #b#m910400200##k first. That spot hasn't failed me yet.\r\n#r(Press Yes to teleport.)#k"):
        sm.startQuest(32246)
        sm.startRoute(910400200)
        sm.warp(910400200)
    else:
        sm.setPlayerAsSpeaker()
        sm.sendNext("Hmm...")
        