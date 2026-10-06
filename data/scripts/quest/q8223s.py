# Storming the Castle

Nameless_Warrior = 9201581

sm.setSpeakerID(Nameless_Warrior)
if sm.sendAskYesNo("Oh, Jack sent you here? Good timing, I'm planning alongside Jack and others to storm the Keep and retake it from the Twisted Masters what is ours by right. You seem ready to fight alongside us, right?"):
    sm.sendSayOkay("Great! Your mission now is to rack down some numbers of their army and weaken their defenses by all effects. Defeat 75 of each: Windraider, Firebrand and Nightshadow, then return to me to report.")
    sm.startQuest(parentID)