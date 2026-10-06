# So Gong (2091011) | Mu Lung Dojo Hall

dojoHall = 925020001

if sm.getFieldID() == dojoHall:
    selection = sm.sendNext("My master is the strongest person in Mu Lung, and YOU wish to challenge HIM? I have a feeling you'll regret this.\r\n#b"
                "#L0#Enter Mu Lung Dojo.#l\r\n"
                "#L1#What is Mu Lung Dojo?#l\r\n"
                "#L2#What rewards can I get from Mu Lung Dojo?#l\r\n"
                "#L3#How many attempts do I have left today?#l\r\n")
                #"#L4#I'd like to enter the Unity Training Center.#l\r\n"
                #"#L5#I'm ready for the Mu Lung Dojo Point Distribution.#l\r\n"
                #"#L6#I want the Mu Lung Dojo ranking rewards.#l\r\n")

    if selection == 0: # Enter Mu Lung Dojo.
        sel = sm.sendAskYesNo("Upon entering Mu Lung Dojo, #e#ball your buffs#k#n will be removed.\r\n\r\nDo you still want to challenge the dojo?")
        if sel == 1:
            if chr.getParty() is None:
                if sm.checkAttempt(1213, 1):
                    sm.addAttempt(1213, 1)
                    sm.warpInstanceIn(chr, 925070100) # Dojo Floor 1
                    sm.setInstanceTime(900)
                else:
                    sm.sendSayOkay("You have reached daily maximum attempt.")
            else:
                sm.sendSayOkay("Please leave your party before going in.")
        else:
            sm.sendSayOkay("Don't be so fickle!\r\n\r\nThis place isn't for the faint of heart. Think carefully before you enter!")
    elif selection == 1: # What is Mu Lung Dojo?
        sm.sendNext("My master is the strongest in Mu Lung. It was he who created the #bMu Lung Dojo#k, in fact.")
        sm.sendSay("79 floors of challenges, with my master on the #b80th#k. The higher you climb, the stronger you'll need to be!")
        sm.sendSay("Except for the 80th floor where my master is, each floor is guarded by #rmonster of Maple World#k. I don't know exactly what brought them here. Only the master knows that.")
        sm.sendSay("#rAll your buffs#k will be removed when you enter. Don't you think it's better to fight with just your own strength?")
        sm.sendSay("You're free to remain at the entrance, but the #rtimer will only stop for 30 seconds#k. It's best that you get ready and hurry to the 1st floor if you want to set a good record.")
        sm.sendSay("On #efloor 1 to 9#n and #e11 to 19#n, only #bone boss#k appears. So you only need to defeat one in each level range to advance.")
        sm.sendSay("From #efloor 21 to 29#n, #bone boss#k will appears with its #b5 minions#k. You must defeat all of them to advance to the next floor.")
        sm.sendSay("You must face #bat least 2 bosses#k on each of the floors from #e31 to 39#n. Don't tell me that scares you...Hehehe...")
        sm.sendSay("Don't worry, only #bone boss#k will appear starting from the #e41st floor#n. But i don't known if that's going to make things easier. Hehehehe...")
        sm.sendSay("Except for the 80th floor where my master is, #bnamed bosses#k appear #eevery 10 floor#n, up until the 70th floor.\r\n\r\nNote that potions can be used once every #r15 seconds#k here.")
        sm.sendSay("From the #e41st floor#n up, potions may still be used once every #r15 seconds#k. Why, you ask? Well, you'll understand when you go inside. Heheehe...")
        sm.sendSay("Who's on each floor? Find out for yourself as you advance. You'll only get access to that info if you're strong enough, hehehe...")
        sm.sendSay("Well, i'll tell you one thing...#eFloors 74 to 79#n are guarded by #b my master's disciples#k. You'll suffer if you meet them with your inadequate skills.")    
        sm.sendSay("You can only use a #btenth#k of your power from Maple World, because my master has special seals set up inside Mu Lung Dojo. Don't say I did'nt warn you!")   
        sm.sendPrev("Go in if you understand. Are'nt you aching to go?")             
    elif selection == 2: # What rewards can I get from Mu Lung Dojo?
        sel = sm.sendNext("There was two types of rewards you can get from Mu Lung Dojo. There are rewards you get for ranking in the #rtop ranks#k of each category, and then there are #rpoints#k you get for challenging the dojo, which you can trade in for items.\r\n\r\n#b#L0#Tell me more about the rank rewards.#l\r\n#L1#Tell me more about participation rewards and points.#l#k")
        if sel == 0:
            sm.sendNext("The master rewards those in the #btop ranks#k each week.\r\n\r\nStrength is what we value the most here in Mu Lung Dojo, and you'll be rewarded for proving yours.")
            sm.sendSay("Rank ranges are split by level to make things fair. Check out which rank range you belong to below.\r\n\r\n#e- #bNovice#k: Lv. 105 - 200\r\n#e- #rMaster#k: Lv. 201 and above")  
            sm.sendSay("It may be obvious, but rewards differ by rank range.\r\n\r\n#bAll rewards are given based on the rank range you're currently in.#k\r\n\r\nIf you were highly ranked in a previous rank range, you won't get those rewards.") 
            sm.sendPrev("For reward details, press the #rHelp button on the Mu Lung Dojo Rankings UI#k.")         
        elif sel == 1:
            sm.sendNext("Points can be earned in the following ways.\r\n\r\n- You'll get points for the #bnumber of floors#k you pass.\r\n- You'll get points according to your #bpercentile within your rank range#k.")
            sm.sendSay("You will gain 10 points for every floor you conquer and an additional 100 points for every 10th floor.")
            sm.sendSay("The higher you make it, the more points you will earn and the better your ranking!")
            sm.sendSay("Points based on ranking percentiles are given when you're within a #bcertain percentile#k for each ranking group. In other words, you need to be stronger than others if you want points. Hehehe...\r\n\r\n#e- #bNovice#k: Top 50%\r\n- #rMaster#k: Top 70%")
            sm.sendPrev("The limit on points is #b500,000#k, so don't just hoard them.")
    elif selection == 3: # How many attempts do I have left today?
        count = 1
        if sm.hasQuest(1213):
            count = 1 - int(sm.getQRValueByKey(1213, "count"))
        sm.sendNext("You can enter Mu Lung Dojo " + str(count) + " time(s) today. You really should keep count yourself.")
    #elif selection == 4: # I'd like to enter the Unity Training Center.
        #sel = sm.sendAskYesNo("Mu Lung's Unity Training Center is open to the public! However, only the strong and sincere may enter. Bring me a charm from Lao to enter. You may stay as long as the power in the charm holds.\r\n\r\nWill you enter now?\r\n#b(EXP is earned automatically depending on the character's level when entering the Unity Training Center.)#k")
        #if sel == 1:
            #sel1 = sm.sendNext("Okay, show me your Unity Training Center Charm.\r\n\r\n#L0##bUnity Training Center Charm (1 hour)#k#l")

    #elif selection == 5: # I'm ready for the Mu Lung Dojo Point Distribution.
        #sm.sendSayOkay("Mu Lung Dojo Point is al")
        #sm.sendNext("I'll give you points based on your highest ranking last week. Let's see...")
    #elif selection == 6: # I want the Mu Lung Dojo ranking rewards.
        #sm.sendSayOkay("There are no records of your challenging Mu Lung Dojo. Challenge Mu Lung Dojo and come back if you want the reward.")

elif sm.sendAskYesNo("Are you giving up already?"):
    sm.warpInstanceOut(chr, dojoHall)
