# Trait Boost Potion (2430909)

from net.swordie.ms.enums import Stat
import random

traitDict = {
    0: Stat.charismaEXP, # Ambition
    1: Stat.insightEXP, # Insight
    2: Stat.willEXP, # Willpower
    3: Stat.craftEXP, # Diligence
    4: Stat.senseEXP, # Empathy
    5: Stat.charmEXP, # Charm
}

rand = random.randint(0,5)
sm.consumeItem(2430909)
sm.incTraitExp(traitDict[rand], 1000)