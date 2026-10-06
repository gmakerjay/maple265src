Protective_Mask = 3003202
Dreamkeeper = 3003257
Dreamkeeper2 = 3003249
Lucid = 3003250
Star_Mask = 3003245

sm.removeNpc(Dreamkeeper)
sm.removeNpc(Dreamkeeper2)
if sm.hasQuest(34300) and not sm.hasQuestCompleted(34300):
    sm.lockUI()
    sm.hideNpcByTemplateId(Protective_Mask, True)
    sm.spawnNpc(Dreamkeeper, 250, 78)
    sm.spawnNpc(Dreamkeeper2, 450, 78)
    sm.flipNpcByTemplateId(Dreamkeeper, False)
    sm.removeEscapeButton()
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("You... Come with us...")
    
    sm.setPlayerBoxChat()
    sm.sendNext("(They came out of nowhere!)")
    
    sm.blind(1, 255, 0, 1000)
    sm.OnOffLayer_On(8000, "1", 0, 0, 0, "Map/Effect3.img/Lacheln/1", 4, 1, -1, 0)
    sm.OnOffLayer_On(10000, "2", 0, 0, 0, "Map/Effect3.img/Lacheln/2", 4, 1, -1, 0)
    
    sm.playSound("Sound/Voice3.img/Lucid/Q1/0")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#Have you ever struggled to awaken from a dream?")
    
    sm.playSound("Sound/Voice3.img/Lucid/Q1/1")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#Even though you know you are dreaming, the darkness won't release its hold on you... You are paralyzed, and a feeling of helplessness washes over you.")
    
    sm.playSound("Sound/Voice3.img/Lucid/Q1/2")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#I realized when I tore through the cocoon of endless darkness and emerged into the world...")
    
    sm.playSound("Sound/Voice3.img/Lucid/Q1/3")
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#That I was no longer weak.")
    
    sm.OnOffLayer_Off(0, "2", 0)
    sm.OnOffLayer_On(5000, "3", 0, 0, 0, "Map/Effect3.img/Lacheln/3", 4, 1, -1, 0)
    
    sm.setNpcBoxChat(Star_Mask)
    sm.sendNext("S-spare... me...")   
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("There is... another...")
    
    sm.setPlayerBoxChat()
    sm.sendNext("Who are you?")
    
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face3#Welcome to Lachelein, the city of dreams and illusions. Here, there is no sadness or pain.")
    sm.sendNext("#face6#I hope your dream is a pleasant one.")
    
    sm.setPlayerBoxChat()
    sm.sendNext("Nothing... happended?")
    
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face5#Oh my! It's you... An honored guest.")
    
    sm.OnOffLayer_Off(1000, "1", 0)
    sm.OnOffLayer_Off(1000, "3", 0)
    
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face0#Oh?")
    
    sm.setNpcBoxChat(3003251)
    sm.sendNext("Hurry, this way!")
    
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face1#Well, well...")
    sm.sendNext("#face6#You let them get away.")
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("P-please... Have mercy...")
    
    sm.blind(0, 0, 0, 1000)
    
    sm.unlockUI()
    
    sm.completeQuest(34300)
    
    sm.warpInstanceOut(chr, 450003100)
elif not sm.hasQuestCompleted(34300):
    sm.lockUI()
    sm.blind(1, 255, 0, 0)
    sm.startQuest(34300)
    sm.spineScreen(True, False, False, 0, "Map/Effect3.img/BossLucid/butterfly/005","animation","")
    sm.sendDelay(5000)
    sm.blind(0, 0, 0, 1000)
    sm.unlockUI()
    sm.setPlayerAsSpeaker()
    sm.sendSayOkay("There are humans in the Arcane River? I should talk to them.")