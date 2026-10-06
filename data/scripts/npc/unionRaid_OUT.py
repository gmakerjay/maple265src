import random
#coins = sm.getUnionCoinByRaid()
#if coins > 0:
#    if sm.canHold(4310229, coins):
#        sm.sendNext("Bạn đã thu thập được #b" + coins +
#                    " #k trong số #b#i4310229:##t4310229##k? Thật ấn tượng!\r\n"
#                    "Tôi sẽ đưa bạn trở lại lại Henesys. Tạm biệt!")
#        sm.giveItem(4310229, coins)
#        sm.addUnionCoin(coins)
#    else:
#        sm.sendSayOkay("Kiểm tra xem túi ETC còn ô chứa không?")
#else:
#    sm.sendSayOkay("Ừm, có vẻ như bạn chưa kiếm được #bLegion Coin#k nào. "
#                   "Nếu bạn gặp khó khăn khi tham gia đột kích, hãy quay lại sau. "
#                   "Các thành viên Quân đoàn của bạn sẽ tiếp tục cuộc đột kích ngay cả sau khi bạn rời đi.\r\n"
#                   "Tôi sẽ đưa bạn trở lại Henesys. Hẹn gặp lại sau.")
#
#sm.warpInstanceOut(chr, 100000000)
sel = sm.sendNext("Bạn muốn tôi giúp gì?\r\n\r\n#b#L0#Triệu hồi Dragon Whelps và Golden Wyvern.#l\r\n#L1#Trở về Henesys.#l")
if sel == 0:
    if chr.getField().getMobs().size() <= 1:
        for i in range(5):
            sm.spawnMob(9833106, random.randint(1800,3100), 17, False, 1000000000)
            sm.spawnMob(9833107, random.randint(1800,3100), 17, False, 1000000000)
            sm.spawnMob(9833108, random.randint(1800,3100), 17, False, 1000000000)
            sm.spawnMob(9833109, random.randint(1800,3100), 17, False, 1000000000)
            sm.spawnMob(9833110, random.randint(1800,3100), 17, False, 1000000000)
            sm.spawnMob(9833111, random.randint(1800,3100), 17, False, 1000000000)
elif sel == 1:
    sm.warpNoReturn(100000000, 0)