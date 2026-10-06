from net.swordie.ms.enums.social.Party import PartyQuestType
from net.swordie.ms.constants import WzConstants
import random

PERCENT = random.randint(1,100)
if PERCENT <= 50:
    chr.startPartyQuest(PartyQuestType.ESCAPE, 2)
else:
    sm.showFieldEffect(WzConstants.EFECT_PQ_WRONG);
    sm.playSound(WzConstants.EFECT_PQ_SOUND_WRONG);
    sm.teleportToPortal(0)
