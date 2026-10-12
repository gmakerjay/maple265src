# Maple Administrator - Main Server Hub NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'quick_adminNPC' in sys.modules:
    reload(sys.modules['quick_adminNPC'])
    import quick_adminNPC
else:
    import quick_adminNPC
