# Maple Administrator (NPC 9010000)
# Direct NPC click script linking to quick_adminNPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

execfile("data/scripts/npc/quick_adminNPC.py")
