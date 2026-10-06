# Custom NPC script used for @sell player command
# Author: Clueless Cow

from net.swordie.ms.loaders import ItemData
from net.swordie.ms.constants import ItemConstants
from net.swordie.ms.enums import InvType

def disposeAll():
    #sm.dispose()
    chr.dispose()

def sellItemsFromTab(invType = InvType.EQUIP):
    # query inv info
    inventory = chr.getInventoryByType(invType)
    invItems = inventory.getItems()
    sellingItems = filter(lambda x: (x.isCash() is False), invItems)
    tabName = ""
    if invType == InvType.CONSUME:
        tabName = "USE"
    elif invType == InvType.INSTALL:
        tabName = "SETUP"
    elif invType == InvType.ETC:
        tabName = "ETC"
    else:
        sellingItems = sm.getEquipsForSell()
        tabName = "EQUIP"

    # empty inv
    if len(invItems) == 0:
        sm.sendSayOkay("You don't have any items to sell.")
        disposeAll()
        return

    # has at least 1 item in inv
    if len(invItems) == 1:
        # only has 1 item, proceed to ask for confirmation
        #sellingItems = list(invItems)
        _itemId = invItems.get(0).getItemId()
        confirmed = sm.sendAskYesNo("Are you sure you want to sell #i{}# #z{}#".format(_itemId, _itemId))
    else:
        # has more than 1 item, prompt mode selection
        optionList = "Please think carefully before making the right choice:\r\n#L1##bI will select the items I want to sell.#k#l\r\n#L2##e#rI want to sell all items.#k#n#l".format(tabName)
        option = sm.sendNext(optionList)
        if option:
            if option == 1:
                # sell from/to
                sortedItems = sellingItems
                sortedItems.sort(key=lambda x: x.getBagIndex())
                itemListTemplate = "Please select the starting and ending items you want to sell.\r\nChoose item#r<order>#k:\r\n"
                for item in sortedItems:
                    itemListTemplate += "#L{}##i{}# #z{}##l\r\n".format(item.getBagIndex(), item.getItemId(), item.getItemId())
                startIndex = sm.sendNext(itemListTemplate.replace("<order>", "Starting"))
                endIndex = sm.sendNext(itemListTemplate.replace("<order>", "Ending"))
                if startIndex > endIndex:
                    startIndex, endIndex = endIndex, startIndex
                sellingItems = filter(lambda x: (startIndex <= x.getBagIndex() <= endIndex), sortedItems)
                soldItemsTemplate = "You will sell the following items:\r\n"
                for item in sellingItems:
                    soldItemsTemplate += "#i{}# #z{}#\r\n".format(item.getItemId(), item.getItemId(), item.getBagIndex())
                confirmed = sm.sendAskYesNo(soldItemsTemplate)
            if option == 2:
                # sell everything
                #sellingItems = list(invItems)
                confirmed = sm.sendAskYesNo("Are you sure you want to sell all items in your bag?")
        else:
            # 'maybe later' option / no response
            disposeAll()
            return
    # finish asking for selling items, proceed to actually sell it
    if not confirmed:
        sm.sendSayOkay("Thank you for using my service!")
        disposeAll()
        return
    # player confirmed
    totalMesos = 0
    for item in sellingItems:
        cost = 0
        id = item.getItemId()
        quantity = item.getQuantity()
        if ItemConstants.isThrowingItem(id):
            quantity = 1;
        if ItemConstants.isEquip(id):
            cost = item.getPrice() * quantity
        elif id == 4001886:
            cost = item.getPrice()
        else:
            info = ItemData.getItemInfoByID(id)
            if info:
                cost = info.getPrice() * quantity
            else:
                continue
        totalMesos += cost

    if chr.canAddMoney(totalMesos):
        # remove item from inv
        for soldItem in sellingItems:
            _id = soldItem.getItemId()
            _quantity = soldItem.getQuantity()
            if ItemConstants.isEquip(_id):
                chr.consumeItem(soldItem)
            else:
                if ItemConstants.isThrowingItem(_id):
                    chr.consumeAllThrowingItem(soldItem)
                else:    
                    chr.consumeItem(_id, _quantity)
        # add money
        chr.addMoney(totalMesos)
        sm.sendSayOkay("You have received {} mesos. Thank you for using my service!".format(totalMesos))
        disposeAll()
        return
    else:
        sm.sendSayOkay("#rYou can no longer receive mesos. The maximum amount of mesos you can hold is {}.".format(totalMesos))
        disposeAll()
        return

sm.setSpeakerID(9010100)
inventoryList = "Which items in your bag would you like to sell?#b\r\n#L1#Equipment#l\r\n#L2#Usable#l\r\n#L3#Accessory#l\r\n#L4#Other#l\r\n#k"
selectedInv = sm.sendNext(inventoryList)

if selectedInv == 1:
    sellItemsFromTab(InvType.EQUIP)
elif selectedInv == 2:
    sellItemsFromTab(InvType.CONSUME)
elif selectedInv == 3:
    sellItemsFromTab(InvType.INSTALL)
elif selectedInv == 4:
    sellItemsFromTab(InvType.ETC)
else:
    sm.sendSayOkay("Error: please try the command again!")
    disposeAll()
