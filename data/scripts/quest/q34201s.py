Lyon = 3003150

sm.startQuest(34201)

sm.lockUI()
sm.removeAdditionalEffect()
sm.removeEscapeButton()

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Here we are, the heart of #bChu Chu Island#k! Welcome to #bChu Chu Village#k!")

sm.setPlayerBoxChat()
sm.sendNext("#bChu Chu#k?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Yeah #bChu Chu#k! What do you think? Isn't it a great name? Hahaha! I have the greatest names! Don't you like it?")

sm.setPlayerBoxChat()
sm.sendNext("#bWho are you#k? And what was that #bHuge creature#k blocking my path? I need to keep going... Although... I'm hungry... and my head really hurts.")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("You sure are curious.")
sm.sendNext("Well, I'm curious about you too. Allow me to start.")
sm.sendNext("We are...!")
sm.sendNext("Actually, I'm afraid I don't remember! Heheheh!")

sm.setPlayerBoxChat()
sm.sendNext("That's... suspicious.\r\nAre you a servant of the #rBlack Mage#k?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("The #rBlack Mage#k? What's that?")

sm.setPlayerBoxChat()
sm.sendNext("Your #bmaster#k who's sitting at the end of this river, plotting to destroy the world!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Uh... I don't know much about the river. And that #rmaster#k thing you mentioned is new to me.")
sm.sendNext("Well actually, there is this #bcool#k, #bbrave#k, #band handsome#k chief but...'Master'? I'd say I'm a #bvolunteer#k. I'm nice like that. Nobody #basked mek to maintain order, I just do it out of the kindness of my heart, meow!")
sm.sendNext("And in any case, those that live here don't have any #bmemories of their past.#k It's kinda weird now that I think about it.")
sm.sendNext("We all just sort of woke up at different times in different places. Eventually we ran into each other, and started this village, meow!")

sm.setPlayerBoxChat()
sm.sendNext("(It seems he's a little too dumb to be one of the #rBlack Mage's minions#k...)")
sm.sendNext("(A lion that walks and talks like a person...Were the residents of Chu Chu Island created #bby mixing lifeforms#k...?)")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Not sure what you're mumbling about over there, but Chu Chu Island is a beautiful place overflowing with food.\r\n#bEveryone#k here is #bvery#k happy.")
sm.sendNext("Except for #bMuto#k")

sm.setPlayerBoxChat()
sm.sendNext("#bMuto#k?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Right! The one who #battacked#k you and #bstole your food#k!")

sm.setPlayerBoxChat()
sm.sendNext("Oh...That huge creature? What's his deal anyway?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Muto is a #bbaby#k adored by the people of #bChu Chu Village#k. He's such a #bnice, honest kid#k.")

sm.setPlayerBoxChat()
sm.sendNext("Uh...He seems abit violent..")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("What? Out #bMuto#k? Don't be silly.\r\nHe's just a kind little fella that #bprotects our village#k...")
sm.sendNext("Y'see, there are #btwo colossal#k creatures here on Chu Chu Island.")
sm.sendNext("There's our boy #bMuto#k of course, and then there's #rGulla#k.")
sm.sendNext("#rGulla#k lives in the river. He doesn't understand words or reason, unlike us or #bMuto#k.")

sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/attack", 4, 1, -1, 0)

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("And he's #rrough#k as all get-out. Gulla comes up here #bevery 10 days#k to #beat#k anything that moves.")

sm.OnOffLayer_Off(1000, "0", 0)

sm.sendDelay(1000)

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Good thing we've got #bour adorable Muto to beat up Gulla#k every time he shows up!")

sm.OnOffLayer_On(2000, "0", 0, 0, 0, "Map/Effect2.img/ArcaneRiver2/fight", 4, 1, -1, 0)
sm.sendDelay(1000)
sm.OnOffLayer_Off(1000, "0", 0)

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("For the gift of regular beatings, we feed Muto all the delicious food we can scrounge up. You may have noticed, but he's a little on the heavy side... that was probably us.")
sm.sendNext("This whole arrangement had been working out pretty well, #buntil recently#k...")

sm.setPlayerBoxChat()
sm.sendNext("What happened?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Err.. well... #bHee#k")

sm.setPlayerBoxChat()
sm.sendNext("Go on!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("He got #bpicky about his food#k...")

sm.setPlayerBoxChat()
sm.sendNext("That's crazy!")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Muto said the food we made was yucky, and he stopped fighting against Gulla... As a result, the villagers live in fear of #rGulla#k every day...")
sm.sendNext("Oh, but hey! That #bfood#k you gave Muto!\r\nHe #breally liked it!#k")
sm.sendNext("No... I understand where Muto's coming from... There is nothing more difficult than #beating food that doesn't taste good... Poor Muto...#k")

sm.setPlayerBoxChat()
sm.sendNext("But he ate almost everything I had! I've got, like, one corner of sandwich left.")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Oh... really? That's no good. That's like a crumb to our big ol' Muto.")

sm.setPlayerBoxChat()
sm.sendNext("But he ate all of the food in my bag, except for this lonely half of a sandwich.")
sm.sendNext("Uh... So anyway, is the #ba way#k to get around Muto so I can reach the end of the river?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Tase matters, but... Muto throws a tantrum if his meal doesn't fill him up.")

sm.setPlayerBoxChat()
sm.sendNext("Uh... So is there #bany way#k to get around Muto so I can reach the end of the river?")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Nope! #bNot a single one#k.")

sm.setPlayerBoxChat()
sm.sendNext("You... Sound so sure about that.")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Stranger! Let's work together! You need to make it further down the river, and #byou're not going anywhere#k if Muto doesn't move.")

sm.setPlayerBoxChat()
sm.sendNext("....")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Also, we're kind of all at #rGulla's mercy#k without help from #bMuto#k...")
sm.sendNext("So what do you say? Will you help us make food that #bMuto#k will actually eat?")
sm.sendNext("It shouldn't be hard at all. This place is packed with #bdelicious ingredients#k! Yes, siree!")

sm.setPlayerBoxChat()
sm.sendNext("I can't cook.")

sm.setSpeakerID(Lyon)
sm.setBoxChat()
sm.sendNext("Oh! Don't worry about that! I already told the greatest chef on the island, #bMaster Lyck#k, about you and your #bdelicious, undersized food#k!")
sm.sendNext("Why don't you pay #bMaster Lyck#k a visit right now!")
sm.sendNext("Oh, and hey... When you see #bMaster Lyck#k, don't say anything about his #btongue#k, okay?")

sm.completeQuest(34201)
sm.unlockUI()