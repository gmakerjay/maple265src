Angel = 9201428

sm.setSpeakerID(Angel)
sm.sendNext("We need all the young, tough heroes we can get in the Blackgate Defense Force.")
sm.sendSay("#v3800847#\r\nBlackgate is a hub of industry and science, but these demons are putting a real crimp in our work.")
if sm.sendAskYesNo("The BDF wants YOU!"):
    sm.sendNext("#v3800849#\r\nCome to Blackgate City if you want to help drive out the invadeers and reclaim our city.")
    sm.sendSay("You can use the Dimensional Mirror to come to Blackgate City whenever you can.")
    sm.startQuest(parentID)