# Created by MechAviv
# Quest ID :: 34915
# Not coded yet

sm.setSpeakerID(3001508)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.setColor(1)
if sm.sendAskAccept("#face2#You're gonna go save Mar? It's really dangerous! Are you sure you want to go?\r\n\r\n                            \r\n#b(If you accept, you'll travel there automatically.)#k"):
    sm.warp(402090011, 0)
