from net.swordie.ms.constants import ItemConstants

timeSavers = [
	[
		"Teleport Rocks",
		[
			 [5040004,	25000,	0],	#Hyper Teleport Rock
		],
	],
	[
		"Item Stores",
		[
			 [5230003,	10000,	0],	#The Owl of Rhinne
			 [5450004,	35000,	0],	#Traveling Merchant (30-day)
			 [5450005,	35000,	0],	#Portable Storage (30-day)
			 [5450006,	1500,	0],	#Traveling Merchant (1-day)
			 [5450007,	9000,	0],	#[7-Day] Miu Miu the Traveling Merchant
			 [5450008,	1500,	0],	#Portable Storage (1-day)
			 [5450009,	9000,	0],	#[7-Day]  Mr. Wang's Storage Wagon
		],
	],
]

def createCategory(categories):
    itemList = []
    dialog = " \r\n"
    for i in range(len(categories)):
        dialog += "#L%s# %s #l\r\n" % (i, categories[i][0])
    selection = sm.sendNext(dialog)
    itemList = categories[selection]

    itemInfo = [] # [itemID, price, quantity]
    dialog = "#eItem List#n\r\n\r\n"
    for i in range(len(itemList[1])):
        itemID = itemList[1][i][0]
        price = itemList[1][i][1]
        bundleQuantity = itemList[1][i][2]
        if bundleQuantity != 0:
            dialog += "#L%s# #i%s# #z%s# x%s #rPrice: %s Maple Point#k#l\r\n" % (i, itemID, itemID, bundleQuantity, sm.formatNumber(str(price)))
        else:
            dialog += "#L%s# #i%s# #z%s# #rPrice: %s Maple Point#k#l\r\n" % (i, itemID, itemID, sm.formatNumber(str(price)))
    selection = sm.sendNext(dialog)
    itemInfo = itemList[1][selection]

    dialog = "You selected #z%s#. How many items do you want to buy?"
    quantity = sm.sendAskNumber(dialog, 0, 1, 100)

    totalPrice = 0
    if itemInfo[2] != 0:
        quantity = quantity + itemInfo[2]
        dialog = "#eItem: #i%s# #z%s# x%s #n\r\n " % (itemInfo[0], itemInfo[0], itemInfo[2])
    else:
        dialog = "#eItem: #i%s# #z%s# #n\r\n" % (itemInfo[0], itemInfo[0])

    totalPrice = itemInfo[1] * quantity

    dialog += "#eQuantity: %s #n\r\n" % (quantity)
    dialog += "#ePrice: %s #n\r\n" % (sm.formatNumber(str(totalPrice)))
    dialog += "Are you sure you want to buy this Item?"

    chr.chatMessage(sm.formatNumber(str(totalPrice)))
    if sm.sendAskAccept(dialog):
        if chr.getMaplePoint() < totalPrice:
            sm.sendSayOkay("Umm... I don't think you have enough Maple Point... I'm sorry")
        else:
            if not ItemConstants.isEquip(itemInfo[0]):
                if not sm.canHold(itemInfo[0], quantity):
                    sm.sendSayOkay("Please make more space in your inventory.")
                else:
                    sm.giveItem(itemInfo[0], quantity)

def start():
    dialog = "  \r\n"
    dialog += "#L0# Time Savers #l\r\n"
    dialog += "#L1# Random Rewards #l \r\n"
    dialog += "#L2# Equip Modifications #l \r\n"
    dialog += "#L3# Dungeon Passes #l \r\n"
    dialog += "#L4# Time Savers #l \r\n"
    dialog += "#L5# Character Modifications #l \r\n"
    dialog += "#L6# Equipment #l \r\n"
    dialog += "#L7# Appearance #l \r\n"
    dialog += "#L8# Pet #l \r\n"
    dialog += "#L9# Messenger And Social#l \r\n"
    selection = sm.sendNext(dialog)

    if selection == 0:
        dialog = createCategory(timeSavers)

start()
