# ParentID: 915020100
# ObjectID: 0
# Character field ID when accessed: 915020100
CHECK = 0
DUST_DWARF = 1403004
DUST_DWARF_MOB = 9001046
if chr.getJob()== 2410:
    if not sm.hasMobsInField() and CHECK == 0:
        sm.lockInGameUI(True, False)
        sm.spawnNpc(DUST_DWARF,254,182)
        sm.removeEscapeButton()

        sm.setPlayerBoxChat()
        sm.sendNext("Trespassers? If it isn't onething. it's another.")
        sm.sendNext("I suppose I won't able to get inside my own vault If I don't fight these goons. Might as well mop them up.")
        sm.removeNpc(DUST_DWARF)
        CHECK = 1
        for i in range(5):
            sm.spawnMob(DUST_DWARF_MOB,254,182,False)
        
        sm.lockInGameUI(False, False)