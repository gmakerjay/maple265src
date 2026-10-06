from net.swordie.ms.constants import GameConstants
from net.swordie.ms.client.character.skills.temp import CharacterTemporaryStat
from net.swordie.ms import ServerConfig

if chr.getLevel() >= 160 and chr.getLevel() <= 179:
    nextLvl = chr.getLevel() + 1
    sm.giveExpNoAffectedByExpRate(GameConstants.charExp[nextLvl] / 2)
    sm.giveCTS(CharacterTemporaryStat.ExpBuffRate, ServerConfig.EXP_RATE * 100, -2436619, 1800)
    sm.consumeItem(2436619)
else:
    sm.chat("Unable to use this item on your level")