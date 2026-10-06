# Mu Young (1061018) | Balrog Boss Map
# Warps players out

from net.swordie.ms.constants import BossConstants

response = sm.sendAskYesNo("If you leave now, you'll have to start over.\r\n"
                "Are you sure you want to leave?")

if response:
	sm.warpInstanceOut(chr, BossConstants.BALROG_ENTRY_MAP)