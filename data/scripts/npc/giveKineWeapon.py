JAY = 1531001
KINESIS = 1531000
PAW_CHESS_PIECE = 1353200
PSY_LIMITER= 1262000
sm.setSpeakerID(JAY)
sm.setBoxChat()

response =  sm.sendAskYesNo("You've lost your equipment.\r\n It may be a prototype, but that doesn't men you can treat it like garbage. All right, I'll give you another weapon and secondary weapon, but I've only got basic stuff")
if response:
    selection = sm.sendNext("\r\n#L0##b#i1353200# #z1353200##l\r\n"
                            "#L1##b#i1262000# #z1262000##l")
    if selection == 0 and sm.canHold(PAW_CHESS_PIECE):
        if not sm.hasItem(PAW_CHESS_PIECE):
            sm.giveItem(PAW_CHESS_PIECE)
        else:
            sm.sendSayOkay("You already have it")    
    elif selection == 1 and sm.canHold(PSY_LIMITER):
        if not sm.hasItem(PSY_LIMITER):
            sm.giveItem(PSY_LIMITER)
        else:
            sm.sendSayOkay("You already have it") 
    else:
	sm.sendSayOkay("Please make more space in your ETC inventory.")    
else:
	sm.sendSayOkay("Okay, maybe another time.")        