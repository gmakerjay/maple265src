from net.swordie.ms.connection.packet import Stage
from net.swordie.ms.connection.packet import WvsContext

if sm.sendAskYesNo("Would you like to move to the Auction House?"):
    c = chr.getClient()
    c.migrateIn(True)
    c.write(Stage.setAuctionField(chr))
    for item in chr.getEquipInventory().getItems():
        if not item.isCash() and not item.hasPotential():
            c.write(WvsContext.addItemToInventory(item))