# 	Sol Erda Energy: +500

item_quantity = sm.getQuantityOfItem(parentID)

chr.addSolErdaStrength(500 * item_quantity)
sm.consumeItem(parentID, item_quantity)