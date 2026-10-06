# [Commerci Republic] The Problem with Presumptions

MAYOR_BERRY = 9390201

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Excuse me, Mayor? D-do you have a moment?")

sm.setSpeakerID(MAYOR_BERRY)
sm.setBoxChat()
sm.sendNext("Well you done stopped by at a mighty fine time! Ain't it a lovely day? It's been a fish-full day, I tell you what, and that's the best kind there is, far as I's concerned!")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Uh... great! There's something I need to tell you.")

sm.setSpeakerID(MAYOR_BERRY)
sm.setBoxChat()
selection = sm.sendNext("Well, go on an' spit it out!\r\n"
            "\r\n"
            "#L0##b(I should rethink this.)#l\r\n"
            "#L1##b(There's no better time to tell him the truth.)#l")

sm.setPlayerBoxChat() # Has to be Player Avatar
if selection == 0:
    sm.sendNext("Oh, I just wanted to tell you what a beautiful day it is")
    
    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("Oh, ye. It truly is a gorgeous day, today")
elif selection == 1:
    sm.sendNext("I uhh, lied about being a tourist. I'm really here as a representative of Empress Cygnus to extend a formal offer of friendship.")

    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("Say what now? You ain't no tourist... but a representative o' that fancy Syggus lady?")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("Uh... Sure, close enough... I was worried you might mistrust me if I told you my real mission on our first meeting. But after you treated me so kindly after I was shipwrecked, I knew I couldn't keep it from you any longer.")

    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("Well, that's all well an' good, and I'm tickled that you'd say that... But why is you troublin' yourself with ol' Mayor Berry? After all, I's just a Mayor of this lil' village.")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("But aren't you... in charge? I was told to speak with the highest official in Commerci.")

    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("Uh-hehehe! Well ain't you as confused as a toad in a bird's nest! I think you's havin' a bit of misunderstandin'.")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("Uh... What do you mean?")
    
    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("Sure, I's the most officialest person in this here village, but are you under the impreshin' that Berry is the only place in the whole o' Commerci? This right here is just one small fishin' village. Why, you oughtta head down to #e#bSan Commerci#k#n, the #ecapital#n of the Repulic, and talk to them folks.")
    
    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("San... Commerci?")
    
    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("That's right! The fella you's lookin to see goes by the name o' #bGilberto Daniella#k. He's the Prime Minister of the whole dam Commerci Republic. That's the one you wanna deliver Ms. Syggus' message to.")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("So... San Commerci is the biggest village in Commerci, then?")

    sm.setSpeakerID(MAYOR_BERRY)
    sm.setBoxChat()
    sm.sendNext("A village? Youngster, i think that strom might've bumped your noggin' somethin' fierce. San Commerci is a city! A downright bustlin' metropolis, even! Now everybody knows that San Commerci is the capital of the Commerci Republic! It's the place all roads lead to.")
    
    sm.sendNext("I can't understand how folks stand to live cooped up like sardiness... They outghtta come here. Berry Village is the happiest place in Commerci!")

    sm.sendNext("Hmm. You may want to have a word with the Prime Minister's boy. He's servin' as captain for one of them big ships what the #bDaniella Merchant Union#k gots docked in the city. He just so happens to be staying right here in Berry!")

    sm.sendNext("I'd like you to have this. I know you ain't really no tourist, but consider it a souvenir of your time in Berry Village!")
    
    sm.sendNext("Consider it a gift from ol' Berry. I'll be cheerin' for you youngster!")
    
    sm.startQuest(parentID)
    sm.giveItem(1003984) # Commerci Hat
    
    sm.setSpeakerID(MAYOR_BERRY) # Mayor Berry
    sm.setBoxChat()
    sm.sendNext("As it happens, You's not the only visitor to Berry today. There's that fancy-lookin' fella. The Prime Minister's boy, calls himself #bLeon Daniella#k. He's got a head like an ice cream cone with all that goop in this hair, but he seems like a good enough kid. May be you two's'll get along!")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("Thanks, Mayor Berry. I owe you one.")

    sm.setSpeakerID(MAYOR_BERRY) # Mayor Berry
    sm.setBoxChat()
    sm.sendNext("See? Just as I thought, you's as honest as a ping at a barbecue! And such a good'n too. Well you should go'n get yourself acquainted with that Daniella boy if you's lookin' to talk to his pappy!")

    sm.setPlayerBoxChat() # Has to be Player Avatar
    sm.sendNext("#b(According to Mayor Berry, San Commerci is a huge busy city. It's hard to imagine that after landing in the gores the village of Berry. You should hurry and meet with the son of Commerci's Prime Minister!)#k")
    sm.completeQuest(17612)
