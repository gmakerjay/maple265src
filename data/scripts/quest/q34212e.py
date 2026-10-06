Pimi = 3003154

sm.setSpeakerID(Pimi)
sm.flipDialogue()
sm.sendNext("At last, the seafood patty is complete! We'll just crunch up the shells and sprinkle them on top, and... Volla! What a masterpiece, eh?")

sm.flipDialogue()
sm.sendSay("Muto will absolutely adore our #b" + str(sm.getQRValue(34207)) + " Sandwich#k! Hahaha.")

sm.completeQuest(34212)