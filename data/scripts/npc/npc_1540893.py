#Quartermaster Sakaro - Stigma Coin Exchange
#npc_1540893

FAINT_STIGMA_SPIRIT_STONE = 4001868
TWISTED_STIGMA_SPIRIT_STONE = 4001869
STIGMA_COIN = 4310199

REQUIRED_FAINT_STIGMA_SPIRIT_STONE = 20
REQUIRED_TWISTED_STIGMA_SPIRIT_STONE = 1

sm.flipSpeaker()
#sm.flipDialoguePlayerAsSpeaker()
selection = sm.sendNext("Give me 20 #i4001868# #z4001868# items and 1 #i4001869# #z4001869#, I'll give u 1 #i4310199# #z4310199#. Do we have a deal? \r\n"
            "#L0# #i4310199# #z4310199# #l")
if sm.hasItem(FAINT_STIGMA_SPIRIT_STONE,REQUIRED_FAINT_STIGMA_SPIRIT_STONE) and sm.hasItem(TWISTED_STIGMA_SPIRIT_STONE,REQUIRED_TWISTED_STIGMA_SPIRIT_STONE):
   if not sm.canHold(STIGMA_COIN, 1):
          sm.sendSayOkay("Make sure you have space in your inventory.")
   else:
        sm.consumeItem(FAINT_STIGMA_SPIRIT_STONE, REQUIRED_FAINT_STIGMA_SPIRIT_STONE)
        sm.consumeItem(TWISTED_STIGMA_SPIRIT_STONE, REQUIRED_TWISTED_STIGMA_SPIRIT_STONE)
        sm.giveItem(STIGMA_COIN)
        
        sm.flipSpeaker()
        sm.sendNext("Thanks #r#h0# #k!")
        
        sm.flipDialoguePlayerAsSpeaker()
        sm.sendNext("Thanks Bro!")

else:
     say = "You need at least 20 #i4001868# #z4001868# and 1 #i4001869# #z4001869#." + "You only have " + "#r" + "#c4001868# " + "#k" +"#i4001868# #z4001868# " + " and\r\n" + "#r" + "#c4001869#" + "#k" +"#i4001869# #z4001869#"
     sm.sendSayOkay(say)
     sm.flipDialoguePlayerAsSpeaker()
     sm.sendNext("Opps Sorry")
     