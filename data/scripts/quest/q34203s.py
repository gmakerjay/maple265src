Master_Lyck = 3003152

sm.setSpeakerID(3003152)
sm.flipDialogue()
sm.sendNext("#b#h0##k! I need 20 #v4034942# #b#t4034942# items to make a#k #rsignature dish#k that will satisfy Muto! Slurp!")

sm.flipDialogue()
if sm.sendAskYesNo("Can you be back with my ingredients in a jiffy?!"):
    sm.startQuest(parentID)
    sm.flipDialogue()
    sm.sendNext("You can get #v4034942# #b#t4034942##k by hunting the #bPinedeer#k that live in #bFive-Color Hill#k which is to the right of the villiage!")
    sm.flipDialogue()
    sm.sendPrev("Hurry back, we have a culnary masterpiece to perfect, and very little time! Slurp!")