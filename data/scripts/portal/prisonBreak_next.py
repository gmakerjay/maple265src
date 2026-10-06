from net.swordie.ms.enums.social.Party import PartyQuestType

# Hidden Street : Aerial Prison
if sm.getFieldID() == 921160600:
    if sm.getReactorQuantity() > 1:
        sm.chat("Unlock all the prison doors.")
    else:
        chr.startPartyQuest(PartyQuestType.ESCAPE, 2)
else:
    chr.startPartyQuest(PartyQuestType.ESCAPE, 2)
