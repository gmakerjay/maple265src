# Mystic Stolen Potion (2431835)
from net.swordie.ms.util import Util
from net.swordie.ms.client.character.skills.temp import CharacterTemporaryStat

if Util.succeedProp(50):
    chr.heal(chr.getMaxHP())
else:
    chr.healMP(chr.getMaxMP())

