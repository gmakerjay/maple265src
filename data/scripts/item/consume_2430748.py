item_ID = 2430748
item_quantity = sm.getQuantityOfItem(item_ID)

if item_quantity < 20:
	sm.chat("You need at least 20 Premimum Fushion Ticket.")
else:
    if sm.canHold(4420000):
        sm.consumeItem(item_ID, 20)
        sm.giveItem(4420000)
    else:
		sm.chat("Please check if your inventory has empty slot.")