# Created by MechAviv
# Kinesis Introduction
# Map ID :: 331001130
# Hideout  :: HQ
KINESIS = 1531000
JAY = 1531001
NERO = 1531003

if sm.hasQuest(22730):
    sm.setNpcBoxChat(KINESIS)
    sm.sendNext("No, Nero. You stay here. Jay, make sure Nero doesn't follow me.")

    sm.setNpcBoxChat(NERO)
    sm.sendSay("#face4#Meow! Meow! ")

    sm.setNpcBoxChat(JAY)
    sm.sendSay("#face1#Are... are you telling me to hold that thing?!")

    sm.setNpcBoxChat(KINESIS)
    sm.sendSay("I can't take a kitten into battle. Think of it as a special mission... partner.")
sm.warp(331000000, 2)