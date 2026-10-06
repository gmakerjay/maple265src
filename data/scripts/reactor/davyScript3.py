# To close the door in Lord Pirate PQ
OLD_METAL_KEY = 4001117

reactor.incHitCount()
if reactor.getHitCount() >= reactor.getMaxHitCount():
    if sm.hasItem(OLD_METAL_KEY):
        sm.consumeItem(OLD_METAL_KEY)
        sm.removeReactor()
    
