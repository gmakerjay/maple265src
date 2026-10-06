
from net.swordie.ms.constants import BossConstants
from net.swordie.ms.constants import GameConstants
sm.flipSpeaker()
sm.setBoxChat()
KEY = 4009283
selection = sm.sendNext("#eWhat do you want to do?#n\r\n"
                                "#L0##bGo to Hieizan Dungeon and defeat Princess No's alter ego.#l \r\n" 
                                "#L1#Go to Hieizan Temple Plaza to defeat Princess No.#l \r\n"
                                "#L2#Get the #v4009283# #z4009283# item.#l \r\n"
                                "#L3#I dont have anything to say to you.#l")
if selection == 0:
    #TODO ???
    sm.sendSayOkay("This content is not available at the moment")
    #sm.dispose()
elif selection == 1:
    #TODO Add key
    sm.sendSayOkay("This content is not available at the moment")
    #sm.warpInstanceIn(chr, 811000999, False)
elif selection == 2:
    #TODO ???
    sm.sendSayOkay("This content is not available at the moment")
