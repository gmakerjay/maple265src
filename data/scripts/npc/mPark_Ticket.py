
TICKET_PIECE = [
	4001513, # Zebra Stripe Ticket Piece 
	4001515, # Leopard Stripe Ticket Piece
	4001521, # Tiger Stripe Ticket Piece
]

TICKET = [
	4001514, # Zebra Stripe Ticket
	4001516, # Leopard Stripe Ticket
	4001522, # Tiger Stripe Ticket
]

selection = sm.sendNext("Hello! If you want to enjoy the Monster Park, then you came to the right person! So, what can i do for you?\r\n" +
                       "#b" +
                       "#L0#Exchange Zebra Stripe Ticket Piece.#l\r\n" +
                       "#L1#Exchange Leopard Stripe Ticket Piece.#l\r\n" +
                       "#L2#Exchange Tiger Stripe Ticket Piece.#l\r\n" +
                       "#k")

item_ID = TICKET_PIECE[selection]
item_quantity = sm.getQuantityOfItem(item_ID)

if item_quantity < 10:
	sm.sendSayOkay(("You need at least 10 #b #z%s##k") % (item_ID))
else:
	item_quantity_can_buy = item_quantity / 10
	selection_quantity = sm.sendAskNumber("How many of them would you like to exchange?", item_quantity_can_buy, 1, item_quantity_can_buy)
	if selection_quantity >= 1:
		if sm.sendAskYesNo(("So...you want to exchange %s(s). The amount if #z%s# needed is 10. Would you like to proceed?") % (selection_quantity, item_ID)):
				if sm.canHold(TICKET[selection], selection_quantity):
					sm.consumeItem(item_ID, selection_quantity * 10)
					sm.giveItem(TICKET[selection], selection_quantity)
					sm.sendSayOkay("Okay, have a great time at the Monster Park!")
				else:
					sm.sendSayOkay("Please check if your inventory has empty slot.")