# [Commerci Republic] Parbell, World's 'Greatest' Explorer

from net.swordie.ms.world.field.fieldeffect import GreyFieldType

PARBELL = 9390200

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Excuse me, are you Parbell the Explorer?")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("What d'yuh means, don't yuh recognize me? Gaze 'pon this hansom visage! Haven't ya heard about ol'Parbell, the Greatest 'Splorer in the whole o' Maple World!? Sheesh, young'uns these days!")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("(He seems a little upset.)")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("So, I hears yuhs seeking' passage to the good ol' 'Public o' Commerci...\r\nThat about right?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("Y-Yessir, I's am... I mean, that's right. Why do you ask?")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("Hows yuh plannin' to get there?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("E-Excuse me...? I was... Neinheart, said you would have a ship ready for me, uh, Mr. Great Explorer, sir...")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("Oh, Parbell the Great, done readied a ship for you. There's no doubtin' that. Question is, how yuhs plan on getting on that ship?")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("I... uh.. By walking? With my feet?")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("Y'uns about as smart as a bag of hammers, ain't yuhs? Let ol' Parbell make it all simple-like for y'un. I gots a ship. You wants to get on that ship. I done readied mah ship like I's told. #eTraditionally at this point some form o' currency get s'changed#n.")

sm.setPlayerBoxChat() # Has to be Player Avatar
sm.sendNext("(Are you kidding me? Neinheart expects me to pay for the trip myself? He's in for a stern talking-to...)")

sm.sendNext("I, uhh... I'm afriad I don't have any sort of payment ready, Mr. Great Explorer, sir, but I'll definitely repay you when I can. Whatever you think is appropriate. I swear on the Empress's name.")

sm.setSpeakerID(PARBELL)
sm.setBoxChat()
sm.sendNext("Empress? She ain't MAH Empress. Shucks, this here's why I never deal with no greenhorns... You gots you way with words, I gives yuh that. Well, get on mah ship, a promise is a promise. I'll deliver you to Commerci all safe 'n cozy-like, but remember yer offer. Words carry weight.")

response = sm.sendAskYesNo("I'll be collectin' on that promise, 'fore long. When all's said 'n done, y'uns shold feel plum tickled that I, Parbell the Great, am showin' yuhs the way! \r\nReady to set sail?\r\n#b(You will be moved to Commerci if you accept.)")

if response:
    sm.startQuest(parentID)
    sm.startQuest(17608) # [Commerci Republic] After a Pleasant Voyage
    sm.warp(865090003, 0)
else:
    sm.sendSayOkay("What? Yuh can't backs out now! Yuh know how long it tooks me to gets mah ship ready!?")
