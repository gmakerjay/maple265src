# Crimson Queen Gate (Door 3 - South Seal in Colossal Root)
sm.setSpeakerID(1064002)

sel = sm.sendAskMenu("Beyond this door lies the Castle of the Crimson Queen.\r\nWhich difficulty would you like to challenge?"
                     "\r\n#L0#Enter Normal Mode (Lv. 125+)#l"
                     "\r\n#L1#Enter Chaos Mode (Lv. 180+)#l"
                     "\r\n#L2#Open Boss UI#l")
if sel == 0:
    sm.enterBoss("QUEEN_NORMAL")
elif sel == 1:
    sm.enterBoss("QUEEN_CHAOS")
elif sel == 2:
    sm.startBossUI("Crimson Queen")
