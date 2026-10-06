from net.swordie.ms.util import Util

consume_item = 2435285

super_rare_items = [
	1112135, #Ink-and-Wash Painting Name Tag Ring
	1112238, #Ink-and-Wash Thought Bubble Ring
	1102766, #Raging Lotus Aura
	1702480, #Celena
	1042349, #All About Black
	1102918, #Blazing Aura
]

rare_items = [ 
	1702589, #Fairy Blossom
	1072839, #Shoes of Life
	1072840, #Shoes of Destruction
	1042142, #Rainbow Top
]

common_items = [
	1004026, #Black Cat Beanie
	1004027, #Sky Blue Cat Beanie 
	1004028, #Orange Cat Beanie
	1004029, #Snow Bear Beanie 
	1042086, #Tourist T
	1052671, #Oversized Oxford
	1702374, #Bladed Falcon's Katana
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
	if sm.getEmptyInventorySlots(1) >= 1:
		sm.consumeItem(consume_item)
		if Util.succeedProp(90):
			index = Util.getRandom(0, len(common_items) - 1)
			sm.giveItem(common_items[index])
		else:
			index = Util.getRandom(0, len(rare_items) - 1)
			sm.giveItem(rare_items[index])	
		# else:
			# index = Util.getRandom(0, len(super_rare_items) - 1)
			# sm.giveItem(super_rare_items[index])
	else:
		sm.sendSayOkay("Please make more space in your Equip, Use, Setup inventory.")