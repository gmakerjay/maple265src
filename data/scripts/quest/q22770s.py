# ParentID: 22770
# Character field ID when accessed: 331001000
# ObjectID: 0
#KINESIS 2ND JOB ADV
JAY = 1531001
KNIGHT_CHESS_PIECE = 1353201
MOVE_OF_AGONY = 1142864
sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("THERE you are, I figured you would't bite it that easily. Can't get a trace on you, though.... Where did you end up?")
sm.sendNext("Im guessing you have a quite story. Yuna's waiting for you too. so hustle.")
sm.sendNext("I bet your power level rose since I saw you last, I can't WAIT to chart you.")
if sm.sendAskYesNo("You wanna go ahead and update your data? Say yes.\r\n #b(Accept for 2nd Job Advancement.)\r\n #i1353201# #t1353201#\r\n#i1142864# #t1142864#"):
    if sm.canHold(KNIGHT_CHESS_PIECE) and sm.canHold(MOVE_OF_AGONY):
        sm.jobAdvance(14210)
        sm.giveItem(KNIGHT_CHESS_PIECE)
        sm.giveItem(MOVE_OF_AGONY)
        sm.sendSayOkay("Boom. Upgrade complete. Why not try out the goods?")
        sm.completeQuest(parentID)
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 