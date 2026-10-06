# 20883 - [Job Adv] (Lv.60)   Cygnus Knight
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101002)
sm.setBoxChat()
sm.sendNext("#h0# it is fortunate that you protected the book from the Black Mage. It is a book with tremendous value. I must admit your braveness for this.")
if sm.sendAskYesNo("The Queen has appointed you the title of nobility for your actions, do you wish to accept it?"):
    sm.sendSayOkay("#h0#, from now on you are an elite member. You will be given quests with higher level, but you will manage.")
    sm.lockInGameUI(False,False)
    chrJobID = sm.getChr().getJob()
    sm.jobAdvance(chrJobID+1)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.completeQuest(parentID)
    sm.giveItem(1142068)
    sm.warpInstanceOut(chr, 130000000)
    
    #sm.dispose()
else:
    sm.sendSayOkay("Let me know when you wish to accept the title.")
    sm.lockInGameUI(False,False)
    #sm.dispose()