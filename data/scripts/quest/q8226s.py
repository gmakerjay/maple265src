# The Fallen Warriors

Taggrin = 9201100

sm.setSpeakerID(Taggrin)
if sm.sendAskYesNo("Now that you are part of our team, listen to what I have to say. We, Raven Clan of Ninjas, are hired to take care of many issues, and to do so each one works on different sectors of the continent, solving problems for our employers. I'm about to talk about your mission, are you ready?"):
    sm.sendSayOkay("Your next mission is: defeat the Elderwraiths that roam this forest. These are a tough bunch though, so stay alert. I need you to bring me 100 #t4032010# as proof of your duty.")
    sm.startQuest(parentID)