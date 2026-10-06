sm.setSpeakerID(9062010)
if sm.sendAskYesNo("Hey, #b#h0##k!\r\nI have some news about Maple World.\r\n\r\nIt's about the #rcharacter name change#k! From now on, you can change your character's name #rwhenever you want!#k\r\nDo you want me to go over the basics with you?\r\n(Once accepted, the quest will no longer appear in the lightbulb notifier.)"):
    sm.sendNext("All right! I'll explain how to #bchange your character's name!#k")
    sm.sendSay("1. First, you must find me, #rMr. Newname#k, in the village.")
    sm.sendSay("2. When you click and talk to me you will see the #r'Change Character Name'#k selection. Click the said selection.\r\nDon't forget that you #rneed the #t5532781# or 15,000 Maple Points#k, so make sure you have it ready!")
    sm.sendSay("3. Moving on! You'll see the entry window like the one below. Make note of the warnings, then #renter your new name#k! Just remembeer, you can't use existing names, and your name cannot include banned words.\r\n#v3801031#")
    sm.sendSay("4. You should then be able to play using your new name.\r\n#rOnce you complete the aforementioned steps, you will be moved to the character selection screen. Double-check that the name has been properly changed, then reconnect#k to finish!")
    sm.sendSay("Easy, peasy, right? If you get sick of your name, just come see me, and I'll take care of you!")
    sm.completeQuestNoRewards(26607)

