# The Fallen Woods

Taggrin = 9201581

sm.setSpeakerID(Taggrin)
if sm.sendAskYesNo("Hey traveler, come here! I am Taggrin, leader of the Raven Ninja Clan. We are mercenaries currently under the payload of the New Leaf City county. Our job here is to hunt down those creatures that have been lurking around here these days. Are you interested to make a little errand for us? Of course, the pay off will be advantageous for both parties."):
    sm.sendSayOkay("Ok. I need you to hunt down #bthose fake trees#k in the forest, and collect 50 of their drops as proof that you made your part on this.")
    sm.startQuest(parentID)