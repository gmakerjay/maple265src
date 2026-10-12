# Hoyoung - Universal Warp & Fast Travel Center NPC
import sys
for p in ["data/scripts/npc", "data/scripts"]:
    if p not in sys.path:
        sys.path.append(p)

if 'warp_service' in sys.modules:
    reload(sys.modules['warp_service'])
    import warp_service
else:
    import warp_service

warp_service.open_warp_service(sm, chr)
