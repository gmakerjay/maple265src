# Vellum Gate (Door 4 - North Seal in Colossal Root)
sm.setSpeakerID(1064002)

sel = sm.sendAskMenu("Beyond this door lies the Abyssal Cave of Vellum.\r\nWhich difficulty would you like to challenge?"
                     "\r\n#L0#Enter Normal Mode (Lv. 125+)#l"
                     "\r\n#L1#Enter Chaos Mode (Lv. 180+)#l"
                     "\r\n#L2#Open Boss UI#l")
if sel == 0:
    sm.enterBoss("VELLUM_NORMAL")
elif sel == 1:
    sm.enterBoss("VELLUM_CHAOS")
elif sel == 2:
    sm.startBossUI("Vellum")