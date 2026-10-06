from net.swordie.ms.connection.packet import FieldPacket
from net.swordie.ms.connection.packet import WvsContext
from net.swordie.ms.client.character import BroadcastMsg
from net.swordie.ms.enums import InvType
from net.swordie.ms.enums import EquipBaseStat

# Required items for crafting
req_items = [
	[1112763, 1],
	[1112767, 1],
	[1112771, 1],
	[1112775, 1],
]

# Material items for enhancement
material_items = [
	[4033442, "+3% Boss Damage"],  	# Red Essence Stone
	[4033445, "+3% DEF Ignored"],  	# Green Essence Stone
	[4033444, "+3% Damage"], 		# Yellow Essence Stone
	[4033446, "+3% Stat"], 		# Blue Essence Stone
]

reward_item = 1113231  # Target item ID for enhancement

# Check if player has required quantity of items
def isEnoughItems(items):
	result = True
	for item in items:
		if not sm.hasItem(item[0], item[1]):
			result = False
			break
	return result

# Check if player has items in default quantity (1)
def isEnoughItemsWithDefaultValue(items):
	result = True
	for item in items:
		if not sm.hasItem(item, 1):
			result = False
			break
	return result

# Consume specified quantity of items
def consumeItems(items):
	for item in items:
		sm.consumeItem(item[0], item[1])

# Consume items with default quantity (1)
def consumeItemsWithDefaultValue(items):
	for item in items:
		sm.consumeItem(item, 1)

# Apply stats to the item based on the material used
def addStatItem(item, material_id):
	item.addStat(EquipBaseStat.cuc, 1)
	if material_id == 4033442:
		item.addStat(EquipBaseStat.bdr, 3)
	elif material_id == 4033445:
		item.addStat(EquipBaseStat.imdr, 3)
	elif material_id == 4033444:
		item.addStat(EquipBaseStat.damR, 3)
	elif material_id == 4033446:
		item.addStat(EquipBaseStat.statR, 3)
	item.updateToChar(chr)

# Determine required item for enhancing based on level and material used
def get_req_item_for_enhance(level, material_id):
	if level >= 0 and level < 5:
		return [material_id, 1112766 if material_id == 4033442 else 1112770 if material_id == 4033445 else 1112774 if material_id == 4033444 else 1112778]
	elif level >= 5 and level < 10:
		return [material_id, 1112765 if material_id == 4033442 else 1112769 if material_id == 4033445 else 1112773 if material_id == 4033444 else 1112777]
	elif level >= 10 and level < 15:
		return [material_id, 1112764 if material_id == 4033442 else 1112768 if material_id == 4033445 else 1112772 if material_id == 4033444 else 1112776]
	elif level >= 15 and level < 20:
		return [material_id, 1112763 if material_id == 4033442 else 1112767 if material_id == 4033445 else 1112771 if material_id == 4033444 else 1112775]

# Handle the enhancement process
def handle_enhance_item(item, material_item):
	current_level = item.getCuc()
	if 20 - current_level <= 0:
		sm.sendNext("Your item has reached the maximum enhancement level.")
		return

	material_items = get_req_item_for_enhance(current_level, material_item[0])
	dialog = f"You have selected #b#e{material_item[1]}#n#k.\r\nRequired items for enhancement:\r\n"
	for material in material_items:
		dialog += f"\t#b - #z{material}# #e(#c{material}#/1)#n#k\r\n"

	if sm.sendAskYesNo(dialog):
		if isEnoughItemsWithDefaultValue(material_items):
			addStatItem(item, material_items[0])
			consumeItemsWithDefaultValue(material_items)
		else:
			sm.sendNext("You do not have enough items to complete this!")

# Enhance items menu
def enhance_items():
	items = chr.getInventoryByType(InvType.EQUIP).getItems()
	enhance_items = filter(lambda x: (x.getItemId() == reward_item), items)
	dialog = "#ePlease select the item you wish to enhance#n\r\n\r\n"

	for i, item in enumerate(enhance_items):
		dialog += f"#L{i}# #i{item.getItemId()}# #z{item.getItemId()}# #l.\r\n"

	enhance_item_index_selection = sm.sendNext(dialog)
	enhance_item = enhance_items[enhance_item_index_selection]

	total_slot = 20 - enhance_item.getCuc()
	if total_slot <= 0:
		sm.sendNext("Your item has reached the maximum enhancement level.")
		return

	dialog = f"#i{enhance_item.getItemId()}# #b#e#z{enhance_item.getItemId()}##n#k\r\n#eSlot Left: #r{total_slot}#k#n\r\nPlease select the item you wish to use for enhancement.\r\n"

	for i, item in enumerate(material_items):
		dialog += f"#L{i}# #b#e{item[1]}#n#k#l.\r\n"

	material_item_index_selection = sm.sendNext(dialog)
	material_item = material_items[material_item_index_selection]

	handle_enhance_item(enhance_item, material_item)


selection = sm.sendNext("Hi, #h0#. What would you like to do?\r\n" +
						"#b" +
						"#L0#Open Craft UI.#l\r\n" +
						f"#L1#Claim #z{reward_item}#.#l\r\n" +
						f"#L2#Enhance #z{reward_item}#.#l\r\n" +
						"#k")
if selection == 0:
	chr.write(FieldPacket.openUI(104))
elif selection == 1:
	if sm.isEquipped(reward_item) or sm.hasItem(reward_item):
		sm.sendNext("You already have this item.")
	else:
		dialog = "#eGather these items and bring them to me!#n\r\n\r\n"
		for item in req_items:
			dialog += f"\t#e - #z{item[0]}# #b(#c{item[0]}#/{item[1]})#k#n\r\n"
		dialog += f"\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n\t#e#i{reward_item}# #z{reward_item}# x 1.#n"
		if sm.sendAskYesNo(dialog):
			if sm.getEmptyInventorySlots(1) >= 1:
				if isEnoughItems(req_items):
					consumeItems(req_items)
					sm.giveItem(reward_item, 1)
				else:
					sm.sendNext("You don't have the required items to complete this!")
			else:
				sm.sendSayOkay("Please make some space in your EQUIP inventory.")
elif selection == 2:
	enhance_items()
