from net.swordie.ms.enums.social.Party import PartyQuestType
from net.swordie.ms.constants import GameConstants

if sm.getFieldID() == GameConstants.NETT_PYRAMID_ENTRANCE_MAP or sm.getFieldID() == 910002000:
    chr.startPartyQuest(PartyQuestType.NETT_PYRAMID, 0)
else:
    chr.startPartyQuest(PartyQuestType.NETT_PYRAMID, 1)