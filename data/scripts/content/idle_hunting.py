sm.setPlayerAsSpeaker()
selection = sm.sendNext("Welcome to the #eIdle Hunting System#n. What would you like to do?#b\r\n#L0#Start Idle Hunting session.#l\r\n#L1#Learn about the Idle Hunting system.#l#k")
if selection == 0:
    if not chr.isStartedHunting():
        if sm.sendAskYesNo("You have not recorded your hunting data for this map yet. Would you like to record it now?"):
            chr.setupIdleHunting()
    else:
        sm.sendSayOkay("You already have hunting data recorded for this map.")
elif selection == 1:
    sm.sendNext("The #eIdle Hunting System#n allows your character to automatically hunt monsters, gain EXP, and collect items while you are offline. When you log back in, all rewards will be granted to you.\r\nTo get started, you must record your hunting performance on a valid map.")
    sm.sendNext("#eHow It Works#n\r\n1. #eRecord Hunting Data:#n When you start, the system records your combat stats in the current map (monsters killed per minute, EXP per minute, meso gain, and drop rates).\r\n2. #eOffline Simulation:#n While you are offline, the system simulates hunting based on your recorded performance. The longer you are offline, the more rewards you accumulate.")
    sm.sendNext("3. #eClaim Rewards:#n When you log back in, you will receive a full report of offline time, total monsters killed, EXP gained, mesos collected, and items dropped.")
    sm.sendSayOkay("#eFAQ#n\r\n#eDoes it work in every map?#n\r\nIt works in designated hunting maps.\r\n\r\n#eCan rare items drop?#n\r\nYes, drops are calculated based on your actual drop rates.\r\n\r\n#eHow to end?#n\r\nSession rewards are automatically collected when you log back in.")