sm.setSpeakerID(2151003)
sm.sendNext("Thank you for coming. I'll explain more about the underground mine situation, but first... You know who this is?")

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("I know that face!")

sm.setSpeakerID(2151003)
sm.sendSay("You should. She is the founder of the Black Wings and the commander of the Black Mage's Army...")

sm.flipSpeaker()
sm.flipDialoguePlayerAsSpeaker()
sm.sendSay("Orchid.")

sm.setSpeakerID(2151003)
sm.sendSay("She is the reason our city was taken. She is the one who masterminded the theft of the Seal Stones, attacked Mercedes... That such a small girl could have caused so much havoc...")

sm.sendSay("She's been quiet for a while now, so i knew there must be trouble brewing. The Black Wings appear to have had a coup.")

sm.sendSay("We've pieced together some information suggesting that Orchid was ousted from her position. We're not sure why, but there has been a huge shake-up in the command structure of the Black Wings.")

sm.sendSay("It all seems to have begun when Orchid was betrayed by the scientist...")

sm.startQuest(1801)
sm.warpInstanceIn(chr, 957020001)