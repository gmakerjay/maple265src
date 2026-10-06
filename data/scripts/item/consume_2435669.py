from net.swordie.ms.loaders import ItemData

if sm.canHold(5062024):
    item = ItemData.getItemDeepCopy(5062024)
    item.setQuantity(3)
    chr.addStackableItemToInventory(item, False)
    sm.consumeItem(2435669)
else:
    sm.sendSayOkay("Please make more space in your inventory.")