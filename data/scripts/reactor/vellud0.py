import time, random

golluxPenny = 4310098 #Gollux Penny
golluxCoin = 4310097 #Gollux Coin
crackedBelt = 1132243 #Cracked Engraved Gollux Belt
crackedPendant = 1122264 #Cracked Engraved Gollux Pendant
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

#3 singular Gollux Penny drops and 2 with random quantities between 1-3
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(1)
items.append(golluxPenny)
quantitys.append(random.randint(1,3))
items.append(golluxPenny)
quantitys.append(random.randint(1,3))

#1 singular Gollux Coin drop and 1 with a random quantity between 1-4
items.append(golluxCoin)
quantitys.append(random.randint(1,2))
items.append(golluxCoin)
quantitys.append(random.randint(1,2))


if random.randint(1,100) <= 35:
    items.append(crackedBelt)
    quantitys.append(1)
if random.randint(1,100) <= 5:
    items.append(crackedBelt)
    quantitys.append(1)

if random.randint(1,100) <= 45:
    items.append(crackedPendant)
    quantitys.append(1)
if random.randint(1,100) <= 5:
    items.append(crackedPendant)
    quantitys.append(1)


reactor.incHitCount()
if sm.getInstance() is not None and not field.isRewardDropped() and reactor.getHitCount() == reactor.getMaxHitCount():
    field.setRewardDropped(True)
    sm.removeReactorByObjectID(objectID)
    time.sleep(.75)
    sm.spawnReactorInState(8630004, 95, 67, 1)
    chr.getField().dropItemsAlongLine(items, quantitys, True, 115, 95, 75, 125, chr)
