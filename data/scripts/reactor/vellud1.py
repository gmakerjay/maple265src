import time, random

golluxPenny = 4310098 #Gollux Penny
golluxCoin = 4310097 #Gollux Coin
solidBelt = 1132244 #Solid Engraved Gollux Belt
solidPendant = 1122265 #Solid Engraved Gollux Pendant
powerElixir = 2000005 #Power Elixir
spellTrace = 4001832 #Spell Trace

items = []
quantitys = []

items.append(spellTrace)
quantitys.append(20)

#3 Power Elixir drops with random quantities between 1-4
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))
items.append(powerElixir)
quantitys.append(random.randint(1,4))

#2 singular Gollux Penny drops and 3 with random quantities between 1-5
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(random.randint(1,4))
items.append(golluxPenny)
quantitys.append(random.randint(1,4))
items.append(golluxPenny)
quantitys.append(random.randint(1,4))

#1 singular Gollux Coin drop and 1 with a random quantity between 5-10
items.append(golluxCoin)
quantitys.append(1)
items.append(golluxCoin)
quantitys.append(random.randint(4,6))

if random.randint(1,100) <= 20:
    items.append(solidBelt)
    quantitys.append(1)
if random.randint(1,100) <= 10:
    items.append(solidBelt)
    quantitys.append(1)

if random.randint(1,100) <= 30:
    items.append(solidPendant)
    quantitys.append(1)
if random.randint(1,100) <= 10:
    items.append(solidPendant)
    quantitys.append(1)

reactor.incHitCount()
if sm.getInstance() is not None and not field.isRewardDropped() and reactor.getHitCount() == reactor.getMaxHitCount():
    field.setRewardDropped(True)
    sm.removeReactorByObjectID(objectID)
    time.sleep(.75)
    sm.spawnReactorInState(8630004, 95, 67, 1)
    chr.getField().dropItemsAlongLine(items, quantitys, True, 115, 95, 75, 125, chr)