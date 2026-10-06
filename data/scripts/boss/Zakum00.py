from net.swordie.ms.constants import BossConstants

sm.setSpeakerID(2030008)
sel = sm.sendNext("Ừm... Được rồi, có vẻ như bạn đáp ứng đủ yêu cầu. Bạn muốn làm gì?\r\n\r\n#b#L0# Khám phá Dead Mine Caves.#l\r\n#b#L1# Khám phá Zakum Dungeon.#l\r\n#b#L2# Nhận lễ vật dâng cho Zakum.#l\r\n#b#L3# Đến El Nath.#l")
if sel == 0:
    sm.warp(211041500, 0)
elif sel == 1:
    sm.warp(280020000, 0)
elif sel == 2:
    sel2 = sm.sendNext("Bạn đang dâng lễ vật cho Zakum nào?\r\n\r\n#b#L0# Zakum Easy#l\r\n#L1# Zakum Normal / Chaos#l")
    item = BossConstants.ZAKUM_EASY_SPAWN_ITEM
    if sel2 == 1:
        item = BossConstants.ZAKUM_CHAOS_SPAWN_ITEM
    if sm.canHold(item):
        sm.sendNext("Bạn cần một lễ vật cúng dường cho Zakum...")
        sm.sendNext("Vì tôi có rất nhiều #b#t"+str(item)+"##k, nên tôi sẽ cho bạn một ít. Dù sao thì chúng cũng chẳng dùng được vào việc gì khác ngoài việc cúng dường.")
        sm.sendNext("Hãy đặt vật này lên Bàn thờ Zakum.")
        sm.giveItem(item)
    else:
        sm.sendNext("Vui lòng có đủ ô chứa trong túi ETC để nhận lễ vật cúng dường cho Zakum.")
elif sel == 3:
    sm.warp(211000000, 0)
