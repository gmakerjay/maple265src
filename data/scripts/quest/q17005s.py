# Created by MechAviv
# Quest ID :: 17005
# [Commerci] Bon Voyage 1
from net.swordie.ms.enums import UIType

sm.setNpcBoxChat(9390220)
sm.sendNext("Each time you start a voyage, you have to select a destination.")

# Update Quest Record EX | Quest ID: [17009] | Data: step=1
sm.openUI(UIType.UI_SAILING)

sm.setNpcBoxChat(9390220)
sm.sendSay("The blue locations are the ones available to you. ")

sm.setNpcBoxChat(9390220)
sm.sendSay("The only place you can go right now is [Dolce]. But trade more, and you'll unlock new places.")

sm.setNpcBoxChat(9390220)
sm.sendSay("Mouseover each destination to get more information about it. Now, how about heading over to [Dolce]?")