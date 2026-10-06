sm.setSpeakerID(2170016)
sm.sendNext("Excuse me, could I have a moment?")

sm.sendSay("My pet Xerxes is out doing... something. Something evil. He's been a bad boy.")

sm.sendSay("He's raised an army and is building a tower. We don't know where to or why.")

sm.sendSay("He really must be stopped, so we've come up with a #bgrappling device that shoots our a rope#k.\r\nWe just... miscalculated.")

if sm.sendAskYesNo("The Device can't take our weight. However, if my NEW calculations are correct, it SHOULD work for you. Since you are blessed with convenient tinyness, could you help us?"):
    sm.sendNext("Hooray! All my calculus and braiding was worth it! Use the Dimensional Mirror to come to the #bParty Quest Entrance#k. You can get to Chryse from there.")
    sm.startQuest(31072)
