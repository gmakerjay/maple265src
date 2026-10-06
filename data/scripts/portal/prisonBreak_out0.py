from net.swordie.ms.enums.social.Party import PartyQuestType

if sm.hasMobsInField():
    sm.chat("The portal is not opened.")
else:
    chr.startPartyQuest(PartyQuestType.ESCAPE, 1)
