# The Mark of Heroism

John_Barricade = 9201054

sm.setSpeakerID(John_Barricade)
if sm.sendAskYesNo("It's about time! We need to make you a way to travel safely to the summit of the Crimsonwood Valley, or else all we've been doing was for naught. You have to lay hands on the #b#t3992039##k. Are you ready to go?"):
    sm.sendSayOkay("Okay, I need you to have these items on hand first: #b10 #t4010006##k, #b4 #t4032005##k and #b1 #t4004000##k. Go!")
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("Okay, then. See you around.")