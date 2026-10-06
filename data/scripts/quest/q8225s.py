# The Right Path

Taggrin = 9201100

sm.setSpeakerID(Taggrin)
if sm.sendAskYesNo("Hey, partner. Now that you make part of the Raven Claws team, I have a task for you. Are you up now?"):
    sm.sendSayOkay("Very well. To prove your valor among our ranks, you must first pass on a little challenge: you have to be able to move extraordinaly well around here, known of all secrets these woods holds. Trace a #bmap of the Phantom Forest#k, then come talk to me. I shall then evaluate if you're worth to be with us.")
    sm.startQuest(parentID)