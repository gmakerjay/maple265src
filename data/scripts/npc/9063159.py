# Lucid - Cash, Cubes & Fashion Boutique NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'point_shop' in sys.modules:
    reload(sys.modules['point_shop'])
    import point_shop
else:
    import point_shop

point_shop.open_point_shop(sm, chr)
