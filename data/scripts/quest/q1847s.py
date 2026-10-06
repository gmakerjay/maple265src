sm.setSpeakerID(9075008)
sel = sm.sendAskYesNo("Initiating system enhancement mode. Would you like to operate the Evolution System? You will be connected to a much more enhanced virtual world.")
if sel == 1:
    sm.sendNext("Press #r#eSTART#n#k to enter.")
    sm.startQuest(1847)