# Lunar New Year 2024 Event

from net.swordie.ms.util import Util
from net.swordie.ms.constants import QuestConstants
from java.text import NumberFormat
from java.util import Locale

# Event Map: 867136000
# Event shop: 9400794
# Event coin: 4310282
sm.setSpeakerID(9300010)
sel = sm.sendNext("#r#eHappy New Year, #r#h0#.#n#k\r\nThe Lunar New Year 2024 event is happening in Viet Maple.\r\n#b"
                  "#L0#I want to learn more about this event.#l\r\n"
                  #"#L1#I want to visit the 2024 New Year shop.#l\r\n"
                  #"#L2#I want to receive my 2024 New Year gift.#l\r\n"
                  "#l#k")
if sel == 0:
    sm.sendNext("All monsters, from big to small, from weak to strong, across all the lands in this grand adventure world will drop an item called #z4310282# #i4310282#.\r\nAdditionally, you will receive a +50% EXP and DROP rate bonus during this period. Enjoy the free gifts from me!\r\nWishing you a prosperous New Year - Good fortune, health, and success!")
elif sel == 1:
# sm.openShop(9400794)
elif sel == 2:
    if not sm.hasQuestCompleted(202497):
        sm.startQuest(202497)
        sm.completeQuest(202497)
        sm.giveItem(3700467)
        sm.giveItem(2435902, 100)
        sm.sendSayOkay("Wishing you a prosperous New Year!")
    else:
        sm.sendSayOkay("You have already received your 2024 New Year gift.")
