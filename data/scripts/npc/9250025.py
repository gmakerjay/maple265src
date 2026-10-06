# Maple TV
FREE_MARKET = 910000000

sm.setSpeakerID(9000087)
if sm.getFieldID() != FREE_MARKET:
    if sm.sendAskYesNo("Do you want to go to #e#b#m910000000##k#n right now?"):
        sm.warp(FREE_MARKET)