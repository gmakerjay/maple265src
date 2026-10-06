#sm.dispose()
# from net.swordie.ms.util import Util

# consume_item = 2431354

# super_rare_items = [
# 	1112135, #Ink-and-Wash Painting Name Tag Ring
# 	1112238, #Ink-and-Wash Thought Bubble Ring
# 	1102766, #Raging Lotus Aura
# 	1702480, #Celena
# ]

# rare_items = [ 
# 	1102847, #Yeonhwa School Guardian Soul Fire
# 	1702589, #Fairy Blossom
# 	1102386, #Nox Cherubim
# 	1702710, #Kamaitachi's Sickle
# 	1115103, #Slumbering Dragon Island Label Ring
# 	1115016, #Heroes Slumbering Dragon Island Chat Ring
# 	1115020, #Heroes Transcendence Stone Chat Ring
# 	1115109, #Heroes Transcendence Stone Label Ring
# ]

# common_items = [
# 	1002877, #Cow Mask
# 	1002771, #Tiger Cub Hat
# 	1002552, #Moon bunny headgear
# 	1004848, #Sweet Pengyin Hood
# 	1003536, # Lucia Hat
# 	1003776, #Harp Seal Mask
# 	1003802, #Green Dinosaur Hat 
# 	1003803, #Purple Dinosaur Hat
# 	1004876, #Broken Egg Hat
# 	1102376, #Psyche Flora
# 	1102377, #Psyche Mystic
# 	1102378, #Psyche Melody
# 	1702701, #Dragonmare Ninth Sword
# 	1702557, #Duster
# ]

# sm.setSpeakerID(9000193)
# dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k?\r\n" % (consume_item)

# dialog += "\r\n#eExtremely Rare - 1% Chance#n\r\n"
# for item in super_rare_items:
# 	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)

# dialog += "\r\n#eRare - 9% Chance#n\r\n"
# for item in rare_items:
# 	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)

# dialog += "\r\n#eCommon - 90% Chance#n\r\n"
# for item in common_items:
# 	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)	

# if sm.sendAskAccept(dialog):
# 	if sm.getEmptyInventorySlots(1) >= 1:
# 		sm.consumeItem(consume_item)
# 		if Util.succeedProp(90):
# 			index = Util.getRandom(0, len(common_items) - 1)
# 			sm.giveItem(common_items[index])
# 		elif Util.succeedProp(9):
# 			index = Util.getRandom(0, len(rare_items) - 1)
# 			sm.giveItem(rare_items[index])	
# 		else:
# 			index = Util.getRandom(0, len(super_rare_items) - 1)
# 			sm.giveItem(super_rare_items[index])
# 	else:
# 		sm.sendSayOkay("Please make more space in your Equip, Use, Setup inventory.")			
# #sm.dispose()