# Lara - Pet Sanctuary & Pet Skills NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'pet_shop' in sys.modules:
    reload(sys.modules['pet_shop'])
    import pet_shop
else:
    import pet_shop

pet_shop.open_pet_shop(sm, chr)
