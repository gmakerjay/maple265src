# ParentID: 25510
# Character field ID when accessed: 101000100
# ObjectID: 0
VIEREN = 1032209
AURORA_PRISM = 2430874
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("The Dark no longer clouds my mind. You have my thanks.")

sm.setSpeakerID(VIEREN)
sm.setBoxChat()   
sm.sendNext("It was nothing. All I did was help you find the strength to control your Dark. Here, this Aurora Prism will let you come and go as you please.")
if sm.canHold(AURORA_PRISM):
    sm.jobAdvance(2710)
    sm.giveItem(AURORA_PRISM)
    #sm.completeQuest(parentID)
    sm.completeQuestNoRewards(parentID)
else:
    sm.sendSayOkay("Please make more space in your ETC inventory.") 