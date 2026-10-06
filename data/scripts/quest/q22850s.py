# Character field ID when accessed: 331001000
# ObjectID: 0
# ParentID: 22800
#KINESIS 4TH JOB ADV
JAY = 1531001
QUEEN_CHESS_PIECE = 1353203
sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("Holy-! K, your psy-limiter is maxed out! Where did all that power come from?")
sm.sendNext("Man, you really took it to the limit, I guess this means you can finally handle yourself in the sinkhole, huh?")
if sm.sendAskYesNo("This might be a good time to upgrade again. You ready?\r\n#b(Accept for 4th Job Advancement.)\r\n #i1353203# #t1353203#"):
    if sm.canHold(QUEEN_CHESS_PIECE):
        sm.jobAdvance(14212)
        sm.giveItem(QUEEN_CHESS_PIECE)
        sm.sendSayOkay("Welp, I think you've achieved your final form. I would check your power level, but you might explode my stuff.")
        sm.completeQuest(parentID)
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 