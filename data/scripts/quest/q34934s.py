# Created by MechAviv
# Quest ID :: 34934
# Not coded yet

sm.setSpeakerID(3001510)
sm.setPlayerBoxChat()
sm.setColor(1)
if sm.sendAskAccept("#face0#Just as I expected, these sand monsters are blocking our way. Ark, please defeat #b50#k #b#o2400359##k monsters, so we can get through."):
    sm.setPlayerBoxChat()
    sm.sendNext("#face2#The signal I'm picking up just got a lot stronger. I don't know what to make of it.")
    sm.startQuest(34934)