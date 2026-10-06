Gray_Mask = 3003209
Protective_Mask = 3003209
Watermelon_Mask = 3003220
Shrimp_Mask = 3003214
Dark_Mask = 3003209
Dreamkeeper = 3003257
Dreamkeeper_Mob = 8643000
Lucid = 3003250

if sm.hasQuest(34326):
    sm.lockUI()
    sm.removeEscapeButton()
    sm.zoomCamera(0, 2000, 0, -221, 1)
    
    sm.setNpcBoxChat(Gray_Mask)
    sm.sendNext("Protective Mask, are you all right?")
    
    sm.setNpcBoxChat(Protective_Mask)
    sm.sendNext("As the dream's hold weakens, so do I. What could this mean...?")
    sm.sendNext("...! Did you feel that?")
    sm.sendNext("Lachelein is rapidly expanding!")
    
    sm.setNpcBoxChat(Gray_Mask)
    sm.sendNext("Does that mean her ultimate goal is...!?")
    
    sm.setNpcBoxChat(Protective_Mask)
    sm.sendNext("She's not satisfied with just the Arcane River... She's trying to envelop the entire world in her dream.")

    sm.setPlayerBoxChat()
    sm.sendNext("W-what?!")
    sm.sendNext("They turned into Dreamkeepers?!")
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("Hope and despair... The best of friends")
    sm.sendNext("As one grows stronger... So too does the other.")
    sm.sendNext("Struggle all you like... You cannot escape.")
    sm.sendNext("This is one dream from which... you will never awaken.")
    
    sm.setNpcBoxChat(Protective_Mask)
    sm.sendNext("#h0#, look out!")
    
    sm.blind(1, 255, 0, 1000)
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("Your fate... Is already sealed.")

    sm.setPlayerBoxChat()
    sm.sendNext("S-stay back! W-what? Ahh!")
    
    sm.sendDelay(2000)
    
    sm.OnOffLayer_On(3000, "0", 0, 0, 0, "Map/Effect3.img/Lacheln/4", 4, 1, -1, 0)
    sm.sendDelay(2000)
    sm.OnOffLayer_Off(1000, "0", 0)
    
    sm.setNpcBoxChat(Dreamkeeper)
    sm.sendNext("Forget them.")
    sm.sendNext("The Arcane River will take care of them.")
    sm.sendNext("Transform into Erdas and flow onward... Your energy will feed the Dark One...")
    sm.sendNext("That is a meaningful end...")
    
    sm.setNpcBoxChat(Lucid)
    sm.sendNext("#face5#Hehehe. Bye bye.")
    sm.sendNext("#face6#Wait.")
    sm.sendNext("#face2#Was that person...?")
    sm.sendNext("#face5#It can't be")
    
    sm.unlockUI()
    sm.blind(0, 0, 0, 1000)
    sm.warp(450003760)
else:
    chr.dispose()
