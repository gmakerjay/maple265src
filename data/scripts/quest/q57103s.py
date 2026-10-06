# 57103 - Picking up the Pieces
   

sm.removeEscapeButton()
sm.setSpeakerID(9130024)
sm.setBoxChat()  

if sm.sendAskYesNo("I am Yamanaka Yukimori, a retainer to the Amako clan. I was at Honnou-ji with you. Before we continue, may i ask your name?"):
    sm.setPlayerBoxChat()
    sm.startQuest(parentID)
    sm.sendNext("I Am Anegasaki Kenji, heir to the Matsuyama clan, and the descendant of Anegasaki Tomonobu")
    
    sm.removeEscapeButton()
    sm.setSpeakerID(9130024)
    sm.setBoxChat()  
    
    sm.sendNext("Anegasaki Kenji... I've heard that name before! It's my honor to meet the master of Battoujutsu.")

    sm.setPlayerBoxChat()
    sm.sendNext("Please do not fawn over me, noble warrior. If i had known you were at Honnou-Ji, I would have greeted you as a brother.")
    
    sm.removeEscapeButton()
    sm.setSpeakerID(9130024)
    sm.setBoxChat()  

    sm.sendNext("Much has happened since the raid on Honnou-Ji. I will fill you in when you have gathered yourself.")
    #sm.dispose()