# Adele - General Store, Potions & Boss Buff Depot NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'potion_shop' in sys.modules:
    reload(sys.modules['potion_shop'])
    import potion_shop
else:
    import potion_shop

potion_shop.open_potion_shop(sm, chr)
