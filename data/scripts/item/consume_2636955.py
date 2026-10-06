# 	Sol Erda Energy: +200

item_quantity = sm.getQuantityOfItem(parentID)

chr.addSolErdaStrength(200 * item_quantity)
sm.consumeItem(parentID, item_quantity)