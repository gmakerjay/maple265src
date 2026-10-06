# Character field ID when accessed: 940011000
# ObjectID: 0
# ParentID: 940011000
KYLE = 3000102
CHILDHOOD_SELVES = 3000100
VELDEROTH = 3000101
FENELLE = 3000106
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.hideUser(True)
sm.setSpeakerID(9201535)
sm.setBoxChat()
if sm.sendAskYesNo("#eWould you like to skip the tutorial questline."):
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.levelUntil(10)
    sm.jobAdvance(6500)
    sm.giveItem(1142495)
    sm.warpInstanceOut(chr, 400000000)
    #sm.dispose()
else:
    sm.setSpeakerID(VELDEROTH)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()    
    sm.sendNext("Are you cryin' again. #h0#?!")

    sm.setSpeakerID(CHILDHOOD_SELVES)
    sm.setBoxChat()    
    sm.sendNext("B-but the other kids are makin' fun of me!")

    sm.setSpeakerID(VELDEROTH)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()    
    sm.sendNext("That's cause you don't have no magic!")

    sm.setSpeakerID(FENELLE)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()  
    sm.sendNext("Do not be so harsh with her. Velderoth, #h0# can not help the way she was born.")

    sm.setSpeakerID(VELDEROTH)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()    
    sm.sendNext("But...I don't want to see #h0# getting bullied anymore!\r\nMaybe she can learn to use magic like us...")

    sm.setSpeakerID(KYLE)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()    
    sm.sendNext("Stop picking on her, Velderoth. You're supposed to be her friend.")

    sm.setSpeakerID(CHILDHOOD_SELVES)
    sm.setBoxChat()    
    sm.sendNext("I'm sorry you guys, I don't want to start a fight....")

    sm.setSpeakerID(FENELLE)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()
    sm.sendNext("(Dear little Amarelya...)")

    sm.setSpeakerID(KYLE)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()    
    sm.sendNext("We'll watch your back forever, #h0# I swear it.")

    sm.setSpeakerID(VELDEROTH)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat() 
    sm.sendNext("This is bummin' me out! Let's go down to town and get some candy!")

    sm.setSpeakerID(CHILDHOOD_SELVES)
    sm.setBoxChat()    
    sm.sendNext("Ok.")

    sm.setSpeakerID(VELDEROTH)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat() 
    sm.sendNext("#h0#, You're so much less ugly when you smile!")

    sm.setSpeakerID(KYLE)
    sm.flipSpeaker()
    sm.flipBoxChat()
    sm.setBoxChat()  
    sm.sendNext("Totally")

    sm.setSpeakerID(CHILDHOOD_SELVES)
    sm.setBoxChat() 
    sm.sendNext("Gee, thanks. Jerks.")
    sm.warpInstanceIn(chr, 940011010,0)
    #sm.dispose()