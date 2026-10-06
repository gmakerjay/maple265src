# Character field ID when accessed: 331001000
# ObjectID: 0
# ParentID: 22800
#KINESIS 3RD JOB ADV
JAY = 1531001
CHALLEGNGE_WITHOUT_RETREAT = 1142865
ROOK_CHESS_PIECE = 1353202
sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("What's up, K? Enjoying your little jaunt?")
sm.sendNext("Hey, send me a pic of a monster or something. My fifth monitor needs a new background.")
sm.sendNext("Did you wreck them already? Geez, man...")
if sm.sendAskYesNo("Whatever, I think we can agree that you're ready for the next upgrade. Any objections?\r\n#b(Accept for 3rd Job Advancement.)\r\n #i1142865# #t1142865#\r\n#i1353202# #t1353202#"):
    if sm.canHold(CHALLEGNGE_WITHOUT_RETREAT) and sm.canHold(ROOK_CHESS_PIECE):
        sm.jobAdvance(14211)
        sm.giveItem(CHALLEGNGE_WITHOUT_RETREAT)
        sm.giveItem(ROOK_CHESS_PIECE)
        sm.sendNext("There you go. If I did the math right, this should let you levitate monsters yourself.")
        sm.sendSayOkay("A whole new world of owning just opened up for you. I almost feel sorry for those monsters. Especialy the cute ones.")
        sm.completeQuest(parentID)
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 