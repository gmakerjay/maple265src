THUNDERHAMMER = 9270091
sm.removeEscapeButton()
sm.setSpeakerID(THUNDERHAMMER)
sm.setBoxChat()
sm.sendNext("Ooh, #bFire Ore#k! I could produce a ternary alloy from this that would break diamonds!")
if sm.sendAskYesNo("All right, it looks like the materials have been prepared. Could you give me the core fragment?"):
    if sm.getEmptyInventorySlots(1)>= 2:
            sm.jobAdvance(571)
            sm.completeQuestNoRewards(parentID)
            sm.giveItem(1142109)
            sm.giveItem(1492142)
            #sm.dispose()
    else:
        sm.sendSayOkay("\t#ePlease make more space in your EQUIP inventory.")
        #sm.dispose()