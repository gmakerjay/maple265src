import random

items = [
    2436953, #Frozen Treat Damage Skin
    2436045, #Starlight Aurora Damage Skin
    2435433, #Nanopixel Damage Skin
    2436083, #Twilight Damage Skin
    2436028, #Music Power Damage Skin
    2435432, #Purple Damage Skin
    2435428, #Cosmic Damage Skin
    2435166, #Moon Bunny Damage Skin
    2434273, #Night Sky Damage Skin
    2434530, #Singapore Night Damage Skin
    2434574, #Full Moon Damage Skin
    2435140, #Neon Sign Damage Skin
    2431966, #Digitized Damage Skin
]

rewardID = random.choice(items)

if sm.canHold(rewardID):
    sm.consumeItem(2436942)
    sm.giveItem(rewardID, 1)
else:
    sm.sendSayOkay("You lack the required inventory space to use this item")