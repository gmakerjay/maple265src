#sm.dispose()
# from net.swordie.ms.util import Util

# consume_item = 2431340

# rare_items = [ 
# 	2046876, #9th Anniversary Prime Scroll for Accessory
# 	2046995, #9th Anniversary Prime Scroll for One-Handed Weapon
# 	2047817, #9th Anniversary Prime Scroll for Two-Handed Weapon
# 	2047950, #9th Anniversary Prime Scroll for Armor
# ]

# common_items = [
# 	2049116, #Miraculous Chaos Scroll 60%
# 	2049601, #Innocence Scroll 20%
# 	5064100, #Shield Scroll
# 	5064000, #Shielding Ward
# ]	

# sm.setSpeakerID(9000193)
# dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k?\r\n" % (consume_item)

# dialog += "\r\n#eRare - 10% Chance#n\r\n"
# for item in rare_items:
# 	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)


# dialog += "\r\n#eCommon - 90% Chance#n\r\n"
# for item in common_items:
# 	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)	

# if sm.sendAskAccept(dialog):
# 	if sm.getEmptyInventorySlots(2) >= 1:
# 		sm.consumeItem(consume_item)
# 		if Util.succeedProp(95):
# 			index = Util.getRandom(0, len(common_items) - 1)
# 			sm.giveItem(common_items[index])
# 		else:
# 			index = Util.getRandom(0, len(rare_items) - 1)
# 			sm.giveItem(rare_items[index])
# 	else:
# 		sm.sendSayOkay("Please make more space in your Equip, Use, Setup inventory.")			
# #sm.dispose()