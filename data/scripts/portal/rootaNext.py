# Root Abyss Corridor Exit Portal (rootaNext)
# Directly transports player/party to the boss chamber

fieldID = sm.getFieldID()
bossMap = {
    105200100: "VON_BON_NORMAL",
    105200500: "VON_BON_CHAOS",
    105200200: "PIERRE_NORMAL",
    105200600: "PIERRE_CHAOS",
    105200300: "QUEEN_NORMAL",
    105200700: "QUEEN_CHAOS",
    105200400: "VELLUM_NORMAL",
    105200800: "VELLUM_CHAOS",
}

if fieldID in bossMap:
    sm.enterBoss(bossMap[fieldID])
else:
    sm.warp(fieldID + 10)
