Lyon = 3003159
Master_Lyck = 3003168
Simia = 3003160
Pibik = 3003162
Pimi = 3003163
Pidol = 3003164
Muto = 3003156

sm.removeNpc(Lyon)
sm.removeNpc(Master_Lyck)
sm.removeNpc(Simia)
sm.removeNpc(Pibik)
sm.removeNpc(Pimi)
sm.removeNpc(Pidol)
if sm.hasQuest(34218):
    sm.lockUI()
    sm.removeAdditionalEffect()
    sm.removeEscapeButton()
    sm.hideNpcByTemplateId(Muto, True)
    sm.spawnNpc(Lyon, -303, 150)
    sm.spawnNpc(Master_Lyck, -104, 150)
    sm.flipNpcByTemplateId(Lyon, False)
    sm.flipNpcByTemplateId(Master_Lyck, False)
    sm.spawnNpc(Simia, -20, 150)
    sm.spawnNpc(Pibik, 40, 150)
    sm.spawnNpc(Pimi, 100, 150)
    sm.spawnNpc(Pidol, 160, 150)

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Ow... My head... What happened? One moment I'm here, the next I'm waking up outside the village!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Oh! You're awake? #bMuto#k got angry and attacked you! Haha!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("What?! Why that giant little...!")
    sm.sendNext("He was refusing to eat my masterpiece! ... Wait?!\r\nWhat about #rGulla#k? What happened!?")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("Muto stopped him while you were... Sleeping!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("What did you say? #bHe moved#k?")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Yup! He sent that shark running with its tail between its... Uh... fins. Hehe!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("#bMy masterpiece#k... He didn't even glance at it...\r\nInstead, he ate #bSimia#k's food and moved?")
    sm.sendNext("#e#fs20#(Sniffs) ...Waaaah!#n")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("Hey... Are you crying?!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Wah... My food... I #bput my heart and soul into that dish#k...\r\nHe didn't even look at it... Wah...")
    sm.sendNext("I... I will never cook again...\r\nI'm going to close my kitchen forever... Wah...")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("You're wrong, Chef Lyck... Your food is #bamazing#k...")
    sm.sendNext("Just look! #bMuto#k ate all of your food.")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("No... Slurp. #bMuto#k hates my food...\r\nHe hated my food from that start... Slurp...")

    sm.setSpeakerID(Pimi)
    sm.setBoxChat()
    sm.sendNext("Yeesh... He's a lot more emotional than he looks...")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Muto... Eat everything... Muto is good child... If he eat everything...")
    sm.sendNext("The food before... #btaste yucky#k, but i eat... To protect #bfriends. Simia#k food... Very good.")

    sm.setPlayerBoxChat()
    sm.sendNext("Master Lyck... It's not that your food is bad. Muto just has #runusual taste#k, like Simia and the Pi siblings...")
    sm.sendNext("That's why he got tired of your food.")
    sm.sendNext("So don't feed sad. You're still the #bbest chef#k around, as far as the villagers are concerned.")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("That's right Master Lyck! I really love your food. Haha! Don't say something awful like you're gonna quit!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("I...I...")
    sm.sendNext("#bMuto#k... I'm sorry...")
    sm.sendNext("I was so arrogant to assume you would like anything I made...\r\nIt must have been hard forcing yourself to eat my food...")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("It's... okay... Your food #bvery big#k... In that way, good...")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Then... this whole time, Muto's been protecting us while eating food that tasted bad to him?")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("My cooking skills are... Years behind Master Lyck's techinque... But I knew #h0# was right...")
    sm.sendNext("Muto has done so much for us... But we never showed him kindess. We took him for granted.")
    sm.sendNext("I'm not good at much, but I knew I couldn't let Muto starve. Giving him a warm meal was the least I could do...")
    sm.sendNext("Chef. This isn't about whose food is better...")
    sm.sendNext("We took Muto's sacrifice for granted... We need to be better.")
    sm.sendNext("So cheer up Chef. I'll look after Muto from now on...")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Simia... I didn't recognize your skills as a chef because I couldn't look past your #bunusual taste#k...")
    sm.sendNext("I'm sorry Simia... I was very arrogant, and I was wrong.")
    sm.sendNext("From now on, I will give you the recognition you deserve...\r\nAs Muto's #bpersonal chef.#k")
    sm.sendNext("Will you do me this favor?")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("You're making me... an official chef?")

    sm.setSpeakerID(Pimi)
    sm.setBoxChat()
    sm.sendNext("He can't make you what you already are!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Your friend is right. In any case, I will continue to cook for the villagers...\r\nAnd you will cook for Muto and the other villagers with un...\r\nDifferent tastes.")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Me... A real chef?")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("I understand if you don't want to do it, after all I've put you through...")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Oh! No, Master Lyck! It would be my honor to cook for Muto and the Pi siblings! I'll do my best to get better, and make you proud!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Uh... It seems that I could have handled this Chiefing business a little better...")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("You're the one who's most at fault here!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("I know...I'll go my best to be a good Chief, and to take care of Muto and all of you...")
    sm.sendNext("Anyways... Hey traveler! Our village is more united than ever thanks to you! We owe you a great debt!")
    sm.sendNext("I'll do whatever you want to make up for it! You want a back-rub? Just say the word!")

    sm.setPlayerBoxChat()
    sm.sendNext("I... just need to pass through... That's what I've been telling you from the start...")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Oh, that's right! I forgot! Whoops... Hehe!")
    sm.sendNext("Hey Muto, now that you're not hungry anymore, would you mind moving aside so our friend here can pass?")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Yes... You can pass... Muto will move...")

    sm.setPlayerBoxChat()
    sm.sendNext("Thanks Muto! I can finally make my way to the Black Mage!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("But... Why are you trying to pass through here anyway? Do you have some business with that #rBlack Mage#k fellow?")

    sm.setPlayerBoxChat()
    sm.sendNext("Yes... #bVery important#k business...")

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("Just a moment...")
    sm.sendNext("Take this with you.\r\n#v1712002#")

    sm.setPlayerBoxChat()
    sm.sendNext("Oh? It looks like you've finally regained your senses. But what's this?")

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("Something you will need #rfor the challenges that await you#k.")

    sm.setPlayerBoxChat()
    sm.sendNext("This is... An #bArcane Symbol#k?!")

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("I knew that you were #bdifferent#k from us from the moment you stepped into our lives...")
    sm.sendNext("We #blost our memories of our origin#k... But you aren't like us. #bIt's as though you are under the guardianship of a great power...#k")
    sm.sendNext("I realized that #bround object#k #v1712001# of yours was protecting you.")
    sm.sendNext("When I stumbled across #bthis object#k, #v1712002# I knew I had to give it to you as a #bgift#k.")

    sm.setPlayerBoxChat()
    sm.sendNext("You're giving this to me? But why now? What do you know? Please, tell me!")

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("Err...")
    sm.sendNext("Ummmm... I not know!")

    sm.setPlayerBoxChat()
    sm.sendNext("Oh no... He changed back.")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Um... You haven't seen those before?")
    sm.sendNext("We occasionally stumble into objects like that around Chu Chu Island.\r\nThey're rare, but they appear more frequently in the wake of #bMuto's fights with Gulla#k.")

    sm.setPlayerBoxChat()
    sm.sendNext("This is an #bArcane Symbol#k. An immense power lies within it.")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Hm.. I don't know what to say, nothing happened when we held it.")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("And it tastes horrible!")

    sm.setPlayerBoxChat()
    sm.sendNext("This object and the #rBlack Mage#k who I've been searching for... They're all connected to you and #bbirth of Chu Chu Island#k... As I understand it, #bmany different Erdas were mixed together#k and")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("We have many questions about our origins, and why we can't leave this place.")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("That's right! Every time we try to cross the river, we always #brun into something#k, like an invisible barrier!")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("But we're satisfied with our lives here... And we're happy.")
    sm.sendNext("So whatever it is you know... Please don't tell us if it would threaten our happiness.")

    sm.setPlayerBoxChat()
    sm.sendNext("Simia... I... I understand.")
    sm.sendNext("To be honest, even I don't know why this place was created.")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Since you are such a kindhearted person, I trust that whatever you are doing is the right thing. No matter what it means for us.")
    sm.sendNext("Come visit us again if you need more of those orbs. We will try to help you as best as we can.")

    sm.setSpeakerID(Pimi)
    sm.setBoxChat()
    sm.sendNext("Then... is this farewell? Can't you stay a little longer?")

    sm.setPlayerBoxChat()
    sm.sendNext("I'm afaird I've stayed here long enough. If I don't hurry, something terrible could happen.")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("#h0#... Thank you for all you've done for Chu Chu Island... We will never forget it...")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Yeah... Our village is safe and happy again thanks to you... Come visit us whenever you need anything!")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("(Sniffs) I'll never get to eat a #b" + str(sm.getQRValue(34207)) + " Sandwich#k again! It was so good! Waaah!")

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("Waaah... He's crying. Waah!")

    sm.setPlayerBoxChat()
    sm.sendNext("Thank you Simia, Pi siblings, Chief Lyon. Even you, Master Lyck... If I get to return here at the end of my journey...")
    sm.sendNext("Then let's all share a #b" + str(sm.getQRValue(34207)) + " Sandwich#k together...")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Hehe. You're talking as if you're going to die out there!")
    sm.sendNext("What's the big deal? Stop acting like we're never gonna see each other again! Here, since you're feeling so blue I'll give you a lift, hehe!")

    sm.setPlayerBoxChat()
    sm.sendNext("W-wait!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("See you later! Huuup!")

    sm.unlockUI()
    sm.completeQuest(34218)
    sm.giveSymbol(1712002, 34218)
    sm.warpInstanceOut(chr, 450002021)
    sm.progressMessageFont("Speak with Muto continue your journey.")
    #sm.dispose()

elif sm.hasQuest(34217):
    sm.lockUI()
    sm.removeAdditionalEffect()
    sm.removeEscapeButton()
    sm.spawnNpc(Lyon, -303, 150)
    sm.spawnNpc(Master_Lyck, -104, 150)
    sm.flipNpcByTemplateId(Lyon, False)
    sm.flipNpcByTemplateId(Master_Lyck, False)
    sm.spawnNpc(Simia, -20, 150)
    sm.spawnNpc(Pibik, 40, 150)
    sm.spawnNpc(Pimi, 100, 150)
    sm.spawnNpc(Pidol, 160, 150)

    sm.setPlayerBoxChat()
    sm.sendNext("#bChief! Chef!#k Hurry, over here!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("(Panting) Well..?! Where is that mysterious #bassistant#k who helped you, and where's that #bdish#k of yours?")

    sm.setPlayerBoxChat()
    sm.sendNext("...Seriously? They're standing right there... Ahem. Allow me to introduce, the #b" + str(sm.getQRValue(34207)) + " Sandwich#k, and #bSimia#k, the magnificent chef who assisted me!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("You! The entire kitchen is in a fervor trying to prepare my masterpiece for Muto before it's too late, and you... You were you helping that idiot over there make food this whole time?")
    sm.sendNext("Even if you cannot cook, there is still trash to empty! Slurp! There are many things to do! Don't think for a moment I will forget this.")

    sm.setSpeakerID(Pimi)
    sm.setBoxChat()
    sm.sendNext("It must be that stupid bully Chef. Yawn. I'm bored now...")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Even if you were in a hurry, why would you accept help from those with no taste making food! Pitiful!")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Chef... You shouldn't be so mean to Muto... Muto is a nice child who protects us.")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Hurry up and choose Muto! Do you know how much trouble you have put us through?! Hurry up and eat this, and go defeat Gulla!")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Hm...(Sniff, sniff)")

    sm.flipNpcByTemplateId(Simia, False)
    sm.flipNpcByTemplateId(Pibik, False)
    sm.flipNpcByTemplateId(Pimi, False)
    sm.flipNpcByTemplateId(Pidol, False)

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("Doesn't it smell delectable? Slurp! Now, consume my delicious delicacy, and get up!")

    sm.OnOffLayer_On(3000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/eat", 4, 1, -1, 0)
    sm.sendDelay(2000)
    sm.OnOffLayer_Off(2000, "0", 0)

    sm.setSpeakerID(Pidol)
    sm.setBoxChat()
    sm.sendNext("M-Muto! Chooses our #b" + str(sm.getQRValue(34207)) + " Sandwich#k!")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs20#Th... This is... Goo... Goood!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("What are you talking about Muto? You haven't even tried my food! Hurry and eat it!")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs12#Muto... HATE... You eat it...")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("You ungrateful rock! Why aren't you eating my food!?")

    sm.setPlayerBoxChat()
    sm.sendNext("Shut it, Lyck! Muto doesn't want to eat it!")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("Yeah! Your food tastes like #bCrilia poop#k!")

    sm.setSpeakerID(Master_Lyck)
    sm.setBoxChat()
    sm.sendNext("How DARE you! I won't accept this insult! Eat! Eat it now!")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs30#NO EAT!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Uh... Is it time for me to step in!? Chef Lyck, go get some air! Hyaaa!")

    sm.fadeInOut(600, 1000, 600, 150)
    sm.removeNpc(Master_Lyck)

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("There. Master Lyck should be landing safely in the village any minute now.")

    sm.setPlayerBoxChat()
    sm.sendNext("H-huh? I have the strangest feeling of Deja vu...")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs20#Waaah! No eat! No fight!")

    sm.setSpeakerID(Lyon)
    sm.setBoxChat()
    sm.sendNext("Muto, didn't we give you delicious food? Now get up and stop Gulla!")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Chief, why don't you let me try...")
    sm.sendNext("Muto. It's been hard protecting us until now, hasn't it?")
    sm.sendNext("You don't need to fight if you don't want to. I'm just happy that you're eating... And thank you for eating the food I made. I know it isn't very good...")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs20#Om... Yum! Goooooood.")

    sm.setSpeakerID(Pibik)
    sm.setBoxChat()
    sm.sendNext("Ah! He even ate Master Lyck's food!")

    sm.setSpeakerID(Pimi)
    sm.setBoxChat()
    sm.sendNext("Gulla's almost here! Eek!")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Muto... is full.... ... Thank you.")
    sm.sendNext("Now... I go... Play... With #rGulla#k...")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("Muto... You're going to protect us?")

    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Yes... Muto... Eat delicious food... Protect... #bfriends#k....")

    sm.setSpeakerID(Simia)
    sm.setBoxChat()
    sm.sendNext("(Sniffs) #bFriends#k... Muto... Thanks...")

    sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/fight", 4, 1, -1, 0)
    sm.sendDelay(2000)
    sm.OnOffLayer_Off(1000, "0", 0)

    sm.sendDelay(3000)

    sm.unlockUI()
    sm.completeQuest(34217)
    sm.warpInstanceOut(chr, 450002021)
    #sm.dispose()
else:
    sm.lockUI()
    sm.removeAdditionalEffect()
    sm.removeEscapeButton()
    sm.hideUser(True)
    sm.blind(1, 255, 0, 0)
    sm.forcedInput(1)
    sm.sendDelay(50)
    sm.forcedInput(0)
    sm.blind(0, 0, 0, 1000)
    sm.hideUser(False)
    sm.zoomCamera(0, 1500, 0, -307, 150)
    sm.setPlayerBoxChat()
    sm.sendNext("Well, that wasn't very nice.")
    sm.sendNext("But why did it suddenly dump me here? I thought the #bFlying Fish#k was here to help me?")
    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("Mu... to... hun-gry...")
    sm.forcedInput(2)
    sm.sendDelay(50)
    sm.forcedInput(0)
    sm.setPlayerBoxChat()
    sm.sendNext("What was that?")
    sm.setSpeakerID(Muto)
    sm.setBoxChat()
    sm.sendNext("#fs40#MUTO IS HUNGRY!")
    sm.resetCamera()
    sm.setPlayerBoxChat()
    sm.sendNext("AHH! What is that thing?!")
    sm.unlockUI()
    #sm.dispose()