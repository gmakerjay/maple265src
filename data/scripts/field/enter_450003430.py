Protective_Mask = 3003202
Red_Flower_Mask = 3003246
Bird_Beak_Mask = 3003263
Lucid = 3003250

if sm.hasQuestCompleted(34325) and not sm.hasQuestCompleted(34326):
    sm.removeEscapeButton()
    sm.setSpeakerID(Red_Flower_Mask)
    sm.flipDialogue()
    sm.sendNext("What's going on?")
    
    sm.setSpeakerID(Bird_Beak_Mask)
    sm.flipDialogue()
    sm.sendSay("What was I doing just now?")
    
    sm.setSpeakerID(Protective_Mask)
    sm.flipDialogue()
    sm.sendSay("All these memories... Agh, my head...")

    sm.setPlayerAsSpeaker()
    sm.sendSay("We should get back. Here, let me give you a hand.")
    
    sm.lockUI()
    sm.blind(1, 255, 0, 1000)
    
    sm.sendDelay(1000)
    
    sm.playSound("Sound/Voice3.img/Lucid/Q3/0")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#Have you ever struggled to awaken from a dream?")
    
    sm.playSound("Sound/Voice3.img/Lucid/Q3/1")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#Even though you know you are dreaming, the darkness won't release its hold on you.. You are paralyzed, and a feeling of helplessness washes over you.")
    
    sm.playSound("Sound/Voice3.img/Lucid/Q3/2")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face5#Have you ever felt so bereft of hope? Well, you will soon.\r\nWelcome to your nightmare.")
    
    sm.sendDelay(1000)
    sm.OnOffLayer_On(3000, "0", 0, 0, 0, "Map/Effect3.img/Lacheln/0", 4, 1, -1, 0)
    sm.sendDelay(1000)
    sm.OnOffLayer_Off(0, "0", 0)
    sm.spineScreen(True, False, False, 0, "Map/Effect3.img/BossLucid/butterfly2/buterfly","animation","")
    sm.sendDelay(5000)    
    sm.blind(0, 0, 0, 1000)
    sm.unlockUI()
    sm.warp(450003100)
elif sm.hasQuest(34319):
    sm.blind(1, 255, 0, 0)
    sm.lockUI()
    sm.removeAdditionalEffect()
    sm.removeEscapeButton()
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("#h0#, Who do you think the residents of Lachelein really are?")

    sm.setPlayerBoxChat()
    sm.sendNext("Who they really are?")
    
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("When the music box was destroyed, knowledge of the outside world flooded in. Of course, coming from the outside world yourself, you must know all about the Arcane River.")

    sm.setPlayerBoxChat()
    sm.sendNext("Err...")
    
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("The Arcane River is a strange world, newly born.\r\nBut then #bwhere did the people of Lachelein come from?#k")

    sm.setPlayerBoxChat()
    sm.sendNext("I'd wondered that myself.")
    
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("This is what I think, #h0#.\r\n#bThey are Erdas#k. Shaped into human form, and blinded by a dream of being human.")

    sm.setPlayerBoxChat()
    sm.sendNext("I suppose that's possible...")
    
    sm.setSpeakerID(Protective_Mask)
    sm.setBoxChat()
    sm.sendNext("That would mean we're little more than clumps of energy. But if that's true, what should we do about it?")
    sm.sendNext("#h0#... I want the truth. Do you think Erdas have '#bsouls#k'?\r\n#b#L0#Of course!#l\r\n#L1#I don't know#l\r\n#L2#No.#l#k")
    sm.sendNext("Maybe you're right... Or maybe not.")
    sm.sendNext("Is struggling to live proof of a soul?")
    sm.sendNext("Perhaps all of our efforts are meaningless.")
    
    sm.blind(0, 0, 0, 1000)
    sm.unlockUI()