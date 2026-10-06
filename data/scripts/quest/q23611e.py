# ParentID: 23611
# ObjectID: 0
# Character field ID when accessed: 230050000
PROFESSOR = 2300001
SECRET_AGENT = 1142576
sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("Welcome. You must be the one Claudine mentioned. I am Professor Dreamboat, Sorry the nickname's sort of hard to escape. I am the head of Resistance Research Command, otherwise know as #bVeritas")

sm.setPlayerBoxChat()
sm.sendNext("#bVeritas#k?")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("I doubt Claudine gave you the details over an insecure channel. We are research group, dedicated to tracking and addressing strange phenomena across Maple World that may be related to the Black Mage. We have gathered scholars of all areas of expertise to investigate these happenings.")
sm.sendNext("Unfortunately, we are sorely lacking in people. That's why we're so glad to have a field agent from the Resistance!")

sm.setPlayerBoxChat()
sm.sendNext("But, I... I'm not free to go where i please right now.")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("Ah, yes, someone is tracking you, right? Well, have no worries. I'm sure somebody here can figure that part out. This base is completely undetectable to any scanners, so you're safe enough insade.")

sm.setPlayerBoxChat()
sm.sendNext("Interesting. Would it be possible to create a wearable version of your scambling systems? Perhaps that would...")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("Slow down there, buddy. You're not a building, We can't just load. you down with three-foot-thick lead...Or can we?")

sm.setPlayerBoxChat()
sm.sendNext("I can carry a great deal of weight with my current booster alignment.")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("You'd be the size of a two story building, It's not a good plan.")

sm.setPlayerBoxChat()
sm.sendNext("Unfortunate... I suppose that means this is the only place I can feel safe.")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("Well, there might be anotherway. Maybe cant create a #bPulse Disruptor#k.")

sm.setPlayerBoxChat()
sm.sendNext("#bPulse Disruptor#k?")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("If you're giving of a signal, I'm sure we can create SOME sort of counter-system to block it out. It would require multiple devices though, probaly scattered all over...")
sm.sendNext("This is actually very simiar to something Claudine requested. I bet. I can dig up that research somewhere...")


sm.setPlayerBoxChat()
sm.sendNext("Is there anything I can do?")

sm.setSpeakerID(PROFESSOR)
sm.setBoxChat()    
sm.sendNext("Well, it's probably a little below")
if sm.sendAskYesNo("If you're willing to take the job, I'm ready to hire you as the one-and-only #bVeritas#k special agent. Do you accept? \r\n#b<Accept 2nd Job Advancement.>"):
    if sm.canHold(1142576):
            sm.jobAdvance(3610)
            sm.giveItem(1142576)
            sm.chatScript("<Secret Agent> has been awarded.")
            sm.chatScript("Earned Forever Single title!")
            sm.completeQuest(parentID)
            sm.sendNext("Congratulations, special agent #r#h0##k!")
            sm.sendNext("You probably saw it when you were walking in, but one of our engineers created the world's gaudiest transport device. You can yse it to go out on missions, or get back to the lab any time.")
            sm.sendSayOkay("I know it's pretty ridiculous-looking, but the design is solid as can be.")
           
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 
    

    