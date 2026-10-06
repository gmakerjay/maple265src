import time, random

golluxPenny = 4310098 #Gollux Penny
golluxCoin = 4310097 #Gollux Coin
reinforcedBelt = 1132245 #Reinforced Engraved Gollux Belt
reinforcedPendant = 1122266 #Reinforced Engraved Gollux Pendant
powerElixir = 2000005 #Power Elixir
spellTrace = 4001832 #Spell Trace

items = []
quantitys = []

items.append(spellTrace)
quantitys.append(40)

#3 Power Elixir drops with random quantities between 1-4
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))

#1 singular Gollux Penny drop and 4 with random quantities between 1-5
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))

#1 singular Gollux Coin drop and 1 with a random quantity between 10-19
items.append(golluxCoin)
quantitys.append(1)
items.append(golluxCoin)
quantitys.append(random.randint(6,8))

if random.randint(1,100) <= 20:
    items.append(reinforcedBelt)
    quantitys.append(1)
if random.randint(1,100) <= 15:
    items.append(reinforcedBelt)
    quantitys.append(1)

if random.randint(1,100) <= 30:
    items.append(reinforcedPendant)
    quantitys.append(1)
if random.randint(1,100) <= 15:
    items.append(reinforcedPendant)
    quantitys.append(1)

reactor.incHitCount()
if sm.getInstance() is not None and not field.isRewardDropped() and reactor.getHitCount() == reactor.getMaxHitCount():
    field.setRewardDropped(True)
    sm.removeReactorByObjectID(objectID)
    time.sleep(.75)
    sm.spawnReactorInState(8630004, 95, 67, 1)
    chr.getField().dropItemsAlongLine(items, quantitys, True, 115, 95, 75, 125, chr)
