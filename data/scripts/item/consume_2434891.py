from net.swordie.ms.util import Util

consume_item = 2434891

super_rare_items = [
	1702565, #Death's Scythe
	1102809, #Death Waltz Cloak
]

rare_items = [ 
	1702712, #Moon Bunny Bell Weapon
	1102955, #Moon Bunny Cape
	2435850, #Moon Bunny Damage Skin	
	2433902, #Beasts of Fury Damage Skin
	2435832, #Chrome Damage Skin (Ver. 1)
	3015449, #Crimsonwood Warrior
	3015579, #Hydrojet Chair
	3015500, #Dozing Duckling Chair
	3015499, #Rainbow Sheep Chair
	1052458, # Lucia Overall
]
common_items = [
	1053089, #Moon Bunny Outfit (M)
	1053090, #Moon Bunny Outfit (F)
	1004830, #Moon Bunny Bell Wig (M)
	1004831, #Moon Bunny Bell Wig (F)
	1052540, #Cow Costume
	1052541, #Tiger Cub Outfit
	1052841, #Sweet Persimmon Suit
	1050384, #Penguin Doll Outfit
	1052077, #Moon Bunny Costume
	1052193, #Honeybee Costume
	1052587, #Harp Seal Doll Outfit
	1052594, #Green Dinosaur Overall
	1052595, #Purple Dinosaur Overall
	1053097, #Sweet Penguin Doll Outfit
	1053098, #Fresh Penguin Doll Outfit
	1053115, #Egg Outfit
	2435569, #Golden Damage Skin
	2436360, #Neon Lights Damage Skin
	3015638, #Fountain Fun Chair
	3015583, #Resistance Water Warrior Chair
	3015641, #Deep Sea Fishing Chair
	3015580, #Water Ball Volley Chair
	3015556, #Phantom's Banquet Chair
	3015557, #Imperial Cygnus Feast Chair
	3015647, #Mushroom Shrine Chair
	3015551, #Monster Gachapon Chair
	3015501, #King's Day Festival Chair
	3015497, #The Bund Fireworks Chair
	3015498, #Puppet Show Chair
	3015404, #Bloom, Elluel
	3015350, #Black Heaven Amusement Park Ride Chair
]

sm.setSpeakerID(9000193)
dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k?\r\n" % (consume_item)

dialog += "\r\n#eExtremely Rare - 1% Chance#n\r\n"
for item in super_rare_items:
	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)

dialog += "\r\n#eRare - 9% Chance#n\r\n"
for item in rare_items:
	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)

dialog += "\r\n#eCommon - 90% Chance#n\r\n"
for item in common_items:
	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)	

if sm.sendAskAccept(dialog):
	if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(3) >= 1:
		sm.consumeItem(consume_item)
		if Util.succeedProp(90):
			index = Util.getRandom(0, len(common_items) - 1)
			sm.giveItem(common_items[index])
		else:
			index = Util.getRandom(0, len(rare_items) - 1)
			sm.giveItem(rare_items[index])
	else:
		sm.sendSayOkay("Please make more space in your Equip, Use, Setup inventory.")