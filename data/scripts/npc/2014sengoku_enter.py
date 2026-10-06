sm.flipSpeaker()
sm.setBoxChat()
sm.sendNext("This is where the real deal is, Princess No. You need to be in and party of at least two people and the party leader must have the #v4009283# #z4009283#")
#sm.showFieldEffect("Npc/9130100.img/info/illustration/main",False)
#sm.reservedEffectRepeat("Npc/9130100.img/info/illustration/face")

sm.sendNext("All party members also have to above level 140 and have completed theses two quests #b#e Inverstigating Hieizan #n#k and #b#eWill of the Five Planets#n")
#sm.showFade(750)


sm.reservedEffectRepeat("Npc/9130100.img/info/illustration/face",False)
selection = sm.sendNext("Now, shall we go rid the world of Princess No?\r\n"
                                "#L0##bEnter to defeat Princess No.#l \r\n" 
                                "#L1#No, I don't want to.#l \r\n"
                                "#L2#Enter to defeat Princess No Practice Mode.#l")
if selection == 0:
    #TODO ???
    sm.sendNext("Entering Hieizan Temple Plaza to defeat Princess No")
    sm.setPartyDeathCount(5)
    sm.warpInstanceIn(chr, 811000100)
    sm.setInstanceTime(30 * 60)
elif selection == 1:
    #TODO Add key 
    sm.sendSayOkay("This content is not available at the moment")
elif selection == 2:
    #TODO ???
    sm.sendSayOkay("This content is not available at the moment")



