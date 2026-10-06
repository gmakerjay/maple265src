from net.swordie.ms.util import Util

consume_item = 2430016

common_items = [
	2049116, #Miraculous Chaos Scroll 60%
	2049601, #Innocence Scroll 20%
	5064100, #Shield Scroll
	5064000, #Shielding Ward
	1050169, #Blizzard Armor
	1000040, #Blizzard Helmet
	1072447, #Blizzard Boots
	1082276, #Blizzard Gloves
	1102246, #Blizzard Cape
	1442106, #Blizzard Polearm
	1302024, #Newspaper Sword
	1302025, #Red Umbrella
	1302026, #Black Umbrella
	1302027, #Green Umbrella
	1302028, # Light Purple Umbrella
	1302063, #Flaming Katana
	1302263, #Dirty Plunger
	1302265, #Shabby Frypan
	1312012, #Hula Hoop
	1312013, #Green Paint Brush
	1312014, #Black Paint Brush
	1322021, #Black Tube
	1322022, #Red Flowery Tube
	1322023, #Blue Flowery Tube
	1322024, #Purple Tube
	1322025, #Emergency Rescue Tube
	1322026, #Colorful Tube
	1322033, #Goblin Bat
	1322063, #Duck tube
	1322064, #Duck tube
]

sm.setSpeakerID(9000193)
dialog = "Do you want to claim the #b#z%s##k as a #r#h0##k?\r\n" % (consume_item)
dialog += "\r\n#eCommon#n\r\n"
for item in common_items:
	dialog += "\t#i%s#\t#z%s#\r\n" % (item, item)

if sm.sendAskAccept(dialog):
	if sm.getEmptyInventorySlots(1) >= 1 and sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(5) >= 1:
		sm.consumeItem(consume_item)
		sm.giveItem(common_items[Util.getRandom(0, len(common_items) - 1)])
	else:
		sm.sendSayOkay("Please make more space in your Equip, Use, Setup inventory.")			