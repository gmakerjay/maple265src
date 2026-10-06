Luma = 9201432

sm.setSpeakerID(Luma)
sm.sendNext("The demon I must eliminate is Aragami...veneagance incarnate.\r\n#v3800852#")
if sm.sendAskYesNo("She was betrayed, and her rage persisted into the afterlife. Can't say I blame her, really..."):
    sm.sendNext("It won't be easy... But if you can handle it...")
    sm.sendSay("#v3800856#\r\nRemember to be careful! Her rage can overpower you, make you lose control.")
    sm.startQuest(parentID)