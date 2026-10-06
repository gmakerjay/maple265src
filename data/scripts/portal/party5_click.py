from net.swordie.ms.enums.social.Party import PartyQuestType

if chr.getFieldID() == 926100000 or chr.getFieldID() == 926100203:
    chr.startPartyQuest(PartyQuestType.ROMEO, 2)
elif chr.getFieldID() == 926110000 or chr.getFieldID() == 926110203:
    chr.startPartyQuest(PartyQuestType.JULIET, 2)