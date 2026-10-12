# Chosen Seren - Boss Arena & Boss Warp NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'boss_arena' in sys.modules:
    reload(sys.modules['boss_arena'])
    import boss_arena
else:
    import boss_arena

boss_arena.open_boss_arena(sm, chr)
