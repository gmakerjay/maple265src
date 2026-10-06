OLLIE = 3003652
LIGHT_EXECUTOR = 3003504

sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
sm.sendNext("You cannot pass. You must defeat the keepers and weaken the forces of Mirror World.")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
if sm.sendAskAccept("200 #bKeepers of Darkness#k. End them."):
    sm.startQuest(34578)
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face3#Won't Commander Will be able to use his power if Tana's power is weakened?")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("Do not concern yourself.")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("The Keepers are a portion of that power. The Executors possess the substance.")
