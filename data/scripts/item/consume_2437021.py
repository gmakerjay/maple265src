import random

items = [
    2437024, #Starry Sky Damage Skin
    2436683, #Chick Damage Skin
    2436027, #Blue Shock Damage Skin
    2435832, #Chrome Damage Skin
    2435430, #Blue Flame Damage Skin
    2435429, #Choco Donut Damage Skin
    2435158, #Explosion Damage Skin
    2434664, #Soft-Serve Damage Skin
    2432532, #Gentle Springtime Breeze Damage Skin
    2436024, #Lachelein Damage Skin
    2436026, #Poison Flame Damage Skin
    2435025, #Yeti and Pepe Damage Skin
    2434274, #Marshmallow Damage Skin
]

rewardID = random.choice(items)

if sm.canHold(rewardID):
    sm.consumeItem(2437021)
    sm.giveItem(rewardID, 1)
else:
    sm.sendSayOkay("You lack the required inventory space to use this item")