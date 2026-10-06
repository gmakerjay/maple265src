sm.setSpeakerID(2540000)
response = sm.sendAskYesNo("Do you wish to leave the battlefield?")

if response:
    sm.warpInstanceOut(chr, 992000000)

