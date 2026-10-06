# ParentID: 53238
# ObjectID: 0
THUNDERHAMMER = 9270091
sm.removeEscapeButton()
sm.setSpeakerID(THUNDERHAMMER)
sm.setBoxChat()
sm.sendNext("The #bBlue Ore is almost done breaking down, assuming it does not blow up and eradicate this sector. Please be patient... and pray for a long life.")
if sm.sendAskYesNo("I knew my ruminations were correct. Give me the core fragment. It's time for a new outer shell"):
    if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(570)
            sm.completeQuestNoRewards(parentID)
            sm.giveItem(1142108)
            sm.giveItem(1492140)
            #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()

    
    
    
    