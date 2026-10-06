import time, random

golluxPenny = 4310098 #Gollux Penny
golluxCoin = 4310097 #Gollux Coin
superiorBelt = 1132246 #Superior Engraved Gollux Belt
superiorPendant = 1122267 #Superior Engraved Gollux Pendant
powerElixir = 2000005 #Power Elixir
spellTrace = 4001832 #Spell Trace

items = []
quantitys = []

items.append(spellTrace)
quantitys.append(50)

#3 Power Elixer drops with random quantities between 1-4
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))

#5 Power Elixir drops with random quantities between 1-5
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))
items.append(golluxPenny)
quantitys.append(random.randint(1,5))

#1 singular Gollux Coin drop and 1 with a random quantity between 19-39
items.append(golluxCoin)
quantitys.append(1)
items.append(golluxCoin)
quantitys.append(random.randint(10,16))

if random.randint(1,100) <= 20:
    items.append(superiorBelt)
    quantitys.append(1)
if random.randint(1,100) <= 15:
    items.append(superiorBelt)
    quantitys.append(1)

if random.randint(1,100) <= 20:
    items.append(superiorPendant)
    quantitys.append(1)
if random.randint(1,100) <= 15:
    items.append(superiorPendant)
    quantitys.append(1)


reactor.incHitCount()
if sm.getInstance() is not None and not field.isRewardDropped() and reactor.getHitCount() == reactor.getMaxHitCount():
    field.setRewardDropped(True)
    sm.removeReactorByObjectID(objectID)
    time.sleep(.75)
    sm.spawnReactorInState(8630004, 95, 67, 1)
    chr.getField().dropItemsAlongLine(items, quantitys, True, 115, 95, 75, 125, chr)