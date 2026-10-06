from net.swordie.ms.util import Util

common_items = [3012007,
                3012029,
                3015195,
                2049707,
                2048302,
                2049507,
                2049406,
                2048309,
                2048307,
                2049618,
                2003524, 2003527, 2003531, 2003533, 2003536, 2003539, 2003541, 2003543, 2003545]

if sm.getEmptyInventorySlots(2) >= 1 and sm.getEmptyInventorySlots(3) >= 1:
    sm.consumeItem(2433209)
    sm.giveItem(common_items[Util.getRandom(0, len(common_items) - 1)])
else:
    sm.sendSayOkay("Please ensure you have empty slots in your USE and SETUP inventories!")