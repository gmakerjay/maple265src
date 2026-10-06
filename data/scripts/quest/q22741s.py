# Created by MechAviv
# Kinesis Introduction
# Map ID :: 101020400
# East Forest :: Magician Association
KINESIS = 1531000
NERO = 1531003
THREE_MOON = 1531004

sm.setNpcBoxChat(KINESIS)
sm.sendNext("So I'll only get a proper explanation from this Grendel guy, right? Wouldn't it be faster if I went to him? ")

sm.setNpcBoxChat(THREE_MOON)
sm.sendSay("Waiting is the path to training your soul. I sense you are unhappy doing so.")

sm.setNpcBoxChat(KINESIS)
sm.sendSay("...? ")


sm.setNpcBoxChat(THREE_MOON)
sm.sendSay("The hour of supper approaches, and finds us unprepared. I shall attend to our feast, and hope that you would do the same.")


sm.setNpcBoxChat(NERO)
if sm.sendAskYesNo("#face0##ho#, Grendel the Really Old will be here soon. We've got time to gather some #beggs#k, so let's do that. Hunting #bsparrows#k will get you what we need."):
    sm.setNpcBoxChat(KINESIS)
    sm.sendNext("Hunt? Now that I can do. It'll be nice to see what's around here, too. By all means, lead the way.")

    sm.setNpcBoxChat(NERO)
    sm.sendSay("#face1#We can leave to the #bright#k. Boy, I love eggs! Especially if Three Moon is cooking ")
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("#face0#There's not much to do before Grendel the Really Old gets here. And some eggs would be super nice right now...")


