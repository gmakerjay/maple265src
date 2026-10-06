Solus = 9201430

sm.setSpeakerID(Solus)
sm.sendNext("#v3800860#\r\nWe are the Night Angels, watchers of darkness.")
sm.sendSay("The BDF? Children with pop-guns. They do not understand true darkness.")
if sm.sendAskYesNo("You seem different. More... open-minded. Will you help us?"):
    sm.sendNext("We'll start simple. Pick off the weak demons on the outskirts of Blackgate.")
    sm.startQuest(parentID)