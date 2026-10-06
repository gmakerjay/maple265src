OLLIE = 3003652

sm.setPlayerBoxChat()
sm.sendNext("Turns out those spiders weren't poisonous, so, y'know, all clear.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0#That's a relief. The staff's all charged up, too.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Should we use that staff now?\r\n#b(Accept to be moved right away.)#k"):
    sm.warp(450007400)