sm.setSpeakerID(2140001)
sm.flipDialogue()
sm.sendNext("According to legend, in ancient times, after the fall of the 365 gods, the goddesses used the Erdas to sculpt this world into being. Supposedly there have also been a select few... human, elf, demon, and dragon... Who have learned the art of #bmanipulating The Erda Flow#k from the goddesses themselves.")
sm.flipDialogue()
response = sm.sendAskYesNo("#fUI/tutorial.img/5skill/0/0#\r\n\r\nThe portal to the Goddess of Maple World can be found at the #bBowman Instructional School in Henesys#k. The Goddess of Grandis can be found at the #bGreat Temple Interior in Pantheon#k. And the Goddess of Tynerum can be found at the #bDeserted Camp at the Dark World Tree#k. If anyone can find their way to the goddess, it is you.")
if response:
    sm.flipDialogue()
    sm.sendSayOkay("Come back to me anytime you are lost.\r\n\r\n#b(Go find the goddess of Maple World.)#k")
    sm.startQuest(1461)
else:
    sm.flipDialogue()
    sm.sendSayOkay("Well, talk to me whenever you feel ready.")