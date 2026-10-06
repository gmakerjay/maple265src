# Happy New Week Damage Skin Box
sm.setSpeakerID(9010000)
response = sm.sendNext("#ePlease pick 1 of 5 Damage Skins below:#n\r\n#b#L0# #v2435046# #z2435046# #l\r\n#L1# #v2434601# #z2434601# #l\r\n#L2# #v2433903# #z2433903# #l\r\n#L3# #v2433830# #z2433830# #l\r\n#L4# #v2432639# #z2432639# #l")
if response == 0:
    sm.giveItem(2435046)
    sm.consumeItem(2434981)
elif response == 1:
    sm.giveItem(2434601)
    sm.consumeItem(2434981)
elif response == 2:
    sm.giveItem(2433903)
    sm.consumeItem(2434981)
elif response == 3:
    sm.giveItem(2433830)
    sm.consumeItem(2434981)
elif response == 4:
    sm.giveItem(2432639)
    sm.consumeItem(2434981)
