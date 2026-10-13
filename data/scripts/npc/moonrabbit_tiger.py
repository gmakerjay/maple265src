from net.swordie.ms.constants import GameConstants

def end():
    sm.warpInstanceOut(chr, GameConstants.MOON_BUNNY_ENTRANCE_MAP)

party = chr.getParty()
req_cakes = 10 if party is None or party.getMembers().size() <= 1 else 20

if party is not None and party.isLeader(chr):
    selection = sm.sendNext("Growl! I am Growlie, always ready to protect this place. What brought you here?\r\n#b#L0# Please tell me what this place is all about.#l\r\n#L1# I have brought #t4001101#.#l\r\n#L2# I would like to leave this place.#l")
    if selection == 0:
        sm.sendPrev("This place can be best described as the prime spot where you can taste the delicious rice cakes made by Moon Bunny every full moon.")
    elif selection == 1:
        if sm.hasItem(GameConstants.RICE_CAKE, req_cakes):
            sm.sendNext("Oh... isn't this rice cake made by Moon Bunny? Please hand me the rice cake. Mmmm ... these seem delicious! Here is your reward for protecting the Moon Bunny! Have a safe trip home!")
            sm.givePQRewards(party)
            end()
        else:
            sm.sendPrev("I advise you to check and make sure that you have gathered up #b" + str(req_cakes) + " #t4001101#s#k.")
    elif selection == 2:
        end()
else:
    selection = sm.sendNext("Growl! I am Growlie, always ready to protect this place. What brought you here?\r\n#b#L0# Please tell me what this place is all about.#l\r\n#L1# I would like to leave this place.#l")
    if selection == 0:
        sm.sendPrev("This place can be best described as the prime spot where you can taste the delicious rice cakes made by Moon Bunny every full moon.")
    else:
        end()