if sm.getSlotsLeftToAddByInvType(1) >= 8:
    sm.addInventorySlotsByInvType(8, 1)
    sm.consumeItem(2430768)