# 	Sol Erda Energy: +10

item_quantity = sm.getQuantityOfItem(parentID)

chr.addSolErdaStrength(10 * item_quantity)
sm.consumeItem(parentID, item_quantity)