# Maple Alliance - Outpost
ATHENA_PIERCE = 3003812
NOVA_SOLDIER = 3003813
RESISTANCE_SOLDIER = 3003815

if not chr.hasQuestCompleted(35607):
    sm.removeNpcs(ATHENA_PIERCE)
    sm.removeNpcs(NOVA_SOLDIER)
    sm.removeNpcs(RESISTANCE_SOLDIER)
    sm.spawnNpc(ATHENA_PIERCE, 179, -80, False)
    sm.spawnNpc(NOVA_SOLDIER, -164, -16, False)
    sm.spawnNpc(RESISTANCE_SOLDIER, 775, -10, True)
    sm.chat("[Moonbridge] Maple World Right Now: Nếu bạn không thấy Athena Pierce, Nova Soldier, Resistance Soldier thì vô lại bản đồ này nhé.")